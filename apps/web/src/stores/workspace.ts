import { create } from "zustand";
import { createJSONStorage, persist, type StateStorage } from "zustand/middleware";
import type { FileTreeNode } from "@/features/file-tree";
import { toServerRelativePath } from "@/lib/api-client";
import {
  workspaceSearchSchema,
  type WorkspaceSearch,
} from "@/lib/workspace-search";
import type { router } from "@/router";

type WorkspaceStore = WorkspaceSearch & {
  openPanel: (file: FileTreeNode, closeTree: boolean) => void;
  closePanel: (path: string) => void;
  selectPanel: (path: string) => void;
  setPanelRaw: (path: string, raw: boolean) => void;
  setTreeOpen: (open: boolean) => void;
  setTreeExpanded: (urls: string[]) => void;
};

export function isCurrentServerFile(url: string) {
  try {
    toServerRelativePath(url);
    return true;
  } catch {
    return false;
  }
}

let readUrl: (() => WorkspaceSearch | null) | null = null;
let writeUrl: ((search: WorkspaceSearch) => void) | null = null;

const urlStorage: StateStorage = {
  getItem: () => {
    const search = readUrl?.();
    return search ? JSON.stringify({ state: search, version: 0 }) : null;
  },
  setItem: (_name, value) => {
    const { state } = JSON.parse(value) as { state: WorkspaceSearch };
    writeUrl?.(state);
  },
  removeItem: () => {},
};

const initialState = workspaceSearchSchema.parse({});

export const useWorkspaceStore = create<WorkspaceStore>()(
  persist(
    (set) => ({
      ...initialState,
      openPanel: (file, closeTree) =>
        set((state) => {
          const path = toServerRelativePath(file.url);
          return {
            panels: state.panels.some((panel) => panel.path === path)
              ? state.panels
              : [...state.panels, { path, name: file.label, raw: false }],
            active: path,
            tree: closeTree ? false : state.tree,
          };
        }),
      closePanel: (path) =>
        set((state) => {
          const panels = state.panels;
          const index = panels.findIndex((panel) => panel.path === path);
          if (index < 0) return state;

          const remaining = panels.filter((panel) => panel.path !== path);
          const active = panels.some((panel) => panel.path === state.active)
            ? state.active
            : (panels.at(-1)?.path ?? null);

          return {
            panels: remaining,
            active:
              active === path
                ? (remaining[Math.min(index, remaining.length - 1)]?.path ??
                  null)
                : active,
          };
        }),
      selectPanel: (path) => set({ active: path }),
      setPanelRaw: (path, raw) =>
        set((state) => ({
          panels: state.panels.map((panel) =>
            panel.path === path ? { ...panel, raw } : panel,
          ),
        })),
      setTreeOpen: (open) => set({ tree: open }),
      setTreeExpanded: (urls) => set({ treeExpanded: urls }),
    }),
    {
      name: "workspace-url",
      storage: createJSONStorage(() => urlStorage),
      skipHydration: true,
      partialize: ({ panels, active, tree, treeExpanded }) => ({
        panels,
        active,
        tree,
        treeExpanded,
      }),
    },
  ),
);

export function connectWorkspaceUrl(workspaceRouter: typeof router) {
  let hydrationSearch: WorkspaceSearch | null = null;
  const currentSearch = () =>
    workspaceSearchSchema.parse(workspaceRouter.state.location.search);

  readUrl = () =>
    hydrationSearch ??
    (workspaceRouter.state.location.pathname === "/home"
      ? currentSearch()
      : null);
  writeUrl = (search) => {
    if (workspaceRouter.state.location.pathname !== "/home") return;
    if (JSON.stringify(currentSearch()) === JSON.stringify(search)) return;

    void workspaceRouter.navigate({
      to: "/home",
      replace: true,
      resetScroll: false,
      search,
    });
  };

  void useWorkspaceStore.persist.rehydrate();

  return workspaceRouter.subscribe("onResolved", ({ toLocation }) => {
    if (toLocation.pathname !== "/home") return;

    const nextSearch = workspaceSearchSchema.parse(toLocation.search);
    const { panels, active, tree, treeExpanded } =
      useWorkspaceStore.getState();
    if (
      JSON.stringify({ panels, active, tree, treeExpanded }) !==
      JSON.stringify(nextSearch)
    ) {
      hydrationSearch = nextSearch;
      void useWorkspaceStore.persist.rehydrate();
      hydrationSearch = null;
    }
  });
}

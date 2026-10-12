import { useEffect, useState } from "react";
import { Portal } from "@ark-ui/react/portal";
import { XIcon } from "lucide-react";
import { Editor } from "@/components/editor";
import { FileTree } from "@/components/file-tree";
import { SideMenu } from "@/components/side-menu";
import { Drawer, Splitter, useSplitter } from "@/components/ui";
import { toServerAbsoluteUrl } from "@/lib/api-client";
import { useServersStore } from "@/stores/servers";
import { useWorkspaceStore } from "@/stores/workspace";

export function Workspace() {
  const panelsInUrl = useWorkspaceStore((state) => state.panels);
  const activeInUrl = useWorkspaceStore((state) => state.active);
  const treeOpen = useWorkspaceStore((state) => state.tree);
  const openPanel = useWorkspaceStore((state) => state.openPanel);
  const closePanel = useWorkspaceStore((state) => state.closePanel);
  const selectPanel = useWorkspaceStore((state) => state.selectPanel);
  const setPanelRaw = useWorkspaceStore((state) => state.setPanelRaw);
  const setTreeOpen = useWorkspaceStore((state) => state.setTreeOpen);
  const serverUrl = useServersStore((state) => state.currentServerUrl);
  const [isDesktop, setIsDesktop] = useState(() =>
    window.matchMedia("(min-width: 64rem)").matches,
  );
  const panels = serverUrl ? panelsInUrl : [];
  const activePanelPath = panels.some((panel) => panel.path === activeInUrl)
    ? activeInUrl
    : (panels.at(-1)?.path ?? null);
  const activeFileUrl = activePanelPath
    ? toServerAbsoluteUrl(activePanelPath)
    : null;

  const splitter = useSplitter({
    panels: [
      {
        id: "file-tree",
        minSize: "120px",
        collapsible: true,
        collapsedSize: 0,
      },
      { id: "editor", minSize: "120px" },
    ],
    defaultSize: [treeOpen === false ? "0px" : "400px"],
    onCollapse: ({ panelId }) => {
      if (panelId === "file-tree") {
        setTreeOpen(false);
      }
    },
    onExpand: ({ panelId }) => {
      if (panelId === "file-tree") {
        setTreeOpen(true);
      }
    },
  });
  const fileTreeCollapsed = splitter.isPanelCollapsed("file-tree");

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 64rem)");
    const updateDesktop = () => setIsDesktop(desktop.matches);

    desktop.addEventListener("change", updateDesktop);
    return () => desktop.removeEventListener("change", updateDesktop);
  }, []);

  useEffect(() => {
    if (treeOpen === false && !fileTreeCollapsed) {
      splitter.collapsePanel("file-tree");
    } else if (treeOpen !== false && fileTreeCollapsed) {
      splitter.expandPanel("file-tree");
    }
  }, [treeOpen, fileTreeCollapsed, splitter]);

  return (
    <Drawer.Root
      open={treeOpen === true && !isDesktop}
      onOpenChange={({ open }) => {
        setTreeOpen(open);
      }}
      finalFocusEl={() =>
        document.querySelector<HTMLElement>("[data-side-menu-trigger]")
      }
      swipeDirection="start"
      lazyMount
    >
      <div className="flex h-full min-w-0">
        <SideMenu
          selectedMenu={fileTreeCollapsed ? null : "file-tree"}
          onSelectMenu={() => {
            setTreeOpen(fileTreeCollapsed);
          }}
        />
        <Splitter.RootProvider value={splitter} className="min-w-0 flex-1">
          <Splitter.Panel id="file-tree" className="hidden pr-0.5 lg:block">
            <FileTree
              activeFileUrl={activeFileUrl}
              onOpenFile={(file) => openPanel(file, !isDesktop)}
            />
          </Splitter.Panel>
          <Splitter.ResizeTrigger
            id="file-tree:editor"
            aria-label="파일 트리 너비 조절"
            className={
              treeOpen === false || fileTreeCollapsed ? "hidden" : "hidden lg:flex"
            }
          >
            <Splitter.ResizeTriggerIndicator />
          </Splitter.ResizeTrigger>
          <Splitter.Panel id="editor">
            <Editor
              panels={panels}
              activePanelPath={activePanelPath}
              onSelectPanel={selectPanel}
              onClosePanel={closePanel}
              onRawChange={setPanelRaw}
            />
          </Splitter.Panel>
        </Splitter.RootProvider>
      </div>
      <Portal>
        <Drawer.Backdrop className="inset-0 lg:hidden" />
        <Drawer.Positioner className="inset-0 lg:hidden">
          <Drawer.Content
            className="w-[min(92vw,24rem)] flex-row pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] transform-[translate3d(min(0px,var(--drawer-translate-x,0px)),var(--drawer-translate-y,0px),0)]!"
          >
            <SideMenu
              className="flex"
              selectedMenu="file-tree"
              onSelectMenu={() => setTreeOpen(false)}
            />
            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex h-12 shrink-0 items-center justify-between border-b border-zinc-200 px-4">
                <Drawer.Title className="text-base font-semibold text-zinc-950">
                  파일 트리
                </Drawer.Title>
                <Drawer.CloseTrigger
                  type="button"
                  aria-label="사이드 메뉴 닫기"
                  className="flex size-10 items-center justify-center rounded-lg text-zinc-600 focus-visible:outline-2 focus-visible:outline-blue-600"
                >
                  <XIcon size={20} aria-hidden="true" />
                </Drawer.CloseTrigger>
              </div>
              <div className="min-h-0 flex-1">
                <FileTree
                  activeFileUrl={activeFileUrl}
                  onOpenFile={(file) => openPanel(file, !isDesktop)}
                />
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
}

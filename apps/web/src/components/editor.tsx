import { useEffect, useRef, type MouseEvent } from "react";
import { Tabs } from "@ark-ui/react/tabs";
import { FilesIcon, XIcon } from "lucide-react";
import { Drawer } from "@/components/ui";
import type { WorkspacePanel } from "@/lib/workspace-search";
import { Panel } from "./panel";

export type EditorPanel = WorkspacePanel;

type EditorProps = {
  panels: EditorPanel[];
  activePanelPath: string | null;
  onSelectPanel: (path: string) => void;
  onClosePanel: (path: string) => void;
  onRawChange: (path: string, raw: boolean) => void;
};

export function Editor({
  panels,
  activePanelPath,
  onSelectPanel,
  onClosePanel,
  onRawChange,
}: EditorProps) {
  const tabListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    tabListRef.current
      ?.querySelector<HTMLElement>('[data-active="true"]')
      ?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [activePanelPath]);

  function handleClosePanel(e: MouseEvent<HTMLButtonElement>, path: string) {
    e.preventDefault();

    const index = panels.findIndex((panel) => panel.path === path);
    const remaining = panels.filter((panel) => panel.path !== path);
    const focusPath =
      activePanelPath === path
        ? remaining[Math.min(index, remaining.length - 1)]?.path
        : activePanelPath;

    onClosePanel(path);
    requestAnimationFrame(() => {
      const tabs =
        tabListRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
      const nextTab = Array.from(tabs ?? []).find(
        (tab) => tab.dataset.value === focusPath,
      );
      if (nextTab) nextTab.focus();
      else tabListRef.current?.focus();
    });
  }

  return (
    <Tabs.Root
      value={activePanelPath ?? ""}
      onValueChange={({ value }) => onSelectPanel(value)}
      lazyMount
      unmountOnExit
      className="flex h-full min-w-0 flex-col bg-white"
    >
      <Tabs.List
        ref={tabListRef}
        tabIndex={-1}
        aria-label="열린 파일"
        className="order-last flex h-[calc(3.5rem+env(safe-area-inset-bottom))] shrink-0 overflow-x-auto overflow-y-hidden border-t border-zinc-200 px-2 pb-[env(safe-area-inset-bottom)] lg:order-0 lg:h-8 lg:border-t-0 lg:border-b lg:pb-0"
        hidden={panels.length === 0}
      >
        {panels.map((panel) => (
          <div
            key={panel.path}
            data-active={activePanelPath === panel.path}
            className="flex h-full min-w-32 max-w-56 shrink-0 items-center border-t-2 border-transparent text-zinc-500 hover:bg-zinc-50 hover:text-zinc-950 data-[active=true]:border-blue-600 data-[active=true]:text-zinc-950 lg:border-t-0 lg:border-b-2"
          >
            <Tabs.Trigger
              value={panel.path}
              title={panel.path}
              className="h-full min-w-0 flex-1 cursor-pointer truncate pl-3 pr-1 text-left text-sm focus-visible:outline-2 focus-visible:outline-blue-600"
            >
              {panel.name}
            </Tabs.Trigger>
            <button
              type="button"
              aria-label={`${panel.name} 닫기`}
              onClick={(e) => handleClosePanel(e, panel.path)}
              className="mr-1 flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-sm text-zinc-500 hover:bg-zinc-100 hover:text-zinc-950 focus-visible:outline-2 focus-visible:outline-blue-600 lg:size-4"
            >
              <XIcon className="size-3.5 lg:size-2.5" aria-hidden="true" />
            </button>
          </div>
        ))}
      </Tabs.List>
      {panels.map((panel) => (
        <Tabs.Content
          key={panel.path}
          value={panel.path}
          className="min-h-0 min-w-0 w-full flex-1 overflow-hidden"
        >
          <Panel
            panel={panel}
            onRawChange={(raw) => onRawChange(panel.path, raw)}
          />
        </Tabs.Content>
      ))}
      {panels.length === 0 && (
        <div className="flex min-h-0 flex-1 flex-col">
          <header className="flex h-12 shrink-0 items-center border-b border-zinc-200 px-2 lg:hidden">
            <Drawer.Trigger
              type="button"
              aria-label="사이드 메뉴 열기"
              data-side-menu-trigger=""
              className="flex size-10 items-center justify-center rounded-lg text-zinc-600 focus-visible:outline-2 focus-visible:outline-blue-600"
            >
              <FilesIcon size={20} aria-hidden="true" />
            </Drawer.Trigger>
            <span className="min-w-0 flex-1 truncate text-center text-sm font-medium text-zinc-900">
              파일을 선택하세요
            </span>
            <span className="size-10" aria-hidden="true" />
          </header>
          <p className="m-auto px-4 text-center text-sm text-zinc-500">
            파일 트리에서 파일을 선택하세요.
          </p>
        </div>
      )}
    </Tabs.Root>
  );
}

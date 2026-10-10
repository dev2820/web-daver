import { useRef, type MouseEvent } from "react";
import { Tabs } from "@ark-ui/react/tabs";
import { X } from "lucide-react";
import { Panel } from "./panel";

export type EditorPanel = {
  url: string;
  name: string;
};

type EditorProps = {
  panels: EditorPanel[];
  activePanelUrl: string | null;
  onSelectPanel: (url: string) => void;
  onClosePanel: (url: string) => void;
};

export function Editor({
  panels,
  activePanelUrl,
  onSelectPanel,
  onClosePanel,
}: EditorProps) {
  const tabListRef = useRef<HTMLDivElement>(null);

  function handleClosePanel(e: MouseEvent<HTMLButtonElement>, url: string) {
    e.preventDefault();

    const index = panels.findIndex((panel) => panel.url === url);
    const remaining = panels.filter((panel) => panel.url !== url);
    const focusUrl =
      activePanelUrl === url
        ? remaining[Math.min(index, remaining.length - 1)]?.url
        : activePanelUrl;

    onClosePanel(url);
    requestAnimationFrame(() => {
      const tabs =
        tabListRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
      const nextTab = Array.from(tabs ?? []).find(
        (tab) => tab.dataset.value === focusUrl,
      );
      if (nextTab) nextTab.focus();
      else tabListRef.current?.focus();
    });
  }

  return (
    <Tabs.Root
      value={activePanelUrl ?? ""}
      onValueChange={({ value }) => onSelectPanel(value)}
      lazyMount
      unmountOnExit
      className="flex h-full min-w-0 flex-col bg-white"
    >
      <Tabs.List
        ref={tabListRef}
        tabIndex={-1}
        aria-label="열린 파일"
        className="flex h-8 shrink-0 overflow-x-auto border-b border-zinc-200 px-2"
      >
        {panels.map((panel) => (
          <div
            key={panel.url}
            data-active={activePanelUrl === panel.url}
            className="flex h-full min-w-32 max-w-56 shrink-0 items-center border-b-2 border-transparent text-zinc-500 hover:bg-zinc-50 hover:text-zinc-950 data-[active=true]:border-blue-600 data-[active=true]:text-zinc-950"
          >
            <Tabs.Trigger
              value={panel.url}
              title={panel.url}
              className="h-full min-w-0 flex-1 cursor-pointer truncate pl-3 pr-1 text-left text-sm focus-visible:outline-2 focus-visible:outline-blue-600"
            >
              {panel.name}
            </Tabs.Trigger>
            <button
              type="button"
              aria-label={`${panel.name} 닫기`}
              onClick={(e) => handleClosePanel(e, panel.url)}
              className="mr-1 flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-sm text-zinc-500 hover:bg-zinc-100 hover:text-zinc-950 focus-visible:outline-2 focus-visible:outline-blue-600"
            >
              <X size={10} aria-hidden="true" />
            </button>
          </div>
        ))}
      </Tabs.List>
      {panels.map((panel) => (
        <Tabs.Content
          key={panel.url}
          value={panel.url}
          className="min-h-0 flex-1 overflow-hidden"
        >
          <Panel panel={panel} />
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}

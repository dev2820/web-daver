import { useRef } from "react";
import { Tabs } from "@ark-ui/react/tabs";
import { X } from "lucide-react";
import { useMarkdownContent } from "@/features/editor";

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

function MarkdownContent({ url, active }: { url: string; active: boolean }) {
  const { data, isPending, isError } = useMarkdownContent(url, active);

  if (isPending)
    return (
      <p role="status" className="p-6 text-sm text-zinc-500">
        파일을 불러오는 중...
      </p>
    );
  if (isError)
    return (
      <p role="alert" className="p-6 text-sm text-red-600">
        파일을 불러오지 못했습니다.
      </p>
    );

  return (
    <pre className="min-h-full whitespace-pre-wrap wrap-break-words p-6 font-mono text-sm leading-6 text-zinc-900">
      {data}
    </pre>
  );
}

export function Editor({
  panels,
  activePanelUrl,
  onSelectPanel,
  onClosePanel,
}: EditorProps) {
  const tabListRef = useRef<HTMLDivElement>(null);

  function closePanel(url: string) {
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
      className="flex h-full min-w-0 flex-col bg-white"
    >
      <Tabs.List
        ref={tabListRef}
        tabIndex={-1}
        aria-label="열린 파일"
        className="flex h-12 shrink-0 gap-1 overflow-x-auto border-b border-zinc-200 px-2"
      >
        {panels.map((panel) => (
          <div
            key={panel.url}
            className="flex min-w-32 max-w-56 shrink-0 items-center"
          >
            <Tabs.Trigger
              value={panel.url}
              title={panel.url}
              className="h-full min-w-0 flex-1 cursor-pointer truncate border-b-2 border-transparent px-3 text-left text-sm text-zinc-500 hover:text-zinc-950 focus-visible:outline-2 focus-visible:outline-blue-600 aria-selected:border-blue-600 aria-selected:text-zinc-950"
            >
              {panel.name}
            </Tabs.Trigger>
            <button
              type="button"
              aria-label={`${panel.name} 닫기`}
              onClick={() => closePanel(panel.url)}
              className="flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md text-zinc-500 hover:bg-zinc-100 hover:text-zinc-950 focus-visible:outline-2 focus-visible:outline-blue-600"
            >
              <X size={14} aria-hidden="true" />
            </button>
          </div>
        ))}
      </Tabs.List>
      {panels.map((panel) => (
        <Tabs.Content
          key={panel.url}
          value={panel.url}
          className="min-h-0 flex-1 overflow-auto"
        >
          {/\.(md|mdx|markdown)$/i.test(new URL(panel.url).pathname) ? (
            <MarkdownContent
              url={panel.url}
              active={activePanelUrl === panel.url}
            />
          ) : (
            <div className="h-full" />
          )}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}

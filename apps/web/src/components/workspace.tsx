import { useState } from "react";
import { Splitter } from "@ark-ui/react/splitter";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Editor, type EditorPanel } from "@/components/editor";
import { FileTree } from "@/components/file-tree";
import type { FileTreeNode } from "@/features/file-tree";

export function Workspace() {
  const [panels, setPanels] = useState<EditorPanel[]>([]);
  const [activePanelUrl, setActivePanelUrl] = useState<string | null>(null);

  function openPanel(file: FileTreeNode) {
    setPanels((current) =>
      current.some((panel) => panel.url === file.url)
        ? current
        : [...current, { url: file.url, name: file.label }],
    );
    setActivePanelUrl(file.url);
  }

  function closePanel(url: string) {
    const index = panels.findIndex((panel) => panel.url === url);
    if (index < 0) return;

    const remaining = panels.filter((panel) => panel.url !== url);
    setPanels(remaining);
    if (activePanelUrl === url) {
      setActivePanelUrl(
        remaining[Math.min(index, remaining.length - 1)]?.url ?? null,
      );
    }
  }

  return (
    <Splitter.Root
      panels={[
        {
          id: "file-tree",
          minSize: "120px",
          collapsible: true,
          collapsedSize: 0,
        },
        { id: "editor", minSize: "120px" },
      ]}
      defaultSize={["400px"]}
      className="relative"
    >
      <Splitter.Context>
        {(splitter) => {
          const collapsed = splitter.isPanelCollapsed("file-tree");

          return (
            <>
              <button
                type="button"
                aria-label={collapsed ? "파일 트리 펼치기" : "파일 트리 접기"}
                onClick={() =>
                  collapsed
                    ? splitter.expandPanel("file-tree")
                    : splitter.collapsePanel("file-tree")
                }
                className="absolute left-4 top-4 z-10 flex size-10 items-center justify-center rounded-lg text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 focus-visible:outline-2 focus-visible:outline-blue-600"
              >
                {collapsed ? (
                  <PanelLeftOpen size={20} />
                ) : (
                  <PanelLeftClose size={20} />
                )}
              </button>
              <Splitter.Panel id="file-tree" className="min-w-0">
                <FileTree
                  activeFileUrl={activePanelUrl}
                  onOpenFile={openPanel}
                />
              </Splitter.Panel>
              <Splitter.ResizeTrigger
                id="file-tree:editor"
                aria-label="파일 트리 너비 조절"
                className="group relative z-10 -mx-1.5 flex w-3 items-center justify-center bg-zinc-50 hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-blue-600"
              >
                <Splitter.ResizeTriggerIndicator className="h-full w-px bg-zinc-200 group-hover:bg-blue-400 group-focus-visible:bg-blue-600" />
              </Splitter.ResizeTrigger>
              <Splitter.Panel id="editor" className="min-w-0">
                <Editor
                  panels={panels}
                  activePanelUrl={activePanelUrl}
                  onSelectPanel={setActivePanelUrl}
                  onClosePanel={closePanel}
                />
              </Splitter.Panel>
            </>
          );
        }}
      </Splitter.Context>
    </Splitter.Root>
  );
}

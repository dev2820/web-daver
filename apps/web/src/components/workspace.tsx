import { useState } from "react";
import { Splitter, useSplitter } from "@ark-ui/react/splitter";
import { Editor, type EditorPanel } from "@/components/editor";
import { FileTree } from "@/components/file-tree";
import { SideMenu } from "@/components/side-menu";
import type { FileTreeNode } from "@/features/file-tree";

export function Workspace() {
  const [panels, setPanels] = useState<EditorPanel[]>([]);
  const [activePanelUrl, setActivePanelUrl] = useState<string | null>(null);
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
    defaultSize: ["400px"],
  });
  const fileTreeCollapsed = splitter.isPanelCollapsed("file-tree");

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
    <div className="flex h-full min-w-0">
      <SideMenu
        selectedMenu={fileTreeCollapsed ? null : "file-tree"}
        onSelectMenu={() =>
          fileTreeCollapsed
            ? splitter.expandPanel("file-tree")
            : splitter.collapsePanel("file-tree")
        }
      />
      <Splitter.RootProvider value={splitter} className="min-w-0 flex-1">
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
      </Splitter.RootProvider>
    </div>
  );
}

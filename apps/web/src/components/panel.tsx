import { createElement, type ComponentType } from "react";
import type { EditorPanel } from "./editor";
import { createFileClassifier } from "@/lib/file-classifier";
import { toServerAbsoluteUrl } from "@/lib/api-client";
import { isMDFile, isMDXFile } from "@/utils/file";
import { RawContent } from "./raw-content";
import { MarkdownContent } from "./markdown-content";
import { withPanelToolbar, type PanelToolbarProps } from "./with-panel-toolbar";
import { SwitchRawTool } from "./switch-raw-tool";

const MarkdownPanel = withPanelToolbar(MarkdownContent, [SwitchRawTool]);
const RawPanel = withPanelToolbar(RawContent);

const classifier = createFileClassifier<ComponentType<PanelToolbarProps>>()
  .register(isMDFile, MarkdownPanel)
  .register(isMDXFile, MarkdownPanel)
  .registerDefault(RawPanel);

export function Panel({
  panel,
  onRawChange,
}: {
  panel: EditorPanel;
  onRawChange: (raw: boolean) => void;
}) {
  const render = classifier.classify(panel.path)!;

  return createElement(render, {
    url: toServerAbsoluteUrl(panel.path),
    activeContent: panel.raw ? RawContent : undefined,
    onContentChange: (content) => onRawChange(content === RawContent),
  });
}

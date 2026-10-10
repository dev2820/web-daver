import { createElement, Suspense, type ComponentType } from "react";
import { CatchBoundary } from "@tanstack/react-router";
import type { EditorPanel } from "./editor";
import { createFileClassifier } from "@/lib/file-classifier";
import { isMDFile, isMDXFile } from "@/utils/file";
import { RawContent } from "./raw-content";
import { MarkdownContent } from "./markdown-content";
import { withPanelToolbar } from "./with-panel-toolbar";
import { SwitchRawTool } from "./switch-raw-tool";

const MarkdownPanel = withPanelToolbar(MarkdownContent, [SwitchRawTool]);
const RawPanel = withPanelToolbar(RawContent);

const classifier = createFileClassifier<ComponentType<{ url: string }>>()
  .register(isMDFile, MarkdownPanel)
  .register(isMDXFile, MarkdownPanel)
  .registerDefault(RawPanel);

export function Panel({ panel }: { panel: EditorPanel }) {
  const render = classifier.classify(panel.url)!;

  return (
    <CatchBoundary
      getResetKey={() => panel.url}
      errorComponent={() => <ErrorFallback />}
    >
      <Suspense fallback={<LoadingFallback />}>
        {createElement(render, { url: panel.url })}
      </Suspense>
    </CatchBoundary>
  );
}

function LoadingFallback() {
  return (
    <p role="status" className="p-6 text-sm text-zinc-500">
      파일을 불러오는 중...
    </p>
  );
}

function ErrorFallback() {
  return (
    <p role="alert" className="p-6 text-sm text-red-600">
      파일을 불러오지 못했습니다.
    </p>
  );
}

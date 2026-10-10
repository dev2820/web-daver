import { Code2 } from "lucide-react";
import { Tooltip } from "@/components/ui";
import { MarkdownContent } from "./markdown-content";
import { RawContent } from "./raw-content";
import type { PanelToolProps } from "./with-panel-toolbar";

export function SwitchRawTool({
  content,
  onContentChange,
}: PanelToolProps<{ url: string }>) {
  const isRaw = content === RawContent;
  const label = isRaw ? "미리 보기" : "원문 보기";

  return (
    <Tooltip.Root>
      <Tooltip.Trigger
        type="button"
        aria-label={label}
        data-active={isRaw}
        onClick={() => onContentChange(isRaw ? MarkdownContent : RawContent)}
        className="flex size-6 cursor-pointer items-center justify-center rounded text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 focus-visible:outline-2 focus-visible:outline-blue-600 data-[active=true]:bg-zinc-100 data-[active=true]:text-zinc-950"
      >
        <Code2 size={12} aria-hidden="true" />
      </Tooltip.Trigger>
      <Tooltip.Content>{label}</Tooltip.Content>
    </Tooltip.Root>
  );
}

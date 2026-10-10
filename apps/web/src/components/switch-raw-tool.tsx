import { Code2Icon } from "lucide-react";
import { Menu, Tooltip } from "@/components/ui";
import { MarkdownContent } from "./markdown-content";
import { RawContent } from "./raw-content";
import type { PanelToolProps } from "./with-panel-toolbar";

export function SwitchRawTool({
  content,
  onContentChange,
  presentation = "toolbar",
}: PanelToolProps) {
  const isRaw = content === RawContent;
  const label = isRaw ? "미리 보기" : "원문 보기";
  const toggle = () => onContentChange(isRaw ? MarkdownContent : RawContent);

  if (presentation === "menu") {
    return (
      <Menu.Item
        value="switch-raw"
        onSelect={toggle}
      >
        <Code2Icon size={16} aria-hidden="true" />
        {label}
      </Menu.Item>
    );
  }

  return (
    <Tooltip.Root>
      <Tooltip.Trigger
        type="button"
        aria-label={label}
        data-active={isRaw}
        onClick={toggle}
        className="flex size-6 cursor-pointer items-center justify-center rounded text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 focus-visible:outline-2 focus-visible:outline-blue-600 data-[active=true]:bg-zinc-100 data-[active=true]:text-zinc-950"
      >
        <Code2Icon size={12} aria-hidden="true" />
      </Tooltip.Trigger>
      <Tooltip.Content>{label}</Tooltip.Content>
    </Tooltip.Root>
  );
}

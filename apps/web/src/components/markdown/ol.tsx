import type { MarkdownElementProps } from "./types";

export function MarkdownOrderedList({
  node: _node,
  ...props
}: MarkdownElementProps<"ol">) {
  return <ol {...props} className="list-decimal pl-6" />;
}

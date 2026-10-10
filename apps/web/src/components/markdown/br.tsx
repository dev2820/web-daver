import type { MarkdownElementProps } from "./types";

export function MarkdownLineBreak({
  node: _node,
  ...props
}: MarkdownElementProps<"br">) {
  return <br {...props} />;
}

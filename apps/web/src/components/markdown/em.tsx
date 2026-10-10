import type { MarkdownElementProps } from "./types";

export function MarkdownEmphasis({
  node: _node,
  ...props
}: MarkdownElementProps<"em">) {
  return <em {...props} />;
}

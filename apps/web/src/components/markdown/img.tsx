import type { MarkdownElementProps } from "./types";

export function MarkdownImage({
  node: _node,
  ...props
}: MarkdownElementProps<"img">) {
  return <img {...props} />;
}

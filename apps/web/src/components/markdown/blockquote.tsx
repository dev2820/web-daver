import type { MarkdownElementProps } from "./types";

export function MarkdownBlockquote({
  node: _node,
  ...props
}: MarkdownElementProps<"blockquote">) {
  return <blockquote {...props} />;
}

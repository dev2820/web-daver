import type { MarkdownElementProps } from "./types";

export function MarkdownPre({
  node: _node,
  ...props
}: MarkdownElementProps<"pre">) {
  return <pre {...props} />;
}

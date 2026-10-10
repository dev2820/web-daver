import type { MarkdownElementProps } from "./types";

export function MarkdownStrong({
  node: _node,
  ...props
}: MarkdownElementProps<"strong">) {
  return <strong {...props} />;
}

import type { MarkdownElementProps } from "./types";

export function MarkdownStrong({
  node: _node,
  style,
  ...props
}: MarkdownElementProps<"strong">) {
  return <strong {...props} style={{ fontWeight: 600, ...style }} />;
}

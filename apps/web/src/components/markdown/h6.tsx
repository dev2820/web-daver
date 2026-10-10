import type { MarkdownElementProps } from "./types";

export function MarkdownHeading6({
  node: _node,
  ...props
}: MarkdownElementProps<"h6">) {
  return <h6 {...props} />;
}

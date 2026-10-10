import type { MarkdownElementProps } from "./types";

export function MarkdownHeading4({
  node: _node,
  ...props
}: MarkdownElementProps<"h4">) {
  return <h4 {...props} />;
}

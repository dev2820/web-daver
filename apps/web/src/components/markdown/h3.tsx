import type { MarkdownElementProps } from "./types";

export function MarkdownHeading3({
  node: _node,
  ...props
}: MarkdownElementProps<"h3">) {
  return <h3 {...props} />;
}

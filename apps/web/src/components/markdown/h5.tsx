import type { MarkdownElementProps } from "./types";

export function MarkdownHeading5({
  node: _node,
  ...props
}: MarkdownElementProps<"h5">) {
  return <h5 {...props} />;
}

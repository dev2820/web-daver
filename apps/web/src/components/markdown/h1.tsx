import type { MarkdownElementProps } from "./types";

export function MarkdownHeading1({
  node: _node,
  ...props
}: MarkdownElementProps<"h1">) {
  return <h1 {...props} className="text-2xl font-bold" />;
}

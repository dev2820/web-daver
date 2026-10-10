import type { MarkdownElementProps } from "./types";

export function MarkdownHeading2({
  node: _node,
  ...props
}: MarkdownElementProps<"h2">) {
  return <h2 {...props} className="text-xl font-semibold" />;
}

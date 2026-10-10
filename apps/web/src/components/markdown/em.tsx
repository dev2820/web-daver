import type { MarkdownElementProps } from "./types";

export function MarkdownEmphasis({
  node: _node,
  style,
  ...props
}: MarkdownElementProps<"em">) {
  return <em {...props} style={{ fontStyle: "italic", ...style }} />;
}

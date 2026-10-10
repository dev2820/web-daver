import type { MarkdownElementProps } from "./types";

export function MarkdownListItem({
  node: _node,
  style,
  ...props
}: MarkdownElementProps<"li">) {
  return <li {...props} style={{ marginTop: "0.25rem", ...style }} />;
}

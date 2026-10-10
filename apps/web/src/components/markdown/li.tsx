import type { MarkdownElementProps } from "./types";

export function MarkdownListItem({
  node: _node,
  ...props
}: MarkdownElementProps<"li">) {
  return <li {...props} />;
}

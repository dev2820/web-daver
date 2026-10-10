import type { MarkdownElementProps } from "./types";

export function MarkdownLink({
  node: _node,
  ...props
}: MarkdownElementProps<"a">) {
  return <a {...props} />;
}

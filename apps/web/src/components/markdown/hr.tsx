import type { MarkdownElementProps } from "./types";

export function MarkdownRule({
  node: _node,
  ...props
}: MarkdownElementProps<"hr">) {
  return <hr {...props} />;
}

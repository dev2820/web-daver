import type { MarkdownElementProps } from "./types";

export function MarkdownCode({
  node: _node,
  ...props
}: MarkdownElementProps<"code">) {
  return <code {...props} />;
}

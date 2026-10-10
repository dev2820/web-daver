import type { MarkdownElementProps } from "./types";

export function MarkdownParagraph({
  node: _node,
  ...props
}: MarkdownElementProps<"p">) {
  return <p {...props} className="my-3" />;
}

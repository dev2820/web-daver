import type { MarkdownElementProps } from "./types";

export function MarkdownParagraph({
  node: _node,
  style,
  ...props
}: MarkdownElementProps<"p">) {
  return <p {...props} style={{ margin: "0 0 1rem", ...style }} />;
}

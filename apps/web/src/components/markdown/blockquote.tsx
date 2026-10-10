import type { MarkdownElementProps } from "./types";

export function MarkdownBlockquote({
  node: _node,
  style,
  ...props
}: MarkdownElementProps<"blockquote">) {
  return (
    <blockquote
      {...props}
      style={{
        margin: "0 0 1rem",
        padding: "0 1rem",
        borderLeft: "4px solid #d4d4d8",
        color: "#52525b",
        ...style,
      }}
    />
  );
}

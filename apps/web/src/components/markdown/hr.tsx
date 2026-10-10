import type { MarkdownElementProps } from "./types";

export function MarkdownRule({
  node: _node,
  style,
  ...props
}: MarkdownElementProps<"hr">) {
  return (
    <hr
      {...props}
      style={{
        margin: "1.5rem 0",
        border: 0,
        borderTop: "1px solid #d4d4d8",
        ...style,
      }}
    />
  );
}

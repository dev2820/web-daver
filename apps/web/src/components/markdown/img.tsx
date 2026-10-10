import type { MarkdownElementProps } from "./types";

export function MarkdownImage({
  node: _node,
  style,
  ...props
}: MarkdownElementProps<"img">) {
  return (
    <img
      {...props}
      style={{
        maxWidth: "100%",
        height: "auto",
        borderRadius: "0.375rem",
        verticalAlign: "middle",
        ...style,
      }}
    />
  );
}

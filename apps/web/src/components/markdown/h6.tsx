import type { MarkdownElementProps } from "./types";

export function MarkdownHeading6({
  node: _node,
  style,
  ...props
}: MarkdownElementProps<"h6">) {
  return (
    <h6
      {...props}
      style={{
        margin: "1.25rem 0 0.75rem",
        color: "#52525b",
        fontSize: "0.875rem",
        fontWeight: 600,
        lineHeight: 1.4,
        ...style,
      }}
    />
  );
}

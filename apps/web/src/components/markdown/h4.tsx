import type { MarkdownElementProps } from "./types";

export function MarkdownHeading4({
  node: _node,
  style,
  ...props
}: MarkdownElementProps<"h4">) {
  return (
    <h4
      {...props}
      style={{
        margin: "1.25rem 0 0.75rem",
        fontSize: "1rem",
        fontWeight: 600,
        lineHeight: 1.4,
        ...style,
      }}
    />
  );
}

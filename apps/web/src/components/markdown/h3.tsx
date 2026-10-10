import type { MarkdownElementProps } from "./types";

export function MarkdownHeading3({
  node: _node,
  style,
  ...props
}: MarkdownElementProps<"h3">) {
  return (
    <h3
      {...props}
      style={{
        margin: "1.5rem 0 0.75rem",
        fontSize: "1.25rem",
        fontWeight: 600,
        lineHeight: 1.35,
        ...style,
      }}
    />
  );
}

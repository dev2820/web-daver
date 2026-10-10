import type { MarkdownElementProps } from "./types";

export function MarkdownHeading5({
  node: _node,
  style,
  ...props
}: MarkdownElementProps<"h5">) {
  return (
    <h5
      {...props}
      style={{
        margin: "1.25rem 0 0.75rem",
        fontSize: "0.875rem",
        fontWeight: 600,
        lineHeight: 1.4,
        ...style,
      }}
    />
  );
}

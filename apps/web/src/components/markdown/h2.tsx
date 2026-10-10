import type { MarkdownElementProps } from "./types";

export function MarkdownHeading2({
  node: _node,
  style,
  ...props
}: MarkdownElementProps<"h2">) {
  return (
    <h2
      {...props}
      style={{
        margin: "1.5rem 0 1rem",
        paddingBottom: "0.3em",
        borderBottom: "1px solid #e4e4e7",
        fontSize: "1.5rem",
        fontWeight: 600,
        lineHeight: 1.3,
        letterSpacing: "-0.02em",
        ...style,
      }}
    />
  );
}

import type { MarkdownElementProps } from "./types";

export function MarkdownHeading1({
  node: _node,
  style,
  ...props
}: MarkdownElementProps<"h1">) {
  return (
    <h1
      {...props}
      style={{
        margin: "1.75rem 0 1rem",
        paddingBottom: "0.3em",
        borderBottom: "1px solid #e4e4e7",
        fontSize: "2rem",
        fontWeight: 600,
        lineHeight: 1.25,
        letterSpacing: "-0.025em",
        ...style,
      }}
    />
  );
}

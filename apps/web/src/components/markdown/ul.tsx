import type { MarkdownElementProps } from "./types";

export function MarkdownUnorderedList({
  node: _node,
  style,
  ...props
}: MarkdownElementProps<"ul">) {
  return (
    <ul
      {...props}
      style={{
        margin: "0 0 1rem",
        paddingLeft: "1.75rem",
        listStyleType: "disc",
        ...style,
      }}
    />
  );
}

import type { MarkdownElementProps } from "./types";

export function MarkdownOrderedList({
  node: _node,
  style,
  ...props
}: MarkdownElementProps<"ol">) {
  return (
    <ol
      {...props}
      style={{
        margin: "0 0 1rem",
        paddingLeft: "1.75rem",
        listStyleType: "decimal",
        ...style,
      }}
    />
  );
}

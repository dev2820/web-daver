import type { MarkdownElementProps } from "./types";

export function MarkdownLink({
  node: _node,
  style,
  ...props
}: MarkdownElementProps<"a">) {
  return (
    <a
      {...props}
      style={{
        color: "#2563eb",
        textDecoration: "underline",
        textUnderlineOffset: "0.18em",
        overflowWrap: "anywhere",
        ...style,
      }}
    />
  );
}

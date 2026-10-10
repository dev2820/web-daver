import type { MarkdownElementProps } from "./types";

export function MarkdownCode({
  node: _node,
  style,
  ...props
}: MarkdownElementProps<"code">) {
  return (
    <code
      {...props}
      style={{
        padding: "0.15em 0.35em",
        borderRadius: "0.375rem",
        backgroundColor: "#f4f4f5",
        fontFamily:
          'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
        fontSize: "0.875em",
        whiteSpace: "break-spaces",
        ...style,
      }}
    />
  );
}

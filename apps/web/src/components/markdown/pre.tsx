import { cloneElement, isValidElement, type CSSProperties } from "react";
import type { MarkdownElementProps } from "./types";

export function MarkdownPre({
  node: _node,
  children,
  style,
  ...props
}: MarkdownElementProps<"pre">) {
  const content = isValidElement<{ style?: CSSProperties }>(children)
    ? cloneElement(children, {
        style: {
          ...children.props.style,
          padding: 0,
          borderRadius: 0,
          backgroundColor: "transparent",
          fontSize: "inherit",
          lineHeight: "inherit",
          whiteSpace: "pre",
        },
      })
    : children;

  return (
    <pre
      {...props}
      style={{
        margin: "0 0 1rem",
        padding: "1rem",
        overflowX: "auto",
        borderRadius: "0.5rem",
        backgroundColor: "#f4f4f5",
        fontFamily:
          'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
        fontSize: "0.875rem",
        lineHeight: 1.5,
        tabSize: 2,
        ...style,
      }}
    >
      {content}
    </pre>
  );
}

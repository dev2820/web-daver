import { cloneElement, isValidElement, type CSSProperties } from "react";
import { cn } from "@/lib/utils";
import type { MarkdownElementProps } from "./types";

export function MarkdownPre({
  node: _node,
  children,
  className,
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
          whiteSpace: "inherit",
        },
      })
    : children;

  return (
    <pre
      {...props}
      className={cn(
        "max-w-full overflow-x-hidden whitespace-pre-wrap wrap-anywhere lg:overflow-x-auto lg:whitespace-pre lg:wrap-normal",
        className,
      )}
      style={{
        margin: "0 0 1rem",
        padding: "1rem",
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

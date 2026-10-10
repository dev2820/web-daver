import type { MarkdownElementProps } from "./types";

export function MarkdownUnorderedList({
  node: _node,
  ...props
}: MarkdownElementProps<"ul">) {
  return <ul {...props} className="list-disc pl-6" />;
}

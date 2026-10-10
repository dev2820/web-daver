import type { ComponentProps } from "react";
import type Markdown from "react-markdown";
import type { Components } from "react-markdown";

export function withMarkdownComponents(components: Components) {
  return function (Base: typeof Markdown) {
    return function MarkdownWithComponents(
      props: Omit<ComponentProps<typeof Markdown>, "components">,
    ) {
      return <Base {...props} components={components} />;
    };
  };
}

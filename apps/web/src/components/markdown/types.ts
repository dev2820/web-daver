import type { ComponentProps, JSX } from "react";
import type { ExtraProps } from "react-markdown";

export type MarkdownElementProps<Tag extends keyof JSX.IntrinsicElements> =
  ComponentProps<Tag> & ExtraProps;

import type { Components } from "react-markdown";
import { MarkdownLink } from "./a";
import { MarkdownBlockquote } from "./blockquote";
import { MarkdownLineBreak } from "./br";
import { MarkdownCode } from "./code";
import { MarkdownEmphasis } from "./em";
import { MarkdownHeading1 } from "./h1";
import { MarkdownHeading2 } from "./h2";
import { MarkdownHeading3 } from "./h3";
import { MarkdownHeading4 } from "./h4";
import { MarkdownHeading5 } from "./h5";
import { MarkdownHeading6 } from "./h6";
import { MarkdownRule } from "./hr";
import { MarkdownImage } from "./img";
import { MarkdownListItem } from "./li";
import { MarkdownOrderedList } from "./ol";
import { MarkdownParagraph } from "./p";
import { MarkdownPre } from "./pre";
import { MarkdownStrong } from "./strong";
import { MarkdownTable } from "./table";
import { MarkdownUnorderedList } from "./ul";

export const markdownComponents = {
  a: MarkdownLink,
  blockquote: MarkdownBlockquote,
  br: MarkdownLineBreak,
  code: MarkdownCode,
  em: MarkdownEmphasis,
  h1: MarkdownHeading1,
  h2: MarkdownHeading2,
  h3: MarkdownHeading3,
  h4: MarkdownHeading4,
  h5: MarkdownHeading5,
  h6: MarkdownHeading6,
  hr: MarkdownRule,
  img: MarkdownImage,
  li: MarkdownListItem,
  ol: MarkdownOrderedList,
  p: MarkdownParagraph,
  pre: MarkdownPre,
  strong: MarkdownStrong,
  table: MarkdownTable,
  ul: MarkdownUnorderedList,
} satisfies Components;

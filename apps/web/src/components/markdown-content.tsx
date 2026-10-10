import Markdown, { defaultUrlTransform } from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import "katex/dist/katex.min.css";
import { useSuspenseRawContent } from "@/features/raw-content";
import { markdownComponents } from "./markdown";
import { withMarkdownComponents } from "./with-markdown-components";

const RenderMarkdown = withMarkdownComponents(markdownComponents)(Markdown);
const frontmatterPattern =
  /^(?:\uFEFF)?---[ \t]*\r?\n(?:[^\r\n]*\r?\n)*?(?:---|\.\.\.)[ \t]*(?:\r?\n|$)/;

export function MarkdownContent({ url }: { url: string }) {
  const { data: rawContent } = useSuspenseRawContent(url);
  const previewContent = rawContent.replace(frontmatterPattern, "");

  return (
    <div
      style={{
        minHeight: "100%",
        padding: "1.5rem",
        color: "#18181b",
        fontSize: "1rem",
        lineHeight: 1.6,
        overflowWrap: "break-word",
      }}
    >
      <div style={{ maxWidth: "70ch", width: "100%" }}>
        <RenderMarkdown
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex]}
          urlTransform={(value, key, node) => {
            const safeUrl = defaultUrlTransform(value);
            if (key !== "src" || node.tagName !== "img" || !safeUrl) {
              return safeUrl;
            }

            try {
              return new URL(safeUrl, url).href;
            } catch {
              return safeUrl;
            }
          }}
        >
          {previewContent}
        </RenderMarkdown>
      </div>
    </div>
  );
}

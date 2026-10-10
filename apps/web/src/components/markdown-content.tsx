import Markdown, { defaultUrlTransform } from "react-markdown";
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
    <div className="min-h-full p-6 text-sm leading-6 text-zinc-900">
      <div className="max-w-170 w-full">
        <RenderMarkdown
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

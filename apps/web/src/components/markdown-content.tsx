import { useSuspenseMarkdownContent } from "@/features/markdown-content";

export function MarkdownContent({ url }: { url: string }) {
  const { data } = useSuspenseMarkdownContent(url);

  return (
    <div
      className="min-h-full p-6 text-sm leading-6 text-zinc-900 [&_h1]:text-2xl [&_h1]:font-bold [&_h2]:text-xl [&_h2]:font-semibold [&_p]:my-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6"
      dangerouslySetInnerHTML={{ __html: data }}
    />
  );
}

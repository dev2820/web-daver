import { useSuspenseRawContent } from "@/features/raw-content";

export function RawContent({ url }: { url: string }) {
  const { data } = useSuspenseRawContent(url);

  return (
    <pre className="min-h-full whitespace-pre-wrap wrap-break-words p-6 font-mono text-sm leading-6 text-zinc-900">
      {data}
    </pre>
  );
}

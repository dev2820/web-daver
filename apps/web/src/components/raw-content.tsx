import { useSuspenseRawContent } from "@/features/raw-content";

export function RawContent({ url }: { url: string }) {
  const { data } = useSuspenseRawContent(url);

  return (
    <div
      style={{
        minHeight: "100%",
        color: "#18181b",
        fontSize: "1rem",
        lineHeight: 1.6,
        padding: "1rem",
        overflowWrap: "break-word",
      }}
    >
      <div style={{ maxWidth: "70ch", width: "100%" }}>
        <pre className="min-h-full whitespace-pre-wrap wrap-break-words font-mono text-sm leading-6 text-zinc-900">
          {data}
        </pre>
      </div>
    </div>
  );
}

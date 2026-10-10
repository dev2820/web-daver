import { ChevronRight } from "lucide-react";
import { toServerRelativePath } from "@/lib/api-client";

export function FileDepthNavigator({ url }: { url: string }) {
  const path = toServerRelativePath(url).split("?")[0];
  const segments = path.split("/").filter(Boolean).map(decodeURIComponent);

  return (
    <nav aria-label="파일 위치" className="min-w-0 flex-1">
      <ol className="flex min-w-0 items-center gap-1 text-xs text-zinc-500">
        {segments.map((segment, index) => (
          <li key={index} className="flex min-w-0 items-center gap-1">
            {index > 0 && <ChevronRight size={12} className="shrink-0" aria-hidden="true" />}
            <span
              title={segment}
              aria-current={index === segments.length - 1 ? "location" : undefined}
              className="truncate aria-[current=location]:font-medium aria-[current=location]:text-zinc-900"
            >
              {segment}
            </span>
          </li>
        ))}
      </ol>
    </nav>
  );
}

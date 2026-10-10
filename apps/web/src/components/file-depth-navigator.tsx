import { ChevronRight } from "lucide-react";
import { toServerRelativePath } from "@/lib/api-client";

export function FileDepthNavigator({ url }: { url: string }) {
  const path = toServerRelativePath(url).split("?")[0];
  const segments = path.split("/").filter(Boolean).map(decodeURIComponent);

  return (
    <nav aria-label="파일 위치" className="min-w-0 flex-1">
      <ol className="flex min-w-0 items-center justify-center gap-1 text-sm text-zinc-500 lg:justify-start lg:text-xs">
        {segments.map((segment, index) => (
          <li key={index} className="hidden min-w-0 items-center gap-1 last:flex lg:flex">
            {index > 0 && <ChevronRight size={12} className="hidden shrink-0 lg:block" aria-hidden="true" />}
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

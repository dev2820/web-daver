import { useMemo } from "react";
import { micromark } from "micromark";
import { useRawContent, useSuspenseRawContent } from "@/features/raw-content";

export function useMarkdownContent(url: string) {
  const { data: rawContent } = useRawContent(url);
  const data = useMemo(() => micromark(rawContent ?? ""), [rawContent]);

  return { data };
}

export function useSuspenseMarkdownContent(url: string) {
  const { data: rawContent } = useSuspenseRawContent(url);
  const data = useMemo(() => micromark(rawContent), [rawContent]);

  return { data };
}

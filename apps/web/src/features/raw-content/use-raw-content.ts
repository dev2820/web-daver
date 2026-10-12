import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { apiClient, toServerRelativePath } from "@/lib/api-client";

const markdownQueries = {
  content: (url: string) =>
    queryOptions({
      queryKey: ["editor", "raw", url] as const,
      queryFn: ({ signal }) =>
        apiClient(toServerRelativePath(url), { signal, retry: 0 }).text(),
      staleTime: 60_000,
      retry: false,
    }),
};

export function useRawContent(url: string) {
  return useQuery(markdownQueries.content(url));
}

export function useSuspenseRawContent(url: string) {
  return useSuspenseQuery(markdownQueries.content(url));
}

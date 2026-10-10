import { queryOptions, useQuery } from '@tanstack/react-query'
import { apiClient, toServerRelativePath } from '@/lib/api-client'

const markdownQueries = {
  content: (url: string) => queryOptions({
    queryKey: ['editor', 'markdown', url] as const,
    queryFn: ({ signal }) => apiClient.get(toServerRelativePath(url), { signal, retry: 0 }).text(),
    staleTime: 60_000,
    retry: false,
  }),
}

export function useMarkdownContent(url: string, enabled: boolean) {
  return useQuery({ ...markdownQueries.content(url), enabled })
}

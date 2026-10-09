import { queryOptions } from '@tanstack/react-query'
import { fetchDirectory, toDirectoryUrl } from './api'

export const fileTreeQueries = {
  directory: (url: string) => {
    const directoryUrl = url ? toDirectoryUrl(url) : ''

    return queryOptions({
      queryKey: ['file-tree', 'directory', directoryUrl] as const,
      queryFn: ({ signal }) => fetchDirectory(directoryUrl, signal),
      staleTime: 60_000,
      retry: false,
    })
  },
}

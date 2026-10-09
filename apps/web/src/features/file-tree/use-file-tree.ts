import { useCallback } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { toDirectoryUrl, type FileTreeNode } from './api'
import { fileTreeQueries } from './queries'

const emptyNodes: FileTreeNode[] = []

export function useFileTree(serverUrl: string | null) {
  const queryClient = useQueryClient()
  const rootUrl = serverUrl ? toDirectoryUrl(serverUrl) : null
  const query = useQuery({
    ...fileTreeQueries.directory(rootUrl ?? ''),
    enabled: rootUrl !== null,
  })

  const loadChildren = useCallback(
    (url: string) => queryClient.fetchQuery(fileTreeQueries.directory(url)),
    [queryClient],
  )

  return {
    nodes: query.data ?? emptyNodes,
    isPending: query.isPending,
    isError: query.isError,
    error: query.error,
    loadChildren,
  }
}

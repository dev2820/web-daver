import ky, { type Options } from 'ky'
import { useServersStore } from '@/stores/servers'

function selectedServer(): URL {
  const serverUrl = useServersStore.getState().currentServerUrl
  if (!serverUrl) throw new Error('서버가 선택되지 않았습니다.')

  const server = new URL(serverUrl)
  if (!server.pathname.endsWith('/')) server.pathname += '/'
  return server
}

export function toServerRelativePath(url: string): string {
  const server = selectedServer()
  const target = new URL(url)
  if (target.origin !== server.origin || !target.pathname.startsWith(server.pathname)) {
    throw new Error('선택한 서버의 파일 경로가 아닙니다.')
  }

  return `${target.pathname.slice(server.pathname.length)}${target.search}`
}

export function toServerAbsoluteUrl(path: string): string {
  const server = selectedServer()
  const target = new URL(path, server)
  if (target.origin !== server.origin || !target.pathname.startsWith(server.pathname)) {
    throw new Error('선택한 서버의 파일 경로가 아닙니다.')
  }

  return target.href
}

export function apiClient(path: string, options?: Options) {
  return ky(path, { ...options, baseUrl: selectedServer().href })
}

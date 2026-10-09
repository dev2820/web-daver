import { apiClient, toServerRelativePath } from '@/lib/api-client'

const nameCollator = new Intl.Collator(undefined, { sensitivity: 'base' })

export type FileTreeNode = {
  value: string
  label: string
  url: string
  kind: 'file' | 'directory'
  children?: FileTreeNode[]
  childrenCount?: number
}

export function toDirectoryUrl(url: string) {
  const directory = new URL(url)
  if (!directory.pathname.endsWith('/')) directory.pathname += '/'
  return directory.href
}

function parseDirectory(xml: string, directoryUrl: string): FileTreeNode[] {
  const document = new DOMParser().parseFromString(xml, 'application/xml')
  if (document.getElementsByTagName('parsererror').length > 0) {
    throw new Error('서버의 파일 목록 응답을 읽을 수 없습니다.')
  }

  const directory = new URL(directoryUrl)
  const nodes: FileTreeNode[] = []

  for (const response of Array.from(document.getElementsByTagNameNS('DAV:', 'response'))) {
    const href = response.getElementsByTagNameNS('DAV:', 'href')[0]?.textContent
    if (!href) continue

    const url = new URL(href, directory)
    const relativePath = url.pathname.slice(directory.pathname.length).replace(/\/$/, '')
    if (url.origin !== directory.origin || !url.pathname.startsWith(directory.pathname)) continue
    if (!relativePath || relativePath.includes('/')) continue

    const properties = Array.from(response.getElementsByTagNameNS('DAV:', 'propstat'))
      .filter((propstat) => /\b200\b/.test(propstat.getElementsByTagNameNS('DAV:', 'status')[0]?.textContent ?? ''))
      .map((propstat) => propstat.getElementsByTagNameNS('DAV:', 'prop')[0])
      .filter((prop): prop is Element => Boolean(prop))

    const isDirectory = properties.some((prop) => prop.getElementsByTagNameNS('DAV:', 'collection').length > 0)
    const displayName = properties
      .map((prop) => prop.getElementsByTagNameNS('DAV:', 'displayname')[0]?.textContent?.trim())
      .find(Boolean)
    const name = displayName || decodeURIComponent(relativePath)
    const nodeUrl = isDirectory ? toDirectoryUrl(url.href) : url.href

    nodes.push({
      value: nodeUrl,
      label: name,
      url: nodeUrl,
      kind: isDirectory ? 'directory' : 'file',
      ...(isDirectory ? { childrenCount: 1 } : {}),
    })
  }

  return nodes.sort((a, b) => nameCollator.compare(a.label, b.label))
}

export async function fetchDirectory(url: string, signal?: AbortSignal) {
  const directoryUrl = toDirectoryUrl(url)
  const xml = await apiClient(toServerRelativePath(directoryUrl), {
    method: 'PROPFIND',
    headers: { Depth: '1', 'Content-Type': 'application/xml; charset=utf-8' },
    body: '<?xml version="1.0"?><d:propfind xmlns:d="DAV:"><d:prop><d:displayname/><d:resourcetype/></d:prop></d:propfind>',
    retry: 0,
    signal,
  }).text()

  return parseDirectory(xml, directoryUrl)
}

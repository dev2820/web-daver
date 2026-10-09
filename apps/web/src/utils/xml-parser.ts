const DAV_NAMESPACE = 'DAV:'

export type WebDavResource = {
  href: string
  name: string
  isDirectory: boolean
  size: number | null
  lastModified: string | null
}

function davChild(parent: Element, name: string): Element | null {
  return Array.from(parent.children).find(
    (child) => child.namespaceURI === DAV_NAMESPACE && child.localName === name,
  ) ?? null
}

function resourceName(href: string): string {
  const path = href.split(/[?#]/, 1)[0].replace(/\/$/, '')
  const segment = path.slice(path.lastIndexOf('/') + 1)

  try {
    return decodeURIComponent(segment || '/')
  } catch {
    return segment || '/'
  }
}

export function parseWebDavResponse(xml: string): WebDavResource[] {
  const document = new DOMParser().parseFromString(xml, 'application/xml')
  const root = document.documentElement

  if (root.namespaceURI !== DAV_NAMESPACE || root.localName !== 'multistatus') {
    throw new Error('Invalid WebDAV multistatus XML')
  }

  return Array.from(root.children)
    .filter((child) => child.namespaceURI === DAV_NAMESPACE && child.localName === 'response')
    .flatMap((response) => {
      const href = davChild(response, 'href')?.textContent?.trim()
      if (!href) return []

      const props = Array.from(response.children)
        .filter((child) => child.namespaceURI === DAV_NAMESPACE && child.localName === 'propstat')
        .filter((propstat) =>
          /^HTTP\/\d(?:\.\d)?\s+2\d\d(?:\s|$)/i.test(davChild(propstat, 'status')?.textContent?.trim() ?? ''),
        )
        .map((propstat) => davChild(propstat, 'prop'))
        .filter((prop): prop is Element => prop !== null)

      if (props.length === 0) return []

      const property = (name: string) =>
        props.map((prop) => davChild(prop, name)).find((value) => value !== null) ?? null
      const sizeText = property('getcontentlength')?.textContent?.trim()
      const size = sizeText ? Number(sizeText) : NaN
      const resourceType = property('resourcetype')

      return [{
        href,
        name: property('displayname')?.textContent?.trim() || resourceName(href),
        isDirectory: resourceType !== null && davChild(resourceType, 'collection') !== null,
        size: Number.isSafeInteger(size) && size >= 0 ? size : null,
        lastModified: property('getlastmodified')?.textContent?.trim() || null,
      }]
    })
}

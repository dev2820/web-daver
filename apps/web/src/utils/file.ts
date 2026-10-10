function filePath(value: string) {
  return value.split(/[?#]/, 1)[0];
}

export function isMDFile(fileName: string) {
  return /\.(md|markdown)$/i.test(filePath(fileName));
}

export function isMDXFile(fileName: string) {
  return /\.mdx$/i.test(filePath(fileName));
}

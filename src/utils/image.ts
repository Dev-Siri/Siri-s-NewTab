export function resizeRawImage(rawUrl: string) {
  const WIDTH = 1920;

  return `${rawUrl}&w=${WIDTH}&dpr=2`;
}

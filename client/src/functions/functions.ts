export function getRandomInt(min: number, max: number): number {
    // rounds to nearest int

    return Math.floor(Math.random() * (max - min + 1)) + min;
}
  
export const faviChange = () => {
  const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement || document.createElement('link');
  link.type = "image/svg+xml"
  link.rel = "icon"
  link.href = "test.svg"
  document.head.appendChild(link)
}
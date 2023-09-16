const faviChange = () => {
  const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement || document.createElement('link');
  link.type = "image/svg+xml"
  link.rel = "icon"
  link.href = "test.svg"
  document.head.appendChild(link)
}

export default faviChange
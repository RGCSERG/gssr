

export function getRandomInt(min: number, max: number): number {
  // rounds to nearest int

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const faviChange = () => {
  const link =
    (document.querySelector("link[rel*='icon']") as HTMLLinkElement) ||
    document.createElement("link");
  link.type = "image/svg+xml";
  link.rel = "icon";
  link.href = "test.svg";
  document.head.appendChild(link);
};

export function formatTimeWithLeadingZeros() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  // Add leading zeros if needed
  const formattedHours = (hours < 10 ? "0" : "") + hours;
  const formattedMinutes = (minutes < 10 ? "0" : "") + minutes;

  // Combine hours and minutes
  const formattedTime = formattedHours + ":" + formattedMinutes;

  return formattedTime;
}



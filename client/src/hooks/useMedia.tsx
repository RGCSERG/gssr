import { useEffect, useState } from "react";

const useMedia = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    const updateMatches = (event: any) => {
      setMatches(event.matches);
    };

    // Initial check
    setMatches(mediaQueryList.matches);

    // Add a listener to update the matches whenever the viewport size changes
    mediaQueryList.addEventListener("change", updateMatches);

    // Clean up the listener when the component unmounts
    return () => {
      mediaQueryList.removeEventListener("change", updateMatches);
    };
  }, [query]);

  return matches;
};

export default useMedia;

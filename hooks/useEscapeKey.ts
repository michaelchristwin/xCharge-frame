import { useEffect } from "react";

const useEscapeKey = (closeSlideshow: () => void) => {
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeSlideshow();
      }
    };

    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [closeSlideshow]);
};

export default useEscapeKey;

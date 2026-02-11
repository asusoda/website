import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // Temporarily disable smooth scrolling
    document.documentElement.style.scrollBehavior = "auto";

    // Reset scroll position
    window.scrollTo(0, 0);
    document.documentElement.scrollTo(0, 0);
    document.body.scrollTo(0, 0);

    // Re-enable smooth scrolling after a small delay
    const timeoutId = setTimeout(() => {
      document.documentElement.style.scrollBehavior = "smooth";
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      document.documentElement.style.scrollBehavior = "smooth";
    };
  }, [pathname]);

  return null;
}

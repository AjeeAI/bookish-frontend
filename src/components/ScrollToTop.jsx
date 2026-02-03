import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // When the route changes (e.g., clicking a blog post), snap to top
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
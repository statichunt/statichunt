import { useEffect, useState } from "react";

// how to use
// const mobile = useWindow(767) < 768
// returns true/false

const useWindow = (size) => {
  // getWindowDimensions
  const [windowSize, setWindowSize] = useState(size || 767);
  useEffect(() => {
    function viewport() {
      var width = Math.max(
        document.documentElement.clientWidth,
        window.innerWidth || 0,
      );
      setWindowSize(width);
    }
    viewport();
    window.onresize = viewport;
  });

  return windowSize;
};

export default useWindow;

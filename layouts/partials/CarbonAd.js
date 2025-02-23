import { useEffect, useRef } from "react";

const CarbonAd = () => {
  const adRef = useRef(null);

  useEffect(() => {
    // Ensure this runs only on the client side
    if (typeof window === "undefined" || !adRef.current) return;

    // Remove any existing script to prevent duplication
    const existingScript = document.getElementById("_carbonads_js");
    if (existingScript) existingScript.remove();

    // Create and insert the Carbon Ads script
    const script = document.createElement("script");
    script.src =
      "//cdn.carbonads.com/carbon.js?serve=CW7I6K3U&placement=statichuntcom&format=cover";
    script.id = "_carbonads_js";
    script.async = true;
    script.type = "text/javascript";

    adRef.current.appendChild(script);
  }, []);

  return <div ref={adRef} className="carbon-ad-container" />;
};

export default CarbonAd;

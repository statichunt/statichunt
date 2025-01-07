import { useEffect, useState } from "react";

// useOs()
const useOs = () => {
  // get Os
  const [os, setOs] = useState(false);
  const [platForm, setPlatForm] = useState("");

  useEffect(() => {
    setOs(navigator.platform.indexOf("Mac") > -1);
    setPlatForm(navigator.platform);
  }, []);

  return { os, platForm };
};

export default useOs;

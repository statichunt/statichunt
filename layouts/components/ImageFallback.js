/* eslint-disable jsx-a11y/alt-text */
import Image from "next/image";
import { useEffect, useState } from "react";

const ImageFallback = (props) => {
  const { src, fallback, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Image
      {...rest}
      src={imgSrc}
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAgACADAREAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAABwYICf/EACwQAAECBAQFBAIDAAAAAAAAAAECEQMhMUEABAVRBhJhcdGBobHwFPEiweH/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EACMRAQABAQcFAQAAAAAAAAAAAAABESExQVGRsfBhcYHB0eH/2gAMAwEAAhEDEQA/AOhui6dFiRksk1AIZ6Wpbv8AOJEU3nrIXsjpcROXB5SwTX9708jC3CmlfcCQ4myqkw1giRBtN2INK7f3J8UAGuaeuNFUwJcmm9POJF1MrNOVGpOGtIQuOkFNSLAyq3S32t589hshaPDRlXCAAE7B5Cw8ivfADnF+UQgxUsBWwa9x2954Aai6WIsRTCpMmdus/E8SlfyZjYPvDUZCMwglqgWlOvq4eh+cUL6s7DGT5XA/jO207d7O9MAEcYZtKokQgipDV36jcYA2gxkFZJav2vUi+0zYLbRc4pEQEGbu1j7zrerg4k55bY/fAQImrRPxuXmL8rX2l9lUetuA/wAT55S1qmby79CaO+8pPhzl3YQKM4pKjM1P62FT/ssB/9k="
      placeholder="blur"
      onError={() => {
        setImgSrc(fallback);
      }}
    />
  );
};

export default ImageFallback;

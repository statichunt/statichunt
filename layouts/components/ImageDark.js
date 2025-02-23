import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

const ImageDark = ({ src, src_darkmode, height, width, className, alt }) => {
  const [mounted, setMounted] = useState(false);
  const { theme, resolvedTheme } = useTheme();
  useEffect(() => setMounted(true), []);

  return (
    <Image
      height={height}
      width={width}
      src={
        mounted && (theme === "dark" || resolvedTheme === "dark")
          ? src_darkmode
          : src
      }
      alt={alt}
      className={className}
    />
  );
};

export default ImageDark;

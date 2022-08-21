import config from "@config/config.json";
import Image from "next/future/image";
import Link from "next/link";

const Logo = ({ src, height, width, className }) => {
  // destructuring items from config object
  const { title, logo_height, logo_width } = config.site;
  return (
    <Link href="/" passHref>
      <a
        className={`navbar-brand ${className} w-auto md:w-[${
          logo_width.replace("px", "") + "px"
        }]`}
        style={{
          height: logo_height.replace("px", "") + "px",
        }}
      >
        <Image height={height} width={width} src={src} alt={title} priority />
      </a>
    </Link>
  );
};

export default Logo;

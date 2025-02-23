import config from "@/config/config.json";
import { useFilterContext } from "context/filterContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const Logo = ({ src, height, width, className }) => {
  const router = useRouter();
  const { reset } = useFilterContext();
  // destructuring items from config object
  const { title, logo_height, logo_width } = config.site;

  return router.asPath === "/" ? (
    <button
      onClick={() => reset()}
      className={`navbar-brand ${className} w-auto md:w-[${
        logo_width.replace("px", "") + "px"
      }]`}
      style={{
        height: logo_height.replace("px", "") + "px",
      }}
    >
      <Image height={height} width={width} src={src} alt={title} priority />
    </button>
  ) : (
    <Link
      href="/"
      className={`navbar-brand ${className} w-auto md:w-[${
        logo_width.replace("px", "") + "px"
      }]`}
      style={{
        height: logo_height.replace("px", "") + "px",
      }}
    >
      <Image height={height} width={width} src={src} alt={title} priority />
    </Link>
  );
};

export default Logo;

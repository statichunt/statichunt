import Social from "@/components/Social";
import config from "@/config/config.json";
import menu from "@/config/menu.json";
import social from "@/config/social.json";
import { markdownify, slugify } from "@/lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const { footer } = menu;
  const { site, params } = config;

  return (
    <footer className="section bg-theme-dark px-4">
      <div className="mb-6 border-b border-[rgba(255,255,255,0.06)] pb-[86px]">
        <div className="row lg:justify-center">
          {footer.map((item, i) => (
            <div
              key={`footer-menu-${i}`}
              className={`${
                i === 0
                  ? "col-12 sm:col-3 md:col-4 lg:col-2"
                  : "col-12 sm:col-9 md:col-8 lg:col-4"
              } mb-5 pb-4 lg:mb-0 lg:pb-0`}
            >
              <h3 className="h5 mb-3 font-medium capitalize text-white">
                {item.name}
              </h3>

              <hr className="mb-8 w-[30px]" />

              <ul className={i != 0 ? "mr-4 columns-2" : undefined}>
                {item.pages.map((page, i) => (
                  <li key={`page-${i}`} className="mb-2">
                    <Link
                      href={page.url}
                      prefetch={false}
                      className={`text-sm capitalize text-light hover:text-white footer-${slugify(
                        page.page,
                      )}`}
                      rel={page.rel}
                    >
                      {page.page}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* footer bottom */}
      <div className="row items-center lg:justify-center">
        <div className="hidden lg:col-3 lg:block relative">
          {/* <p className="absolute -top-9 left-2 text-sm text-white">
            Other Brands
          </p> */}
          <Link href="/" className="inline-block">
            <Image src={site.footer_logo} width={180} height={35} alt="logo" />
          </Link>
        </div>
        <div className="col-12 mb-4 sm:col-7 lg:col-4 sm:mb-0 lg:mb-0">
          <div className="flex items-center">
            <span className="mr-3 inline-block text-sm text-white">
              Connect with us :
            </span>
            <Social
              source={social}
              className="social-icons-simple inline-block"
            />
          </div>
        </div>
        <div className="col-12 sm:col-5 lg:col-3">
          {markdownify(params.copyright, "p", "text-white text-sm")}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

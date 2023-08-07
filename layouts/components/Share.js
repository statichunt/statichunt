import config from "@/config/config.json";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  IoClipboardOutline,
  IoLinkOutline,
  IoLogoFacebook,
  IoLogoLinkedin,
  IoLogoPinterest,
  IoLogoTwitter,
} from "react-icons/io5";

const Share = ({ title, description, className }) => {
  // destructuring items from config object
  const { base_url } = config.site;
  const router = useRouter();
  // copy link
  const [copyLink, setCopyLink] = useState(false);
  const copyLinkHandler = () => {
    let copyLinkButton = document.getElementById("copyLinkButton");
    copyLinkButton.select();
    copyLinkButton.setSelectionRange(0, 99999);
    setTimeout(() => {
      navigator.clipboard.writeText(copyLinkButton.value);
    }, 100);
    setCopyLink(true);
    setTimeout(() => {
      setCopyLink(false);
    }, 2000);
  };

  return (
    <ul className={`flex ${className}`}>
      <li className="inline-block">
        <a
          aria-label="facebook share button"
          href={`https://facebook.com/sharer/sharer.php?u=${
            base_url + router.asPath
          }`}
          target="_blank"
          rel="noreferrer noopener"
          button="true"
          className="inline-flex h-[35px] w-[35px] items-center justify-center rounded-[4px] bg-black/5 text-center text-dark transition-all duration-200 hover:bg-primary hover:text-white dark:bg-white/5 dark:text-white dark:hover:bg-primary"
        >
          <IoLogoFacebook />
        </a>
      </li>
      <li className="inline-block">
        <a
          aria-label="twitter share button"
          href={`https://twitter.com/intent/tweet/?text=${title}&amp;url=${
            base_url + router.asPath
          }`}
          target="_blank"
          rel="noreferrer noopener"
          button="true"
          className="inline-flex h-[35px] w-[35px] items-center justify-center rounded-[4px] bg-black/5 text-center text-dark transition-all duration-200 hover:bg-primary hover:text-white dark:bg-white/5 dark:text-white dark:hover:bg-primary"
        >
          <IoLogoTwitter />
        </a>
      </li>
      <li className="inline-block">
        <a
          aria-label="linkedin share button"
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${
            base_url + router.asPath
          }&title=${title}&summary=${description}&source=${base_url}`}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex h-[35px] w-[35px] items-center justify-center rounded-[4px] bg-black/5 text-center text-dark transition-all duration-200 hover:bg-primary hover:text-white dark:bg-white/5 dark:text-white dark:hover:bg-primary"
        >
          <IoLogoLinkedin />
        </a>
      </li>
      <li className="inline-block">
        <a
          aria-label="pinterest share button"
          href={`https://pinterest.com/pin/create/button/?url=${
            base_url + router.asPath
          }&media=&description=${description}`}
          target="_blank"
          rel="noreferrer noopener"
          button="true"
          className="inline-flex h-[35px] w-[35px] items-center justify-center rounded-[4px] bg-black/5 text-center text-dark transition-all duration-200 hover:bg-primary hover:text-white dark:bg-white/5 dark:text-white dark:hover:bg-primary"
        >
          <IoLogoPinterest />
        </a>
      </li>
      <li
        className="tooltip-static tooltip-static-bottom relative inline-flex h-[35px] w-[35px] items-center justify-center rounded-[4px] bg-black/5 text-center text-dark transition-all duration-200 hover:bg-primary hover:text-white dark:bg-white/5 dark:text-white dark:hover:bg-primary"
        onClick={() => copyLinkHandler()}
      >
        <span className="tooltip-static-label">
          {copyLink ? "Copied!" : "Copy Link"}
        </span>
        <input
          className="invisible absolute"
          type="text"
          value={`${base_url + router.asPath}`}
          id="copyLinkButton"
          style={{ pointerEvents: "none", top: "-9999px" }}
          readOnly
        />
        <IoLinkOutline className={copyLink ? "hidden" : "inline-block"} />
        <IoClipboardOutline className={copyLink ? "inline-block" : "hidden"} />
      </li>
    </ul>
  );
};

export default Share;

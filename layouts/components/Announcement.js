import config from "@config/config.json";
import { markdownify, slugify } from "@lib/utils/textConverter";
import { useEffect, useState } from "react";
import { CgCloseO } from "react-icons/cg";
import useCookie, { getCookie } from "react-use-cookie";

const Announcement = () => {
  const { enable, name, content, link } = config.announcement;
  // cookie bar
  const [announcementClose, setAnnouncementClose] = useCookie(slugify(name));
  const [announcementCloseState, setAnnouncementCloseState] = useState(true);

  // cookie check from browser
  useEffect(() => {
    setAnnouncementCloseState(getCookie(slugify(name)));
  }, [announcementClose]);

  // cookie handler
  const cookieHandler = () => {
    setAnnouncementClose(true, {
      days: 7,
      SameSite: "Strict",
      Secure: true,
    });
  };
  return (
    <>
      {enable && !announcementCloseState && (
        <div
          className={`z-[10] mt-4 -translate-y-10 bg-white dark:bg-darkmode-body`}
        >
          <div className="bg-linear-gradient rounded-[0.25rem] pr-4 text-white transition-opacity ease-in hover:opacity-90">
            <a
              href={link}
              target="_blank"
              rel="noreferrer noopener"
              className="block items-center px-3 py-2 font-light sm:flex"
            >
              <span className="mr-2 mb-2 inline-block rounded-[0.25rem] bg-dark/30 px-2 py-2 leading-none sm:mb-0">
                {name}
              </span>
              <span className="ml-2 block leading-none">
                {markdownify(content)}
              </span>
            </a>
            <span
              className="absolute right-3 top-2 z-10 cursor-pointer text-xl"
              onClick={cookieHandler}
            >
              <CgCloseO />
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default Announcement;

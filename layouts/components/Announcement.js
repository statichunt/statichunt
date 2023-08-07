import config from "@/config/config.json";
import { markdownify, slugify } from "@/lib/utils/textConverter";
import { useEffect, useState } from "react";
import { CgCloseO } from "react-icons/cg";
import { FaRegBell } from "react-icons/fa";
import useCookie, { getCookie } from "react-use-cookie";

const Announcement = () => {
  const { enable, name, content, link } = config.announcement;
  // cookie bar
  const [announcementClose, setAnnouncementClose] = useCookie(
    slugify(name) + "-announcement",
  );
  const [announcementCloseState, setAnnouncementCloseState] = useState(true);

  // cookie check from browser
  useEffect(() => {
    setAnnouncementCloseState(getCookie(slugify(name) + "-announcement"));
  }, [announcementClose, name]);

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
          className={`z-10 mt-4 -translate-y-10 bg-white dark:bg-darkmode-body`}
        >
          <div className="bg-gradient rounded-[0.25rem] pr-6 text-white transition-opacity ease-in hover:opacity-90">
            <a
              href={link}
              target="_blank"
              rel="noreferrer noopener"
              className="flex px-3 py-2"
            >
              <span className="mr-3 inline-block h-7 w-7 shrink-0 rounded bg-white/10 text-center leading-6">
                <FaRegBell />
              </span>
              {markdownify(content)}
            </a>
            <span
              className="absolute right-3 top-1 z-10 cursor-pointer text-xl"
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

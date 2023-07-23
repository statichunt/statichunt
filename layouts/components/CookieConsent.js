import useOs from "hooks/useOs";
import Image from "next/image";
import { useEffect, useState } from "react";
import useCookie, { getCookie } from "react-use-cookie";

const CookieConsent = () => {
  // cookie bar
  const [cookieAccept, setCookieAccept] = useCookie("cookieAccept", false);
  const [cookieAcceptState, setCookieAcceptState] = useState(true);

  // first visit detection
  const [firstVisit, setFirstVisit] = useCookie("firstVisit", false);
  const [firstVisitState, setFirstVisitState] = useState(true);

  // bookmark
  const [bookmarkAccept, setBookmarkAccept] = useCookie(
    "bookmarkAccept",
    false,
  );
  const [bookmarkAcceptState, setBookmarkAcceptState] = useState(false);

  // zoom bookmarkbar
  const [zoom, setZoom] = useState(1);
  const [bookmarkText, setBookmarkText] = useState(false);

  // cookie check from browser
  useEffect(() => {
    // get cookie accept state
    setCookieAcceptState(getCookie("cookieAccept"));
    // get first visit state
    setFirstVisitState(getCookie("firstVisit"));
  }, [cookieAccept, firstVisit]);

  // cookie check from browser
  useEffect(() => {
    // get bookmark accept state
    setBookmarkAcceptState(getCookie("bookmarkAccept"));
  }, [bookmarkAccept]);

  // cookie handler
  const cookieHandler = () => {
    setCookieAccept(true, {
      days: 150,
      SameSite: "Strict",
      Secure: true,
    });
    setFirstVisit(true, {
      days: 1,
      SameSite: "Strict",
      Secure: true,
    });
  };

  // bookmarkbar handler
  const bookmarkBarHandler = () => {
    if (zoom <= 2) {
      setZoom((prev) => prev + 0.2);
    }
    setBookmarkText(true);
  };

  // bookmark cookie handler
  const bookmarkHandler = () => {
    setBookmarkAccept(true, {
      days: 365,
      SameSite: "Strict",
      Secure: true,
    });
  };

  // detect OS
  const macOs = useOs();
  const [key, setKey] = useState("");
  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (macOs && e.metaKey && e.key === "d") {
        bookmarkHandler();
      } else if (e.ctrlKey && e.key === "d") {
        bookmarkHandler();
      }
    });
    if (macOs) {
      setKey("⌘+D");
    } else {
      setKey("Ctrl+D");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [macOs]);

  return (
    <>
      {/* cookie box */}
      <div className={`cookie-box ${cookieAcceptState && "hidden"}`}>
        <div className="block md:flex">
          <span className="mr-3 mt-1 hidden flex-shrink-0 md:inline-block">
            <Image
              alt="cookie"
              src="/images/cookie.png"
              height="30"
              width="30"
            />
          </span>
          <p>
            This website use cookies. By using this website, you automatically
            accept that.
            <button
              className="cookie-box-closer mt-2 block"
              onClick={cookieHandler}
            >
              Got It!
            </button>
          </p>
        </div>
      </div>
      {/* bookmark box */}
      <div
        onClick={bookmarkBarHandler}
        className={`bookmark-box ${
          cookieAcceptState && !firstVisitState && !bookmarkAcceptState
            ? "md:flex"
            : "hidden"
        } `}
        style={{ transform: `scale(${zoom})` }}
      >
        <div className="bookmark-box-icon">
          <Image alt="pin" src="/images/pin.svg" height="25" width="32" />
        </div>
        <div>
          <small>
            {bookmarkText ? "Use Your Keyboard" : "Bookmark This Site"}
          </small>
          <strong className="block">{key}</strong>
        </div>
        <span onClick={bookmarkHandler} className="bookmark-box-closer">
          &times;
        </span>
      </div>
    </>
  );
};

export default CookieConsent;

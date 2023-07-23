import { useEffect } from "react";

const ScrollTop = () => {
  useEffect(() => {
    window.addEventListener(
      "scroll",
      function () {
        var scrollArrow = document.querySelector(".scroll-to-top");
        if (window.pageYOffset > 150) {
          scrollArrow.classList.add("show");
        } else if (window.pageYOffset < 150) {
          scrollArrow.classList.remove("show");
        }
      },
      false,
    );
  }, []);

  return (
    <button
      className="scroll-to-top"
      type="button"
      aria-label="Scroll to Top"
      onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="inline-block"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <polyline points="6 15 12 9 18 15"></polyline>
      </svg>
    </button>
  );
};

export default ScrollTop;

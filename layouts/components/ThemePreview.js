import { useEffect, useState } from "react";

const ThemePreview = ({ theme, slug, hasCSP }) => {
  const { demo } = theme.frontmatter;

  // device toggle
  const [mobilePreview, setMobilePreview] = useState(false);

  useEffect(() => {
    let previewHeader = document.querySelector(".browser-preview-header");
    let previewHeaderContent = document.querySelector(
      ".browser-preview-header-content",
    );
    let previewThumbnail = document.querySelector(`.browser-preview-thumbnail`);
    let previewHeaderButtons = document.querySelector(
      ".browser-preview-header-buttons",
    );
    if (!hasCSP) {
      document.getElementById(slug).onload = () => {
        if (previewHeader) {
          previewHeader.classList.add(`browser-preview-loaded`);
          previewHeaderContent.innerHTML = "Live Preview is Loaded";

          setTimeout(() => {
            previewHeader.classList.remove(`browser-preview-loaded`);
            previewThumbnail.classList.add(`hidden`);
            previewHeader.classList.add(`browser-preview-after-loaded`);
            previewHeaderButtons.classList.add(
              `browser-preview-header-buttons-show`,
            );
            previewHeaderContent.classList.add(
              `browser-preview-header-content-hide`,
            );
          }, 750);
        }
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, hasCSP]);

  return (
    <>
      <div className="mb-8">
        {/* browser preview */}
        <div
          key={slug}
          className={`browser-preview hidden md:block ${
            mobilePreview && "browser-preview-mobile"
          }`}
        >
          {/* preview header */}
          <div className="browser-preview-header">
            <span className="browser-preview-header-content">
              <span className="browser-preview-header-content-icon">
                <svg
                  className="mb-0"
                  height="14"
                  width="14"
                  version="1.1"
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m305.1 501h-98.3c-11.3 0-20.4-9.1-20.4-20.4v-44.8c-2.9-1.1-5.7-2.3-8.5-3.5l-31.5 31.7c-7.7 7.6-21.2 7.7-28.9 0l-69.5-69.5c-3.8-3.8-6-9-6-14.4s2.2-10.6 6-14.4l31.6-31.7c-1.2-2.8-2.4-5.6-3.5-8.5h-44.7c-11.3 0-20.4-9.1-20.4-20.4v-98.3c0-11.3 9.1-20.4 20.4-20.4h44.8c1.1-2.9 2.3-5.7 3.5-8.5l-31.7-31.5c-8-8-8-20.9 0-28.9l69.5-69.5c8-8 20.9-8 28.9 0l31.6 31.6c2.8-1.2 5.6-2.4 8.5-3.5v-44.7c0-11.3 9.1-20.4 20.4-20.4h98.3c11.3 0 20.4 9.1 20.4 20.4v44.8c2.9 1.1 5.7 2.3 8.5 3.5l31.5-31.7c8-8 20.9-8 28.9 0l69.5 69.5c8 8 8 20.9 0 28.9l-31.6 31.6c1.2 2.8 2.4 5.6 3.5 8.5h44.8c11.3 0 20.4 9.1 20.4 20.4v98.3c0 11.3-9.1 20.4-20.4 20.4h-44.8c-1.1 2.9-2.3 5.7-3.5 8.5l31.6 31.6c8 8 8 20.9 0 28.9l-69.5 69.4c-7.7 7.7-21.2 7.7-28.9 0l-31.6-31.6c-2.8 1.2-5.6 2.4-8.5 3.5v44.8c0 11.2-9.1 20.3-20.4 20.3zm-77.8-40.8h57.4v-38.9c0-9 5.9-17 14.6-19.6 10.3-3.1 20.1-7.1 29.1-12 8-4.3 17.8-2.9 24.2 3.5l27.5 27.5 40.6-40.6-27.5-27.5c-6.4-6.4-7.8-16.2-3.5-24.2 4.9-9 8.9-18.7 12-29.1 2.6-8.7 10.5-14.6 19.6-14.6h39v-57.4h-39c-9 0-17-5.9-19.6-14.6-3.1-10.3-7.1-20.1-12-29.1-4.3-8-2.9-17.8 3.5-24.2l27.5-27.5-40.6-40.6-27.5 27.5c-6.4 6.4-16.2 7.8-24.2 3.5-9-4.9-18.7-8.9-29.1-12-8.7-2.6-14.6-10.5-14.6-19.6v-39h-57.4v39c0 9-5.9 17-14.6 19.6-10.3 3.1-20.1 7.1-29.1 12-7.9 4.3-17.8 2.9-24.2-3.5l-27.5-27.5-40.6 40.6 27.5 27.5c6.4 6.4 7.8 16.2 3.5 24.2-4.9 9-8.9 18.7-12 29.1-2.6 8.7-10.5 14.6-19.6 14.6h-39v57.4h39c9 0 17 5.9 19.6 14.6 3.1 10.3 7.1 20.1 12 29.1 4.3 8 2.9 17.8-3.5 24.2l-27.5 27.5 40.6 40.6 27.5-27.5c6.4-6.4 16.2-7.8 24.2-3.5 9 4.9 18.8 8.9 29.1 12 8.7 2.6 14.6 10.5 14.6 19.6v38.9z" />
                  <path d="m256 365.1c-60.2 0-109.1-48.9-109.1-109.1s48.9-109.1 109.1-109.1 109.1 48.9 109.1 109.1-48.9 109.1-109.1 109.1zm0-177.4c-37.6 0-68.3 30.6-68.3 68.3 0 37.6 30.6 68.3 68.3 68.3 37.6 0 68.3-30.6 68.3-68.3 0-37.6-30.7-68.3-68.3-68.3z" />
                </svg>
              </span>{" "}
              We are Pulling down the Live Site here...
            </span>
            <div className="browser-preview-header-buttons">
              <a
                className="browser-preview-header-buttons-link"
                target="blank"
                href={`${demo}?ref=statichunt.com`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"
                  />
                </svg>
              </a>
            </div>
          </div>
          {/* preview body */}
          <div className="browser-preview-body">
            {!hasCSP && (
              <iframe
                id={slug}
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                loading="lazy"
                src={demo}
                key={demo}
                className="browser-preview-frame"
              />
            )}
            <span className={`browser-preview-thumbnail ${hasCSP && "!block"}`}>
              <img
                src={`https://statichunt-images.netlify.app/themes/${slug}.png`}
                alt={`Screenshot of ${theme.frontmatter.title}`}
                height={250}
                width={750}
              />
            </span>
          </div>
        </div>

        {/* mobile thumbnail */}
        <div className="md:hidden">
          <img
            src={`https://statichunt-images.netlify.app/themes/thumbnails/${slug}.webp`}
            alt={`Screenshot of ${theme.frontmatter.title}`}
            className="w-full rounded shadow"
            height="340"
            width="510"
          />
        </div>
      </div>

      {/* preview mobile/desktop toggler */}
      {!hasCSP && (
        <div className="browser-preview-toggler hidden text-center md:block">
          <button
            type="button"
            aria-label="Toggle Desktop"
            onClick={() => setMobilePreview(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="inline"
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
              <rect x="3" y="4" width="18" height="12" rx="1"></rect>
              <line x1="7" y1="20" x2="17" y2="20"></line>
              <line x1="9" y1="16" x2="9" y2="20"></line>
              <line x1="15" y1="16" x2="15" y2="20"></line>
            </svg>
          </button>
          <button
            type="button"
            aria-label="Toggle Mobile"
            onClick={() => setMobilePreview(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="inline"
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
              <rect x="7" y="4" width="10" height="16" rx="1"></rect>
              <line x1="11" y1="5" x2="13" y2="5"></line>
              <line x1="12" y1="17" x2="12" y2="17.01"></line>
            </svg>
          </button>
        </div>
      )}
    </>
  );
};

export default ThemePreview;

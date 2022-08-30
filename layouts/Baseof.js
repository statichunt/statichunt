import config from "@config/config.json";
import Footer from "@layouts/partials/Footer";
import Header from "@layouts/partials/Header";
import { plainify } from "@lib/utils/textConverter";
import loadable from "@loadable/component"; // npm install @loadable/component
import "feeder-react-feedback/dist/feeder-react-feedback.css"; // import stylesheet
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import CookieConsent from "./components/CookieConsent";
const Feedback = loadable(() => import("feeder-react-feedback/dist/Feedback")); // dynamically load Feedback component

const Base = ({
  title,
  meta_title,
  description,
  image,
  noindex,
  canonical,
  children,
}) => {
  // meta data
  const { meta_image, meta_author, meta_description } = config.metadata;
  const { base_url } = config.site;
  const { feeder_id } = config.params;
  const router = useRouter();

  // tooltip
  useEffect(() => {
    var tooltipEl = document.querySelectorAll(".has-tooltip");
    if (tooltipEl) {
      var tooltipItems = document.querySelectorAll(".tooltip-label");
      tooltipItems.forEach((item) => {
        item.remove();
      });
      var length = tooltipEl.length;
      for (var i = 0; i < length; i++) {
        var attr = tooltipEl[i].getAttribute("data-tooltip");
        var x = document.createElement("SPAN");
        var t = document.createTextNode(attr);
        x.appendChild(t);
        x.className = "tooltip-label";
        tooltipEl[i].appendChild(x);
      }
    }
  });

  // scroll to top
  useEffect(() => {
    window.addEventListener(
      "scroll",
      function () {
        var scrollArrow = document.querySelector(".scroll-to-position");
        var feedbackBlock = document.querySelector(".feedback-block");
        if (window.pageYOffset > 150) {
          scrollArrow.classList.add("visible");
          feedbackBlock.classList.add("visible");
        } else if (window.pageYOffset < 150) {
          scrollArrow.classList.remove("visible");
          feedbackBlock.classList.remove("visible");
        }
      },
      false
    );
  }, []);

  return (
    <>
      <Head>
        {/* title */}
        <title>
          {plainify(
            meta_title ? meta_title : title ? title : config.site.title
          )}
        </title>

        {/* canonical url */}
        {canonical && <link rel="canonical" href={canonical} itemProp="url" />}

        {/* noindex robots */}
        {noindex && <meta name="robots" content="noindex,nofollow" />}

        {/* meta-description */}
        <meta
          name="description"
          content={plainify(description ? description : meta_description)}
        />

        {/* author from config.json */}
        <meta name="author" content={meta_author} />

        {/* og-title */}
        <meta
          property="og:title"
          content={plainify(
            meta_title ? meta_title : title ? title : config.site.title
          )}
        />

        {/* og-description */}
        <meta
          property="og:description"
          content={plainify(description ? description : meta_description)}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${base_url}/${router.asPath.replace("/", "")}`}
        />

        {/* twitter-title */}
        <meta
          name="twitter:title"
          content={plainify(
            meta_title ? meta_title : title ? title : config.site.title
          )}
        />

        {/* twitter-description */}
        <meta
          name="twitter:description"
          content={plainify(description ? description : meta_description)}
        />

        {/* og-image */}
        <meta
          property="og:image"
          content={`${base_url}${image ? image : meta_image}`}
        />

        {/* twitter-image */}
        <meta
          name="twitter:image"
          content={`${base_url}${image ? image : meta_image}`}
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Header />
      {children}
      <Footer />
      <CookieConsent />
      {feeder_id && (
        <div className="feedback-block">
          <Feedback
            classList="hidden"
            projectId={feeder_id}
            feedbackTypes={["bug", "idea"]}
            email={true}
            emailRequired={true}
            primaryColor="#059669"
            hoverBorderColor="#059669"
          />
        </div>
      )}

      <div className="scroll-to-position">
        <button
          className="scroll-to-top show"
          type="button"
          aria-label="Scroll to Top"
          onClick={() =>
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-chevron-up"
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
      </div>
    </>
  );
};

export default Base;

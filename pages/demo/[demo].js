import config from "@config/config.json";
import DemoHeader from "@layouts/partials/DemoHeader";
import { getSinglePages, getSinglePagesSlug } from "@lib/contentParser";
import { plainify, slugify } from "@lib/utils/textConverter";
import Head from "next/head";
import { useEffect, useState } from "react";

const Demo = ({ theme, slug }) => {
  const { demo, title, github } = theme[0].frontmatter;
  const { favicon } = config.site;
  const [showHeader, setShowHeader] = useState(true);
  const [device, setDevice] = useState("desktop");

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

  return (
    <>
      <Head>
        {/* title */}
        <title>{plainify(title)}</title>

        {/* favicon */}
        <link rel="shortcut icon" href={favicon} />

        {/* responsive meta */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />

        {/* noindex */}
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <DemoHeader
        themeTitle={title}
        demo={demo}
        slug={slug}
        github={github}
        showHeader={showHeader}
        setShowHeader={setShowHeader}
        device={device}
        setDevice={setDevice}
      />
      <div
        className={`demo-wrapper ${
          showHeader ? "mt-[60px] h-[calc(100vh-60px)]" : "h-[100vh]"
        }`}
      >
        <div className={`demo-content ${device}`}>
          <iframe
            src={demo}
            key={slugify(title)}
            id="theme-preview"
            title="theme preview"
            sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation allow-top-navigation-by-user-activation"
            loading="lazy"
          />
        </div>
      </div>
    </>
  );
};

export default Demo;

export const getStaticPaths = () => {
  const slugs = getSinglePagesSlug("content/themes");

  const paths = slugs.map((theme) => ({
    params: {
      demo: theme,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = ({ params }) => {
  const { demo } = params;
  const allTheme = getSinglePages("content/themes");
  const singleTheme = allTheme.filter((data) => data.slug == demo);

  return {
    props: {
      theme: singleTheme,
      slug: demo,
    },
  };
};

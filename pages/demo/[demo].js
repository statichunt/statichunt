import config from "@config/config.json";
import DemoHeader from "@layouts/partials/DemoHeader";
import { getSinglePages, getSinglePagesSlug } from "@lib/contents";
import { plainify } from "@lib/utils/textConverter";
import Head from "next/head";
import { useState } from "react";

const Demo = ({ theme, slug }) => {
  const { demo, title, github } = theme[0].frontmatter;
  const { favicon } = config.site;
  const [showHeader, setShowHeader] = useState(true);

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
      </Head>
      <DemoHeader
        themeTitle={title}
        demo={demo}
        slug={slug}
        github={github}
        showHeader={showHeader}
        setShowHeader={setShowHeader}
      />
      <iframe
        src={demo}
        key={demo}
        className={`my-0 mx-auto w-full border-0 shadow-none transition-all ${
          showHeader ? "mt-[66px] h-[calc(100vh-66px)]" : "h-[100vh]"
        }`}
        id="theme-preview"
        title="theme preview"
        sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation allow-top-navigation-by-user-activation"
        loading="lazy"
      />
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

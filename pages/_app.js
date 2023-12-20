import config from "@/config/config.json";
import { JsonContext } from "context/filterContext";
import { ThemeProvider } from "next-themes";
import { Oxygen } from "next/font/google";
import Head from "next/head";
import { useEffect } from "react";
import TagManager from "react-gtm-module";
import "styles/style.scss";

const oxygen = Oxygen({
  weight: ["400", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

const App = ({ Component, pageProps }) => {
  // default theme setup
  const { default_theme } = config.settings;

  // google tag manager (gtm)
  useEffect(() => {
    let loadTimeout;

    const handleMouseMove = () => {
      if (!loadTimeout) {
        loadTimeout = setTimeout(() => {
          const tagManagerArgs = {
            gtmId: config.params.tag_manager_id,
          };
          TagManager.initialize(tagManagerArgs);
        }, 10000);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(loadTimeout);
    };
  }, []);

  return (
    <JsonContext>
      <Head>
        {/* responsive meta */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
      </Head>
      <ThemeProvider attribute="class" defaultTheme={default_theme}>
        <main className={`${oxygen.className}`}>
          <Component {...pageProps} />
        </main>
      </ThemeProvider>
    </JsonContext>
  );
};

export default App;

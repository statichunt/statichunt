import Base from "@/layouts/Baseof";
import { getListPage } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";
import CallToAction from "@/partials/CallToAction";
import MobileSidebar from "@/partials/MobileSidebar";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Sponsors = ({ data }) => {
  const { frontmatter } = data;
  const {
    title,
    meta_title,
    description,
    why_statichunt,
    statistics,
    pricing,
    current_sponsors,
    previous_sponsors,
    call_to_action,
  } = frontmatter;

  const [mounted, setMounted] = useState(false);
  const { theme, resolvedTheme } = useTheme();
  useEffect(() => setMounted(true), []);

  return (
    <Base title={title} description={description} meta_title={meta_title}>
      <MobileSidebar />

      {/* Hero */}
      <section className="section bg-theme-light dark:bg-darkmode-theme-light">
        <div className="container">
          <div className="row justify-center">
            <div className="col-10 text-center">
              {markdownify(title, "h1", "mb-4 [&>span]:text-primary")}
              {markdownify(description, "p", "mb-12 max-w-xl mx-auto")}
              <div className="flex flex-wrap justify-center gap-4">
                <Link className="btn btn-primary" href="/contact">
                  Become a Sponsor
                </Link>
                <Link className="btn btn-outline-primary" href="#pricing">
                  View Sponsorship Options
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* why statichunt */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="mx-auto max-w-md">{why_statichunt.title}</h2>
          </div>
          <div className="row">
            {why_statichunt.items.map((item, index) => (
              <div
                key={index}
                className="col-12 sm:col-6 xl:col-3 mb-6 xl:mb-0"
              >
                <div className="h-full bg-white dark:bg-darkmode-theme-dark shadow rounded-md p-6">
                  <Image
                    className="mb-4"
                    height={48}
                    width={48}
                    src={item.icon}
                    alt={item.name}
                  />
                  <h3 className="h5 mb-3">{item.name}</h3>
                  <p>{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* statistics */}
      <section className="section">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-4 mx-auto max-w-md">{statistics.title}</h2>
            <p className="mx-auto max-w-xl">{statistics.subtitle}</p>
          </div>
          <div className="row row-cols-2 md:row-cols-3 xl:row-cols-5 justify-center">
            {statistics.items.map((item, index) => (
              <div key={index} className="mb-6 xl:mb-0">
                <div className="h-full text-center rounded-md p-6 border border-primary/30">
                  <Image
                    className="mb-4"
                    height={40}
                    width={40}
                    src={item.icon}
                    alt={item.name}
                  />
                  <h3 className="h4 mb-1">
                    {item.value}
                    {item.extension}
                  </h3>
                  <p>{item.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* pricing */}
      <section id="pricing" className="section">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-4 mx-auto max-w-md">{pricing.title}</h2>
            <p className="mx-auto max-w-xl">{pricing.subtitle}</p>
          </div>
          <div className="row">
            {pricing.annual_plan.map((item, index) => (
              <div
                key={index}
                className="relative sm:col-12 md:col-6 xl:col-4 mb-6 xl:mb-0"
              >
                <div
                  className={`h-full pb-20 shadow rounded-md p-6 ${item.featured ? "border border-primary bg-primary/5 dark:bg-darkmode-primary/5" : "bg-white dark:bg-darkmode-theme-dark"}`}
                >
                  <h3 className="h5 mb-6 relative before:absolute before:-bottom-4 before:left-0 before:h-0.5 before:w-6 before:bg-primary before:rounded">
                    {item.name}
                  </h3>
                  <p className="mb-2 text-dark dark:text-darkmode-dark">
                    <strong className="h1">{item.price}</strong>
                    {item.price_per}
                  </p>
                  <small>{item.billing}</small>
                  <span className="w-full block h-0.5 my-4 bg-gradient-to-r from-transparent via-primary to-transparent" />
                  <strong className="mb-5 block">What You Get:</strong>
                  <ul className="dot-list mb-6">
                    {item.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                  <Link
                    className={`btn absolute left-8 bottom-6 w-[calc(100%-4rem)] ${item.featured ? "btn-primary" : "btn-outline-primary"}`}
                    href="/contact"
                    target="_blank"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8">
            <strong className="text-primary">Note: </strong>
            {markdownify(pricing.note, "span")}
          </p>
        </div>
      </section>

      {/* current sponsors */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="mx-auto max-w-md">{current_sponsors.title}</h2>
          </div>
          <div className="row justify-center">
            {current_sponsors.items.map((item, index) => (
              <div
                key={index}
                className="col-12 sm:col-6 md:col-4 xl:col-3 mb-6"
              >
                <Link
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="bg-white dark:bg-darkmode-theme-dark shadow rounded-md p-5 h-[80px] flex items-center justify-center"
                >
                  <img
                    className="max-h-full"
                    src={
                      mounted && (theme === "dark" || resolvedTheme === "dark")
                        ? item.logo_darkmode
                        : item.logo
                    }
                    alt={item.name}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* previous sponsors */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="mx-auto max-w-md">{previous_sponsors.title}</h2>
          </div>
          <div className="row justify-center">
            {previous_sponsors.items.map((item, index) => (
              <div
                key={index}
                className="col-12 sm:col-6 md:col-4 xl:col-3 mb-6"
              >
                <Link
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="bg-white dark:bg-darkmode-theme-dark shadow rounded-md p-5 h-[80px] flex items-center justify-center"
                >
                  <img
                    className="max-h-full"
                    src={
                      mounted && (theme === "dark" || resolvedTheme === "dark")
                        ? item.logo_darkmode
                        : item.logo
                    }
                    alt={item.name}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* call to action */}
      <CallToAction call_to_action={call_to_action} />
    </Base>
  );
};

export const getStaticProps = async () => {
  const data = await getListPage("content/landing-pages/become-a-sponsor.md");
  return {
    props: {
      data: data,
    },
  };
};

export default Sponsors;

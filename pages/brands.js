import Base from "layouts/Baseof";
import { getListPage } from "lib/contentParser";
import { markdownify } from "lib/utils/textConverter";

const brands = ({ data }) => {
  const { frontmatter } = data;
  return (
    <Base {...data.frontmatter}>
      <section className="section bg-theme-light dark:bg-darkmode-theme-light">
        <div className="container">
          <div className="row justify-center">
            <div className="col-10 text-center">
              {markdownify(
                `${frontmatter.title}`,
                "h1",
                "mb-4 [&>span]:text-primary",
              )}
              <div className="content">
                {markdownify(`${frontmatter.description}`, "p")}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="row g-4">
            {frontmatter?.assets.map((asset, index) => (
              <div className="sm:col-6 md:col-4 lg:col-3" key={index}>
                <figure
                  className={`shadow rounded aspect-video flex items-center justify-center px-6 ${
                    index % 2 === 0
                      ? "bg-transparent dark:bg-theme-light"
                      : "bg-gray-900 dark:bg-darkmode-theme-light"
                  }`}
                >
                  <img src={asset.files[0]} alt={asset.title} />
                </figure>

                <div className="mt-4">
                  <h2 className="font-secondary h5 mb-2 font-medium">
                    {asset.title}
                  </h2>
                  <div className="flex gap-2">
                    <a
                      href={asset.files[0]}
                      download
                      className="btn-sm btn-outline-primary text-primary rounded-full flex items-center gap-1"
                    >
                      PNG
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 1.49982V8.62482"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M2.625 5.24982L6 8.62482L9.375 5.24982"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M1.875 10.1248H10.125"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>

                    <a
                      href={asset.files[1]}
                      download
                      className="btn-sm btn-outline-primary text-primary rounded-full flex items-center gap-1"
                    >
                      SVG
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 1.49982V8.62482"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M2.625 5.24982L6 8.62482L9.375 5.24982"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M1.875 10.1248H10.125"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Base>
  );
};

export const getStaticProps = async () => {
  const data = await getListPage("content/landing-pages/brands.md");
  return {
    props: {
      data: data,
    },
  };
};

export default brands;

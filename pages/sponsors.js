import ImageDark from "@/components/ImageDark";
import Base from "@/layouts/Baseof";
import { getListPage } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";
import MobileSidebar from "@/partials/MobileSidebar";
import shortcodes from "@/shortcodes/all";
import { MDXRemote } from "next-mdx-remote";
import Link from "next/link";

const Sponsors = ({ data }) => {
  // const coffee = new BuyMeACoffee(access.token);
  // const [individualSupporters, setIndividualSupporters] = useState([]);
  // useEffect(() => {
  //   coffee.Supporters().then((data) => setIndividualSupporters(data.data));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const { mdxContent, frontmatter } = data;
  const { title, meta_title, description, platinum, gold, silver, bronze } =
    frontmatter;

  return (
    <Base title={title} meta_title={meta_title} description={description}>
      <MobileSidebar />
      <section className="section relative after:absolute after:left-0 after:top-0 after:h-[400px] after:w-full after:bg-theme-light after:content-[''] dark:bg-darkmode-body dark:after:bg-darkmode-theme-light">
        <div className="container relative z-20">
          <div className="row justify-center">
            <div className="mb-16 text-center sm:col-10 md:col-8 lg:col-6">
              {markdownify(title, "h1", "mb-4")}
              <MDXRemote {...mdxContent} components={shortcodes} />
            </div>

            <div className="xl:col-10">
              <div className="rounded bg-white p-12 text-center shadow dark:bg-darkmode-theme-dark">
                {/* Platinum Sponsors */}
                <div className="mb-20">
                  <h2 className="h3 mb-6">Platinum Sponsors</h2>
                  <ul>
                    {platinum.map((item, index) => (
                      <li className="m-5 inline-block align-middle" key={index}>
                        {item.name ? (
                          <Link
                            className="border- flex h-[150px] w-[250px] items-center justify-center rounded border-border p-6 dark:border-darkmode-border"
                            href={item.website}
                            title={item.name}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ImageDark
                              src={item.logo_default}
                              src_darkmode={item.logo_darkmode}
                              alt={item.name}
                              height={60}
                              width={250}
                            />
                          </Link>
                        ) : (
                          <Link
                            className="flex h-[150px] w-[250px] items-center justify-center rounded border border-dashed border-border p-4 dark:border-darkmode-border"
                            href="/become-a-sponsor"
                          >
                            Book A Slot
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Glod Sponsors */}
                <div className="mb-20">
                  <h2 className="h3 mb-6">Gold Sponsors</h2>
                  <ul>
                    {gold.map((item, index) => (
                      <li className="m-4 inline-block align-middle" key={index}>
                        {item.name ? (
                          <Link
                            className="border- flex h-[120px] w-[200px] items-center justify-center rounded border-border p-4 dark:border-darkmode-border"
                            href={item.website}
                            title={item.name}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ImageDark
                              src={item.logo_default}
                              src_darkmode={item.logo_darkmode}
                              alt={item.name}
                              height={60}
                              width={200}
                            />
                          </Link>
                        ) : (
                          <Link
                            className="flex h-[120px] w-[200px] items-center justify-center rounded border border-dashed border-border p-4 dark:border-darkmode-border"
                            href="/become-a-sponsor"
                          >
                            Book A Slot
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Silver Sponsors */}
                <div className="mb-20">
                  <h2 className="h3 mb-6">Silver Sponsors</h2>
                  <ul>
                    {silver.map((item, index) => (
                      <li className="m-4 inline-block align-middle" key={index}>
                        {item.name ? (
                          <Link
                            className="border- flex h-[100px] w-[180px] items-center justify-center rounded border-border p-4 dark:border-darkmode-border"
                            href={item.website}
                            title={item.name}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ImageDark
                              src={item.logo_default}
                              src_darkmode={item.logo_darkmode}
                              alt={item.name}
                              height={60}
                              width={180}
                            />
                          </Link>
                        ) : (
                          <Link
                            className="flex h-[100px] w-[180px] items-center justify-center rounded border border-dashed border-border p-4 dark:border-darkmode-border"
                            href="/become-a-sponsor"
                          >
                            Book A Slot
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Bronze Sponsors */}
                <div className="mb-20">
                  <h2 className="h3 mb-6">Bronze Sponsors</h2>
                  <ul>
                    {bronze.map((item, index) => (
                      <li className="m-4 inline-block align-middle" key={index}>
                        {item.name ? (
                          <Link
                            className="border- flex h-[100px] w-[180px] items-center justify-center rounded border-border p-4 dark:border-darkmode-border"
                            href={item.website}
                            title={item.name}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ImageDark
                              src={item.logo_default}
                              src_darkmode={item.logo_darkmode}
                              alt={item.name}
                              height={60}
                              width={180}
                            />
                          </Link>
                        ) : (
                          <Link
                            className="flex h-[100px] w-[180px] items-center justify-center rounded border border-dashed border-border p-4 dark:border-darkmode-border"
                            href="/become-a-sponsor"
                          >
                            Book A Slot
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* individual supporters */}
                {/* <div className="mb-0">
                  <h2 className="h3 mb-6">Individual Supporters</h2>
                  <ul>
                    {individualSupporters.map((item, index) => (
                      <li className="m-2 inline-block align-middle" key={index}>
                        <Gravatar
                          email={item.payer_email}
                          size={50}
                          title={item.payer_name}
                          className="rounded-full"
                        />
                      </li>
                    ))}
                    <li className="m-2 inline-block align-middle">
                      <Link
                        href="https://www.buymeacoffee.com/statichunt"
                        rel="nofollow noopener noreferrer"
                        target="_blank"
                        className="block h-[50px] w-[50px] rounded-full border border-dashed border-border text-xl leading-[45px] dark:border-darkmode-border"
                        title="Become a Supporter"
                      >
                        <BsPlusLg />
                      </Link>
                    </li>
                  </ul>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Base>
  );
};

export const getStaticProps = async () => {
  const data = await getListPage("content/sponsors/index.md");
  return {
    props: {
      data: data,
    },
  };
};

export default Sponsors;

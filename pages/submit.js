import ExampleSubmit from "@/components/product-submit/ExampleSubmit";
import ThemeSubmit from "@/components/product-submit/ThemeSubmit";
import ToolSubmit from "@/components/product-submit/ToolSubmit";
import Base from "@/layouts/Baseof";
import { getListPage } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";
import MobileSidebar from "@/partials/MobileSidebar";
import shortcodes from "@/shortcodes/all";
import axios from "axios";
import { MDXRemote } from "next-mdx-remote";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { FaMinus, FaPlus } from "react-icons/fa6";

const SubmitProduct = ({ data }) => {
  const { mdxContent, frontmatter } = data;

  const {
    title: page_title,
    meta_title,
    description: meta_description,
    success_message,
    products,
    faqs,
  } = frontmatter;

  const [selectedProduct, setSelectedProduct] = useState("");
  const [loader, setLoader] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  // theme form data
  const [themeFormData, setThemeFormData] = useState({
    title: "",
    github: "",
    price: "",
    download: "",
    demo: "",
    author: "",
    author_link: "",
    date: "",
    description: "",
    ssg: [],
    css: [],
    ui: [],
    cms: [],
    category: [],
    content: "",
  });

  const handleFaqToggle = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleThemeInputChange = (e) => {
    const { id, value } = e.target;
    setThemeFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleThemeSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/submit-theme`,
        themeFormData,
        {
          headers: {
            authorization_token: `Barrier ${process.env.NEXT_PUBLIC_TOKEN}`,
          },
        },
      );
      setLoader(false);
      setSubmitted(true);
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  return (
    <Base
      title={page_title}
      meta_title={meta_title}
      description={meta_description}
    >
      <MobileSidebar />
      <section className="section relative after:absolute after:left-0 after:top-0 after:h-[400px] after:w-full after:bg-theme-light after:content-[''] dark:bg-darkmode-body dark:after:bg-darkmode-theme-light">
        <div className="container relative z-20">
          <div className="row justify-center">
            <div className="mb-16 text-center sm:col-10 md:col-8 lg:col-6">
              {markdownify(page_title, "h1", "mb-4")}
              <MDXRemote {...mdxContent} components={shortcodes} />
            </div>

            {/* product cards */}
            {!submitted && !selectedProduct && (
              <div className="xl:col-10">
                <div className="row">
                  {products.map((item) => (
                    <div
                      className="md:col-4 mb-6 md:mb-0"
                      key={item.identifier}
                    >
                      <div className="rounded text-center bg-white p-4 shadow dark:bg-darkmode-theme-dark">
                        <Image
                          src={`/images/submit/${item.identifier}-submit.png`}
                          alt="product-submit"
                          width={410}
                          height={267}
                          className="mb-4 w-full bg-theme-light dark:bg-darkmode-theme-light rounded"
                        />
                        <h3 className="mb-4 text-h5">{item.name}</h3>
                        <p className="mb-6">{item.description}</p>
                        <button
                          className="btn btn-primary mb-3"
                          onClick={() => setSelectedProduct(item.identifier)}
                        >
                          Submit Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* theme submit form */}
            {!submitted && selectedProduct === "theme" && (
              <ThemeSubmit setSubmitted={setSubmitted} />
            )}

            {/* tool submit form */}
            {!submitted && selectedProduct === "tool" && (
              <ToolSubmit setSubmitted={setSubmitted} />
            )}

            {/* example submit form */}
            {!submitted && selectedProduct === "example" && (
              <ExampleSubmit setSubmitted={setSubmitted} />
            )}

            {/* submit response */}
            {submitted && (
              <div className="md:col-10 lg:col-8">
                <div className="rounded bg-white py-12 px-16 shadow dark:bg-darkmode-theme-dark">
                  <div className="text-center">
                    <div className="mb-4 text-[3rem] text-primary">
                      <BsCheckCircleFill />
                    </div>
                    {markdownify(success_message, "p")}
                    <Link href={"/"} className="btn btn-primary mt-5">
                      Back To Home
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* faq */}
      {faqs.enable && !selectedProduct && (
        <section className="section pt-0">
          <div className="container">
            <div className="row justify-center">
              <div className="mb-8 text-center sm:col-10 md:col-8 lg:col-6">
                {markdownify(faqs.title, "h1", "mb-4")}
                {markdownify(faqs.subtitle, "p", "mb-0")}
              </div>
              <div className="xl:col-8">
                <div>
                  {faqs.items.map((faq, index) => (
                    <div
                      key={index}
                      className={`pb-3 pt-2 ${index !== 0 && "border-t border-border dark:border-darkmode-border"}`}
                    >
                      <div
                        className="cursor-pointer text-h5 font-bold text-dark dark:text-darkmode-dark py-2 relative pr-5"
                        onClick={() => handleFaqToggle(index)}
                      >
                        {faq.question}
                        {openFaq === index ? (
                          <FaMinus className="absolute right-0 top-4" />
                        ) : (
                          <FaPlus className="absolute right-0 top-4" />
                        )}
                      </div>
                      {openFaq === index && (
                        <div className="content">
                          {markdownify(faq.answer, "p")}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </Base>
  );
};

export const getStaticProps = async () => {
  const data = await getListPage("content/landing-pages/product-submit.md");
  return {
    props: {
      data: data,
    },
  };
};

export default SubmitProduct;

import Base from "@/layouts/Baseof";
import { getListPage } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";
import MobileSidebar from "@/partials/MobileSidebar";
import shortcodes from "@/shortcodes/all";
import { MDXRemote } from "next-mdx-remote";
import Link from "next/link";
import { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";

const Contact = ({ data }) => {
  const { mdxContent, frontmatter } = data;

  const checkValue = (e, value) => {
    if (value != "") {
      e.target.classList.add("has-value");
    } else {
      e.target.classList.remove("has-value");
    }
    return "";
  };

  const { title, meta_title, description, success_message } = frontmatter;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [details, setDetails] = useState("");
  const [loader, setLoader] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const reset = () => {
    setName("");
    setEmail("");
    setSubject("");
    setDetails("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    fetch("https://formsubmit.co/ajax/hey.statichunt@gmail.com", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        _subject: subject,
        name: name,
        email: email,
        subject: subject,
        details: details,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setSubmitted(data.success);
        reset();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

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

            <div className="md:col-10 lg:col-8">
              <div className="rounded bg-white py-12 px-16 shadow dark:bg-darkmode-theme-dark">
                {submitted ? (
                  <div className="text-center">
                    <div className="mb-4 text-[3rem] text-primary">
                      <BsCheckCircleFill />
                    </div>
                    {markdownify(success_message, "p")}
                    <Link href={"/"} className="btn btn-primary mt-5">
                      Back To Home
                    </Link>
                  </div>
                ) : (
                  <form className="row" onSubmit={handleSubmit}>
                    <div className="col-12 relative mb-10">
                      <input
                        className="form-input w-full"
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          checkValue(e, e.target.value);
                        }}
                        required
                      />
                      <label className="form-label left-3" htmlFor="name">
                        Full Name *
                      </label>
                    </div>
                    <div className="col-12 relative mb-10">
                      <input
                        className="form-input w-full"
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          checkValue(e, e.target.value);
                        }}
                        required
                      />
                      <label className="form-label left-3" htmlFor="email">
                        Email address *
                      </label>
                    </div>
                    <div className="col-12 relative mb-10">
                      <input
                        className="form-input w-full"
                        type="text"
                        id="subject"
                        value={subject}
                        onChange={(e) => {
                          setSubject(e.target.value);
                          checkValue(e, e.target.value);
                        }}
                        required
                      />
                      <label className="form-label left-3" htmlFor="subject">
                        Subject *
                      </label>
                    </div>
                    <div className="col-12 relative mb-8">
                      <textarea
                        className="form-textarea w-full"
                        id="details"
                        value={details}
                        rows="6"
                        onChange={(e) => {
                          setDetails(e.target.value);
                          checkValue(e, e.target.value);
                        }}
                      />
                      <label className="form-label left-3" htmlFor="details">
                        Message *
                      </label>
                    </div>
                    <div className="col-12 text-right">
                      <button
                        className={`btn btn-primary ${
                          loader && "btn-loading"
                        } `}
                        type="submit"
                        disabled={!(name && email && subject && details)}
                      >
                        {loader ? (
                          <span data-text="Submitting">
                            <span>Submitting</span>
                          </span>
                        ) : (
                          <span data-text="Submit">
                            <span>Submit</span>
                          </span>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Base>
  );
};

export const getStaticProps = async () => {
  const data = await getListPage("content/contact/_index.md");
  return {
    props: {
      data: data,
    },
  };
};

export default Contact;

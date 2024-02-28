import sponsors from "@/json/sponsors.json";
import Link from "next/link";
import { useState } from "react";

const Sponsor = ({ title, paddle, price, type, children }) => {
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [attachment, setAttachment] = useState("");
  const [loader, setLoader] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const checkValue = (e, value) => {
    if (value != "") {
      e.target.classList.add("has-value");
    } else {
      e.target.classList.remove("has-value");
    }
    return "";
  };

  const reset = () => {
    setName("");
    setEmail("");
    setRole("");
    setCompany("");
    setWebsite("");
    setAttachment("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    fetch(
      "https://formsubmit.co/ajax/hey.statichunt@gmail.com", // https://formsubmit.co/ajax/hey.statichunt@gmail.com
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          _subject: "SPONSOR REQUEST: " + name,
          name: name,
          email: email,
          role: role,
          company: company,
          website: website,
          attachment: attachment,
        }),
      },
    )
      .then((response) => response.json())
      .then((data) => {
        setSubmitted(data.success);
        reset();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const slotCount = sponsors.frontmatter[type].filter((d) => !d.name).length;
  return (
    <>
      <div className="mb-6 overflow-hidden rounded border-[6px] border-theme-light dark:border-darkmode-theme-dark lg:flex">
        <div className="flex flex-1 flex-col justify-center bg-theme-light/25 p-6 dark:bg-darkmode-theme-light lg:px-8">
          <h3 className="mb-0">{title}</h3>
          <div className="cotnent">{children}</div>
        </div>
        <div className="bg-theme-light px-6 py-8 text-center dark:bg-darkmode-theme-dark lg:flex lg:w-56 lg:flex-shrink-0 lg:flex-col lg:justify-center lg:p-8">
          <div className="flex items-center justify-center">
            <span className="text-4xl font-bold text-primary">${price}</span>
            <span className="ml-1 text-lg text-text dark:text-darkmode-light">
              /month
            </span>
          </div>
          <div className="mt-6">
            <button
              className="btn btn-primary"
              onClick={() => setOpenModal(true)}
              disabled={slotCount === 0 ? true : false}
            >
              Sponsor Now
            </button>
            <small className="mt-2 block text-text dark:text-darkmode-text">
              {slotCount} slot left
            </small>
          </div>
        </div>
      </div>
      <div className={`modal ${openModal ? "block" : "hidden"}`}>
        <div className="modal-overlay" onClick={() => setOpenModal(false)} />
        <div className="modal-box top-12 w-[800px]">
          <div className="scroll-box max-h-[90vh] p-10">
            {submitted ? (
              <div className="text-center">
                <h2 className="mb-1">We Recived Your Information</h2>
                <h3 className="h4">Pay Now To Confirm Your Sponsorship</h3>
                <Link
                  href={paddle}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="btn btn-primary"
                >
                  Pay Now
                </Link>
              </div>
            ) : (
              <form className="row" onSubmit={handleSubmit}>
                <div className="col-12 text-left">
                  <h2>Complete The Form And Click Next</h2>
                </div>
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
                    id="company"
                    value={company}
                    onChange={(e) => {
                      setCompany(e.target.value);
                      checkValue(e, e.target.value);
                    }}
                    required
                  />
                  <label className="form-label left-3" htmlFor="company">
                    Company Name *
                  </label>
                </div>
                <div className="col-12 relative mb-10">
                  <input
                    className="form-input w-full"
                    type="text"
                    id="website"
                    value={website}
                    onChange={(e) => {
                      setWebsite(e.target.value);
                      checkValue(e, e.target.value);
                    }}
                    required
                  />
                  <label className="form-label left-3" htmlFor="website">
                    Company Website *
                  </label>
                </div>
                <div className="col-12 relative mb-10">
                  <input
                    className="form-input w-full"
                    type="text"
                    id="role"
                    value={role}
                    onChange={(e) => {
                      setRole(e.target.value);
                      checkValue(e, e.target.value);
                    }}
                    required
                  />
                  <label className="form-label left-3" htmlFor="role">
                    Job Title *
                  </label>
                </div>
                <div className="col-12 relative mb-10">
                  <input
                    className="form-input w-full"
                    type="text"
                    id="attachment"
                    value={attachment}
                    onChange={(e) => {
                      setAttachment(e.target.value);
                      checkValue(e, e.target.value);
                    }}
                    required
                  />
                  <label className="form-label left-3" htmlFor="attachment">
                    Logo Download Link (Light and Dark) *
                  </label>
                </div>
                <div className="col-12 text-right">
                  <button
                    className={`btn btn-primary ${loader && "btn-loading"}`}
                    type="submit"
                    disabled={!(name && email && attachment)}
                  >
                    {loader ? <span>Submitting</span> : <span>Next</span>}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sponsor;

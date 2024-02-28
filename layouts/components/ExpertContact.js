import { markdownify } from "lib/utils/textConverter";
import { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";

const ExpertContact = ({ title, contactEmail, successMessage }) => {
  const checkValue = (e, value) => {
    if (value != "") {
      e.target.classList.add("has-value");
    } else {
      e.target.classList.remove("has-value");
    }
    return "";
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [budget, setBudget] = useState("");
  const [details, setDetails] = useState("");
  const [loader, setLoader] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    fetch(`https://formsubmit.co/ajax/${contactEmail}`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        _subject: "Service Request Via Statichunt",
        _cc: "hey.statichunt@gmail.com",
        name: name,
        email: email,
        type: type,
        budget: budget,
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
    <section className="section pt-0">
      <div className="container">
        <div className="row justify-center">
          <div className="md:col-10 xl:col-8">
            <div className="rounded bg-white py-12 px-16 shadow dark:bg-darkmode-theme-dark">
              {submitted ? (
                <div className="text-center">
                  <div className="mb-4 text-[3rem] text-primary">
                    <BsCheckCircleFill />
                  </div>
                  {markdownify(successMessage, "p")}
                </div>
              ) : (
                <form className="row" onSubmit={handleSubmit}>
                  <div className="col-12">
                    <h2 className="mb-6">Contact {title}</h2>
                  </div>
                  <div className="lg:col-6 relative mb-10">
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

                  <div className="lg:col-6 relative mb-10">
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
                      Work Email *
                    </label>
                  </div>

                  <div className="lg:col-6 mb-10">
                    <select
                      id="type"
                      name="type"
                      className="form-select w-full"
                      value={type}
                      onChange={(e) => {
                        setType(e.target.value);
                        checkValue(e, e.target.value);
                      }}
                      required
                    >
                      <option disabled value="">
                        Choose Website Type
                      </option>
                      <option value="Business">Business</option>
                      <option value="Documentation">Documentation</option>
                      <option value="Blog">Blog</option>
                      <option value="Personal">Personal</option>
                      <option value="Non-Profit">Non-Profit</option>
                      <option value="Ecommerce">Ecommerce</option>
                      <option value="Other">Other</option>
                    </select>

                    <label htmlFor="type" className="form-label">
                      Website Type *
                    </label>
                  </div>

                  <div className="lg:col-6 mb-10">
                    <label htmlFor="budget" className="form-label">
                      Estimate Budget
                      <span className="lh-1 text-red-600">*</span>
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      className="form-select w-full"
                      value={budget}
                      onChange={(e) => {
                        setBudget(e.target.value);
                        checkValue(e, e.target.value);
                      }}
                      required
                    >
                      <option disabled value="">
                        Choose Budget
                      </option>
                      <option value="$500 - $1000">$500 - $1000</option>
                      <option value="$2000 - $5000">$2000 - $5000</option>
                      <option value="$5000 - $10000">$5000 - $10000</option>
                      <option value="$10000 - $30000">$10000 - $30000</option>
                      <option value="I don't care about budget">
                        I don&apos;t care about budget
                      </option>
                    </select>
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
                      Project Brief *
                    </label>
                  </div>

                  {/* <div className="mb-8">
                    <p>
                      For information about how Statichunt handles personal
                      data, see our{" "}
                      <Link
                        className="text-primary"
                        href="/disclaimer"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Privacy Policy
                      </Link>
                    </p>
                  </div> */}
                  <div className="col-12 text-left">
                    <button
                      className={`btn btn-primary ${loader && "btn-loading"} `}
                      type="submit"
                      disabled={!(name && email && type && budget && details)}
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
  );
};

export default ExpertContact;

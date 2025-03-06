import options from "@/config/options.json";
import axios from "axios";
import { useState } from "react";
import MultiSelect from "../MultiSelect";

const ExampleSubmit = ({ setSubmitted }) => {
  const [loader, setLoader] = useState(false);
  const [exampleFormData, setExampleFormData] = useState({
    title: "",
    website: "",
    ssg: [],
    css: [],
    ui: [],
    category: [],
  });

  const handleExampleInputChange = (e) => {
    const { id, value } = e.target;
    setExampleFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSelectChange = (selectedOptions, actionMeta) => {
    const { name } = actionMeta;
    setExampleFormData((prevData) => ({
      ...prevData,
      [name]: selectedOptions.map((option) => option.value),
    }));
  };

  const handleExampleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/submit-example`,
        exampleFormData,
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
    <div className="md:col-10 lg:col-8">
      <div className="rounded bg-white p-8 shadow dark:bg-darkmode-theme-dark">
        <h3 className="mb-8">Example Site Submission Form</h3>
        <form className="row" onSubmit={handleExampleSubmit}>
          <div className="col-12 mb-6">
            <label className="mb-2 inline-block" htmlFor="title">
              Site Name *
            </label>
            <input
              className="form-input h-10 w-full"
              type="text"
              id="title"
              value={exampleFormData.title}
              onChange={handleExampleInputChange}
              required
            />
          </div>
          <div className="col-12 mb-6">
            <label className="mb-2 inline-block" htmlFor="website">
              Website URL *
            </label>
            <input
              className="form-input h-10 w-full"
              type="url"
              id="website"
              value={exampleFormData.website}
              onChange={handleExampleInputChange}
              required
            />
          </div>
          <div className="col-12 mb-6">
            <label className="mb-2 inline-block" htmlFor="ssg">
              Technology *
            </label>
            <MultiSelect
              isMulti
              name="ssg"
              options={options.ssg}
              value={exampleFormData.ssg.map((value) => ({
                value,
                label: value,
              }))}
              placeholder="Select Technology"
              onChange={(selectedOptions) =>
                handleSelectChange(selectedOptions, { name: "ssg" })
              }
            />
          </div>
          <div className="col-12 mb-6">
            <label className="mb-2 inline-block" htmlFor="category">
              Category *
            </label>
            <MultiSelect
              isMulti
              name="category"
              options={options.category}
              value={exampleFormData.category.map((value) => ({
                value,
                label: value,
              }))}
              placeholder="Select Category"
              onChange={(selectedOptions) =>
                handleSelectChange(selectedOptions, { name: "category" })
              }
            />
          </div>
          <div className="col-12 mb-6">
            <label className="mb-2 inline-block" htmlFor="css">
              CSS Frameworks
            </label>
            <MultiSelect
              isMulti
              name="css"
              options={options.css}
              value={exampleFormData.css.map((value) => ({
                value,
                label: value,
              }))}
              placeholder="Select CSS Frameworks"
              onChange={(selectedOptions) =>
                handleSelectChange(selectedOptions, { name: "css" })
              }
            />
          </div>
          <div className="col-12 mb-6">
            <label className="mb-2 inline-block" htmlFor="ui">
              UI Libraries
            </label>
            <MultiSelect
              isMulti
              name="ui"
              options={options.ui}
              value={exampleFormData.ui.map((value) => ({
                value,
                label: value,
              }))}
              placeholder="Select UI Libraries"
              onChange={(selectedOptions) =>
                handleSelectChange(selectedOptions, { name: "ui" })
              }
            />
          </div>
          <div className="col-12 text-right">
            <button
              className={`btn btn-primary ${loader && "btn-loading"} `}
              type="submit"
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
      </div>
    </div>
  );
};

export default ExampleSubmit;

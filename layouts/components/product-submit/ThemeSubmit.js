import options from "@/config/options.json";
import axios from "axios";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa6";
import MultiSelect from "../MultiSelect";

const ThemeSubmit = ({ setSubmitted }) => {
  const [loader, setLoader] = useState(false);
  const [themeType, setThemeType] = useState("open-source");
  const [themeFormData, setThemeFormData] = useState({
    title: "",
    github: "",
    price: 0,
    download: "",
    demo: "",
    author: "",
    author_link: "",
    description: "",
    ssg: [],
    css: [],
    ui: [],
    cms: [],
    category: [],
    content: "",
  });

  const handleThemeInputChange = (e) => {
    const { id, value } = e.target;
    setThemeFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSelectChange = (selectedOptions, actionMeta) => {
    const { name } = actionMeta;
    setThemeFormData((prevData) => ({
      ...prevData,
      [name]: selectedOptions.map((option) => option.value),
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
    <div className="md:col-10 lg:col-8">
      <div className="rounded bg-white p-8 shadow dark:bg-darkmode-theme-dark">
        <h3 className="mb-8">Theme Submission Form</h3>
        {/* select theme type */}
        <div className="mb-6">
          <label className="mb-2 inline-block" htmlFor="theme-type">
            Theme Type *
          </label>
          <div className="flex items-center space-x-4">
            <button
              type="button"
              className={`btn ${
                themeType === "open-source"
                  ? "btn-primary"
                  : "btn-outline-primary"
              }`}
              onClick={() => setThemeType("open-source")}
            >
              {themeType === "open-source" ? (
                <span className="mr-2">
                  <FaCheckCircle className="h-4 w-4 -mt-1" />
                </span>
              ) : (
                <span className="mr-2">
                  <FaRegCircle className="h-4 w-4 -mt-1" />
                </span>
              )}
              Open Source
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded ${
                themeType === "free" ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => setThemeType("free")}
            >
              {themeType === "free" ? (
                <span className="mr-2">
                  <FaCheckCircle className="h-4 w-4 -mt-1" />
                </span>
              ) : (
                <span className="mr-2">
                  <FaRegCircle className="h-4 w-4 -mt-1" />
                </span>
              )}
              Free
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded ${
                themeType === "premium" ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => setThemeType("premium")}
            >
              {themeType === "premium" ? (
                <span className="mr-2">
                  <FaCheckCircle className="h-4 w-4 -mt-1" />
                </span>
              ) : (
                <span className="mr-2">
                  <FaRegCircle className="h-4 w-4 -mt-1" />
                </span>
              )}
              Premium
            </button>
          </div>
        </div>
        <form className="row" onSubmit={handleThemeSubmit}>
          <div className="col-12 mb-6">
            <label className="mb-2 inline-block" htmlFor="title">
              Theme Name *
            </label>
            <input
              className="form-input h-10 w-full"
              type="text"
              id="title"
              value={themeFormData.title}
              onChange={handleThemeInputChange}
              required
            />
          </div>
          <div className="lg:col-6 mb-6">
            <label className="mb-2 inline-block" htmlFor="demo">
              Theme Demo URL *
            </label>
            <input
              className="form-input h-10 w-full"
              type="url"
              id="demo"
              value={themeFormData.demo}
              onChange={handleThemeInputChange}
              required
            />
          </div>
          {themeType === "open-source" && (
            <div className="lg:col-6 mb-6">
              <label className="mb-2 inline-block" htmlFor="github">
                GitHub URL *
              </label>
              <input
                className="form-input h-10 w-full"
                type="url"
                id="github"
                value={themeFormData.github}
                onChange={handleThemeInputChange}
                required
              />
            </div>
          )}
          {themeType === "premium" && (
            <div className="lg:col-6 mb-6">
              <label className="mb-2 inline-block" htmlFor="price">
                Price *
              </label>
              <input
                className="form-input h-10 w-full"
                type="number"
                id="price"
                value={themeFormData.price}
                onChange={handleThemeInputChange}
                required
              />
            </div>
          )}

          {(themeType === "free" || themeType === "premium") && (
            <div className="lg:col-6 mb-6">
              <label className="mb-2 inline-block" htmlFor="download">
                Download URL *
              </label>
              <input
                className="form-input h-10 w-full"
                type="url"
                id="download"
                value={themeFormData.download}
                onChange={handleThemeInputChange}
                required
              />
            </div>
          )}
          <div className="lg:col-6 mb-6">
            <label className="mb-2 inline-block" htmlFor="author">
              Author *
            </label>
            <input
              className="form-input h-10 w-full"
              type="text"
              id="author"
              value={themeFormData.author}
              onChange={handleThemeInputChange}
              required
            />
          </div>
          <div className="lg:col-6 mb-6">
            <label className="mb-2 inline-block" htmlFor="author_link">
              Author's{" "}
              {themeType === "open-source" ? "GitHub Account" : "Website"} *
            </label>
            <input
              className="form-input h-10 w-full"
              type="url"
              id="author_link"
              value={themeFormData.author_link}
              onChange={handleThemeInputChange}
              required
            />
          </div>
          <div className="col-12 mb-6">
            <label className="mb-2 inline-block" htmlFor="description">
              Short Description *
            </label>
            <textarea
              className="form-textarea w-full"
              id="description"
              rows="3"
              value={themeFormData.description}
              onChange={handleThemeInputChange}
              required
            />
          </div>
          <div className="col-12 mb-6">
            <label className="mb-2 inline-block" htmlFor="ssg">
              Technology
            </label>
            <MultiSelect
              isMulti
              name="ssg"
              options={options.ssg}
              value={themeFormData.ssg.map((value) => ({
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
            <label className="mb-2 inline-block" htmlFor="css">
              CSS Frameworks
            </label>
            <MultiSelect
              isMulti
              name="css"
              options={options.css}
              value={themeFormData.css.map((value) => ({
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
              value={themeFormData.ui.map((value) => ({
                value,
                label: value,
              }))}
              placeholder="Select UI Libraries"
              onChange={(selectedOptions) =>
                handleSelectChange(selectedOptions, { name: "ui" })
              }
            />
          </div>
          <div className="col-12 mb-6">
            <label className="mb-2 inline-block" htmlFor="cms">
              CMS
            </label>
            <MultiSelect
              isMulti
              name="cms"
              options={options.cms}
              value={themeFormData.cms.map((value) => ({
                value,
                label: value,
              }))}
              placeholder="Select CMS"
              onChange={(selectedOptions) =>
                handleSelectChange(selectedOptions, { name: "cms" })
              }
            />
          </div>
          <div className="col-12 mb-6">
            <label className="mb-2 inline-block" htmlFor="category">
              Category
            </label>
            <MultiSelect
              isMulti
              name="category"
              options={options.category}
              value={themeFormData.category.map((value) => ({
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
            <label className="mb-2 inline-block" htmlFor="content">
              Content
            </label>
            <textarea
              className="form-textarea w-full"
              id="content"
              rows="5"
              value={themeFormData.content}
              onChange={handleThemeInputChange}
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

export default ThemeSubmit;

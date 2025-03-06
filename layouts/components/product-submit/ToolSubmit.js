import options from "@/config/options.json";
import axios from "axios";
import { useState } from "react";
import MultiSelect from "../MultiSelect";

const ToolSubmit = ({ setSubmitted }) => {
  const [loader, setLoader] = useState(false);
  const [toolFormData, setToolFormData] = useState({
    title: "",
    website: "",
    description: "",
    license: "",
    category: [],
    supports: [],
    plans: [],
    type: [],
    content: "",
  });

  const handleToolInputChange = (e) => {
    const { id, value } = e.target;
    setToolFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSelectChange = (selectedOptions, actionMeta) => {
    const { name } = actionMeta;
    setToolFormData((prevData) => ({
      ...prevData,
      [name]: selectedOptions.map((option) => option.value),
    }));
  };

  const handleToolSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/submit-tool`,
        toolFormData,
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
        <form className="row" onSubmit={handleToolSubmit}>
          <div className="col-12 mb-6">
            <label className="mb-2 inline-block" htmlFor="title">
              Tool Name *
            </label>
            <input
              className="form-input h-10 w-full"
              type="text"
              id="title"
              value={toolFormData.title}
              onChange={handleToolInputChange}
              required
            />
          </div>
          <div className="lg:col-6 mb-6">
            <label className="mb-2 inline-block" htmlFor="website">
              Website URL *
            </label>
            <input
              className="form-input h-10 w-full"
              type="url"
              id="website"
              value={toolFormData.website}
              onChange={handleToolInputChange}
              required
            />
          </div>
          <div className="lg:col-6 mb-6">
            <label className="mb-2 inline-block" htmlFor="license">
              License *
            </label>
            <input
              className="form-input h-10 w-full"
              type="text"
              id="license"
              value={toolFormData.license}
              onChange={handleToolInputChange}
              required
            />
          </div>

          {/* description */}
          <div className="col-12 mb-6">
            <label className="mb-2 inline-block" htmlFor="description">
              Short Description *
            </label>
            <textarea
              className="form-textarea w-full"
              id="description"
              rows="3"
              value={toolFormData.description}
              onChange={handleToolInputChange}
              required
            />
          </div>

          {/* category */}
          <div className="col-12 mb-6">
            <label className="mb-2 inline-block" htmlFor="category">
              Category *
            </label>
            <MultiSelect
              isMulti
              name="category"
              options={options.tool_category}
              value={toolFormData.category.map((value) => ({
                value,
                label: value,
              }))}
              placeholder="Select Category"
              onChange={(selectedOptions) =>
                handleSelectChange(selectedOptions, { name: "category" })
              }
            />
          </div>

          {/* supports */}
          <div className="col-12 mb-6">
            <label className="mb-2 inline-block" htmlFor="supports">
              Works With *
            </label>
            <MultiSelect
              isMulti
              name="supports"
              options={options.ssg}
              value={toolFormData.supports.map((value) => ({
                value,
                label: value,
              }))}
              placeholder="Select Supports"
              onChange={(selectedOptions) =>
                handleSelectChange(selectedOptions, { name: "supports" })
              }
            />
          </div>

          {/* plans */}
          <div className="col-12 mb-6">
            <label className="mb-2 inline-block" htmlFor="plans">
              Plans *
            </label>
            <MultiSelect
              isMulti
              name="plans"
              options={options.tool_plan}
              value={toolFormData.plans.map((value) => ({
                value,
                label: value,
              }))}
              placeholder="Select Plans"
              onChange={(selectedOptions) =>
                handleSelectChange(selectedOptions, { name: "plans" })
              }
            />
          </div>

          {/* type */}
          <div className="col-12 mb-6">
            <label className="mb-2 inline-block" htmlFor="type">
              Tool Type
            </label>
            <MultiSelect
              creatable
              isMulti
              name="type"
              options={options.tool_type}
              value={toolFormData.type.map((value) => ({
                value,
                label: value,
              }))}
              placeholder="Select Type"
              onChange={(selectedOptions) =>
                handleSelectChange(selectedOptions, { name: "type" })
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
              value={toolFormData.content}
              onChange={handleToolInputChange}
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

export default ToolSubmit;

import config from "@/config/config.json";
import { slugify } from "lib/utils/textConverter";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { FaCheck } from "react-icons/fa6";
import Select from "react-select";
import { useThemeFinder } from "./themeFinderProvider";

const { dark_icon_list } = config;

function ImageSelectionQuiz({ name, options, view, type }) {
  const finder = useThemeFinder();
  let currentQuizValue = finder.value[name] ?? [];

  if (!Array.isArray(currentQuizValue)) {
    currentQuizValue = [currentQuizValue];
  }

  return (
    <div
      className={`${view === "list" ? "flex flex-col space-y-5" : "grid grid-cols-2 md:grid-cols-3 gap-3"} mt-5 sm:mt-8`}
    >
      {options?.map((image, index) => {
        const isSelected = currentQuizValue?.some((a) => a === image.value);
        return (
          <button
            type="button"
            key={index}
            onClick={() => {
              if (type === "single") {
                finder.setValue({
                  ...finder.value,
                  [name]: image.value,
                });
                return;
              } else if (!image.value) {
                finder.setValue({
                  ...finder.value,
                  [name]: [""],
                });
                return;
              }

              finder.setValue({
                ...finder.value,
                [name]: (currentQuizValue?.some(
                  (value) => value === image.value,
                )
                  ? currentQuizValue?.filter((value) => value !== image.value)
                  : [...currentQuizValue, image.value]
                ).filter((value) => value),
              });
            }}
            className={`relative flex overflow-hidden  border rounded   ${isSelected ? "border-primary" : "border-border dark:border-darkmode-border"} ${view === "list" ? "flex-row items-center space-x-3 p-4" : "flex-col justify-center items-center p-8 space-y-2"}`}
          >
            <div
              className={`btn-primary text-white p-3 absolute right-0 top-0 w-full rotate-45 ${isSelected ? "block" : "hidden"}`}
              style={{
                transform:
                  type === "single"
                    ? "translate(50%, -19px) rotate(45deg)"
                    : "translate(108px, -11px) rotate(45deg)",
              }}
            >
              <span>
                <FaCheck
                  className={`-rotate-45 size-4 ${type === "single" ? "translate-y-2.5" : "translate-y-1"}`}
                />
              </span>
            </div>

            <div
              className={`${name === "developer" ? "bg-theme-light rounded dark:bg-darkmode-theme-light" : ""}`}
            >
              <Image
                src={image.icon}
                width={45}
                height={45}
                alt={image.label}
                className={`${
                  dark_icon_list.includes(slugify(image.label))
                    ? "dark:brightness-0 dark:invert"
                    : ""
                }`}
              />
            </div>
            <p className="text-dark dark:text-darkmode-dark text-sm font-medium text-center">
              {image.label}
            </p>
          </button>
        );
      })}
    </div>
  );
}

function ImageSelectionQuizWithSelect({ name, options, placeholder }) {
  const finder = useThemeFinder();
  const currentQuizValue = finder.value[name] ?? "";
  const { theme } = useTheme();

  const customStyles = (darkMode) => ({
    control: (provided, state) => ({
      ...provided,
      borderWidth: "1px",
      borderRadius: "0.375rem",
      borderColor: state.isFocused
        ? darkMode
          ? "rgba(255, 255, 255, 0.6)" // Light border for dark mode
          : "rgba(0, 168, 191, 1)"
        : darkMode
          ? "rgba(255, 255, 255, 0.3)"
          : "rgb(209, 213, 219)",
      boxShadow: "none",
      "&:hover": {
        borderColor: darkMode
          ? "rgba(255, 255, 255, 0.6)"
          : "rgba(0, 168, 191, 1)",
      },
      backgroundColor: darkMode ? "rgba(31, 41, 55, 1)" : "white",
      color: darkMode ? "rgba(255, 255, 255, 0.9)" : "rgba(75, 85, 101, 1)",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: darkMode ? "rgba(17, 24, 39, 1)" : "white",
      borderRadius: "0.375rem",
      marginTop: "0.25rem",
      zIndex: "50",
      padding: "16px",
      border: darkMode
        ? "1px solid rgba(255, 255, 255, 0.3)"
        : "1px solid rgba(221, 221, 221, 1)",
    }),
    option: (provided, state) => ({
      ...provided,
      cursor: "pointer",
      padding: "10px",
      fontSize: "14px",
      borderRadius: "4px",
      backgroundColor: state.isFocused
        ? darkMode
          ? "rgba(255, 255, 255, 0.1)"
          : "rgba(5, 150, 105, 0.03)"
        : darkMode
          ? "rgba(17, 24, 39, 1)"
          : "#fff",
      color: darkMode
        ? state.isFocused || state.isSelected
          ? "rgba(255, 255, 255, 1)"
          : "rgba(156, 163, 175, 1)"
        : state.isFocused || state.isSelected
          ? "rgba(75, 85, 101, 1)"
          : "rgba(75, 85, 101, 1)",
      fontWeight: state.isSelected ? "600" : "400",
      "&:hover": {
        backgroundColor: darkMode
          ? "rgba(255, 255, 255, 0.1)"
          : "rgba(5, 150, 105, 0.03)",
        color: darkMode ? "rgba(255, 255, 255, 1)" : "rgba(75, 85, 101, 1)",
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: darkMode ? "rgba(156, 163, 175, 1)" : "rgba(156, 163, 175, 1)",
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: darkMode
        ? "rgba(255, 255, 255, 1)" // Selected value color for dark mode
        : "rgba(75, 85, 101, 1)", // Selected value color for light mode
      fontWeight: "600", // You can adjust the font weight if needed
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: darkMode
        ? state.isFocused
          ? "rgba(255, 255, 255, 0.6)"
          : "rgba(156, 163, 175, 1)"
        : state.isFocused
          ? "rgba(0, 168, 191, 1)"
          : "rgba(156, 163, 175, 1)",
      "&:hover": {
        color: darkMode ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 168, 191, 1)",
      },
    }),
  });

  const selectedValue = useMemo(() => {
    return options.find((option) => option.value === currentQuizValue);
  }, [currentQuizValue]);

  const isDark = theme === "dark";

  return (
    <div className="mt-8">
      <Select
        classNamePrefix="select"
        onChange={({ value }) => {
          finder.setValue({
            ...finder.value,
            [name]: value,
          });
        }}
        value={selectedValue}
        placeholder={placeholder}
        styles={customStyles(isDark)}
        options={options}
      />
    </div>
  );
}

export const createStepper = () => {
  const steps = [
    {
      id: 1,
      step: 1,
      name: "ssg",
      component: () => {
        const options = [
          { icon: "/images/icons/astro.svg", label: "Astro", value: "Astro" },
          {
            icon: "/images/icons/framer.svg",
            label: "Framer",
            value: "Framer",
          },
          {
            icon: "/images/icons/webflow.svg",
            label: "Webflow",
            value: "Webflow",
          },
          {
            icon: "/images/icons/nextjs.svg",
            label: "NextJs",
            value: "NextJs",
          },
          { icon: "/images/icons/hugo.svg", label: "Hugo", value: "Hugo" },
          {
            icon: "/images/icons/jekyll.svg",
            label: "Jekyll",
            value: "Jekyll",
          },
          { icon: "/images/icons/11ty.svg", label: "11ty", value: "11ty" },
          {
            icon: "/images/icons/nextis.svg",
            label: "Nuxtis",
            value: "Nuxtis",
          },
          {
            icon: "/images/icons/no-preference.svg",
            label: "No preference",
            value: "",
          },
        ];

        return (
          <div>
            <h1 className="text-dark dark:text-darkmode-dark">
              Do you have a preference for any specific platform or technology?
              <span className="text-xl ml-3"> (Select all that apply)</span>
            </h1>
            <ImageSelectionQuiz name={"ssg"} options={options} />
          </div>
        );
      },
    },
    {
      id: 2,
      step: 2,
      name: "category",
      component: () => {
        const options = [
          { value: "blog", label: "Blog" },
          { value: "portfolio", label: "Portfolio" },
          { value: "personal", label: "Personal" },
          { value: "documentation", label: "Documentation" },
          { value: "sass", label: "SaaS Marketing Website" },
          { value: "ecommerce", label: "E-commerce store" },
          { value: "charity", label: "Charity site" },
          { value: "corporate", label: "Corporate site" },
          { value: "landing", label: "Landing page" },
        ];

        return (
          <div>
            <h1 className="text-dark">
              What kind of website are you planning to create?
            </h1>
            <ImageSelectionQuizWithSelect
              options={options}
              name={"category"}
              placeholder={"Select type"}
            />
          </div>
        );
      },
    },
    {
      id: 3,
      step: 3,
      name: "features",
      component: () => {
        const features = [
          {
            icon: "/images/theme-finder/search.svg",
            label: "Search",
            value: "search",
          },
          {
            icon: "/images/theme-finder/seo-optimization.svg",
            label: "SEO optimization",
            value: "seo",
          },
          {
            icon: "/images/theme-finder/speed-optimization.svg",
            label: "Speed performance",
            value: "speed",
          },
          {
            icon: "/images/theme-finder/ecomerce.svg",
            label: "E-commerce functionality",
            value: "e-commerce",
          },
          {
            icon: "/images/theme-finder/blog.svg",
            label: "Blog",
            value: "blog",
          },
          {
            icon: "/images/theme-finder/contact.svg",
            label: "Contact form",
            value: "contact",
          },
          {
            icon: "/images/theme-finder/multilingual.svg",
            label: "Multilingual support",
            value: "i18n",
          },
          {
            icon: "/images/theme-finder/dark-mode.svg",
            label: "Dark mode compatibility",
            value: "dark",
          },
          {
            icon: "/images/icons/no-preference.svg",
            label: "No preference",
            value: "",
          },
        ];

        return (
          <>
            <div>
              <h1 className="text-black">
                What must-have features are you looking for on the theme?
              </h1>
              <div className="mt-8">
                <ImageSelectionQuiz name={"features"} options={features} />
              </div>
            </div>
          </>
        );
      },
    },
    {
      id: 4,
      step: 4,
      name: "cms",
      component: () => {
        const cms = [
          {
            label: "Sanity",
            value: "Sanity",
            icon: "/images/icons/sanity.svg",
          },
          {
            label: "Contentful",
            value: "Contentful",
            icon: "/images/icons/contentful.svg",
          },
          {
            label: "Tina CMS",
            value: "Tina CMS",
            icon: "/images/icons/tina.svg",
          },
          {
            label: "Cloudcannon",
            value: "Cloudcannon",
            icon: "/images/icons/cloudcannon.svg",
          },
          {
            label: "Decap",
            value: "Decap",
            icon: "/images/icons/decap.svg",
          },
          {
            icon: "/images/icons/no-preference.svg",
            label: "No preference",
            value: "",
          },
        ];

        return (
          <div>
            <h1 className="text-black">
              Do you need a Headless CMS to manage your website content?
            </h1>
            <ImageSelectionQuiz name={"cms"} options={cms} />
          </div>
        );
      },
    },
    {
      id: 5,
      step: 5,
      name: "expertise",
      component: () => {
        const customizing = [
          {
            label: "Beginner",
            value: "beginner",
            icon: "/images/theme-finder/beginner.svg",
          },
          {
            label: "Intermediate",
            value: "intermediate",
            icon: "/images/theme-finder/intermediate.svg",
          },
          {
            label: "Advanced",
            value: "advanced",
            icon: "/images/theme-finder/advanced.svg",
          },
        ];
        return (
          <div>
            <h1 className="text-black">
              How comfortable are you with customizing a website theme?
            </h1>
            <ImageSelectionQuiz
              type={"single"}
              name={"expertise"}
              options={customizing}
            />
          </div>
        );
      },
    },
    {
      id: 6,
      step: 6,
      name: "profession",
      component: () => {
        const options = [
          { label: "Business Owner", value: "business_owner" },
          { label: "Marketer", value: "marketer" },
          { label: "Designer", value: "designer" },
          { label: "Developer", value: "developer" },
          { label: "Project Manager", value: "project_manager" },
          { label: "Hobbyist", value: "hobbyist" },
          { label: "Freelancer", value: "freelancer" },
          { label: "Other", value: "other" },
        ];

        return (
          <div>
            <h1 className="text-dark dark:text-darkmode-dark">
              Which of these describes you best?
            </h1>
            <ImageSelectionQuizWithSelect
              name={"profession"}
              options={options}
              placeholder={"select type"}
            />
          </div>
        );
      },
    },
    {
      id: 7,
      step: 7,
      name: "developer",
      component: () => {
        const options = [
          {
            icon: "/images/theme-finder/create.svg",
            label: "I will create it myself.",
            value: "myself",
          },
          {
            icon: "/images/theme-finder/web-developer.svg",
            label: "I'll hire a professional web developer.",
            value: "web developer",
          },
          {
            icon: "/images/theme-finder/agency.svg",
            label: "I'll use an agency or design firm.",
            value: "agency",
          },
          {
            icon: "/images/theme-finder/colleague.svg",
            label: "A friend or colleague will help me.",
            value: "friend",
          },
          {
            icon: "/images/theme-finder/not-sure.svg",
            label: "Not sure yet",
            value: "not sure",
          },
        ];

        return (
          <div>
            <h1 className="text-black">
              Who will create the site for you using the theme?
            </h1>
            <ImageSelectionQuiz
              type={"single"}
              view="list"
              name={"developer"}
              options={options}
              placeholder={"select type"}
            />
          </div>
        );
      },
    },
    {
      id: 8,
      step: 8,
      name: "from",
      component: () => {
        const finder = useThemeFinder();
        const handleChange = (e) => {
          const { name, value } = e.target;
          finder.setValue({
            ...finder.value,
            [name]: value,
          });
        };

        const value = finder.value;

        return (
          <div>
            <h1 className="text-dark mb-2.5">Contact Information</h1>
            <p>
              Please fill in your details to proceed. Your information helps us
              provide a better experience.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="relative sm:col-span-1 col-span-2">
                <input
                  className={`form-input w-full ${value.first_name ? "has-value" : ""}`}
                  type="text"
                  id="name"
                  name="first_name"
                  value={value.first_name ?? ""}
                  onChange={handleChange}
                  required
                />
                <label
                  className="form-label left-3 dark:bg-darkmode-body"
                  htmlFor="email"
                >
                  First Name *
                </label>
              </div>
              <div className="relative sm:col-span-1 col-span-2">
                <input
                  className={`form-input w-full ${value.last_name ? "has-value" : ""}`}
                  type="text"
                  id="name"
                  name="last_name"
                  onChange={handleChange}
                  value={value.last_name ?? ""}
                />
                <label
                  className="form-label left-3 dark:bg-darkmode-body"
                  htmlFor="email"
                >
                  Last Name
                </label>
              </div>
              <div className="relative col-span-2">
                <input
                  className={`form-input w-full ${value.email ? "has-value" : ""} `}
                  type="email"
                  id="email"
                  name="email"
                  value={value.email ?? ""}
                  onChange={handleChange}
                  required
                />
                <label
                  className="form-label left-3 dark:bg-darkmode-body"
                  htmlFor="email"
                >
                  Email address *
                </label>
              </div>
            </div>
          </div>
        );
      },
    },
    {
      id: 9,
      step: 9,
      name: "complete",
      component: () => {
        return (
          <div className="text-center">
            <div className="space-y-4">
              <Image
                width={46}
                height={46}
                src={"/images/theme-finder/check.svg"}
                alt="check"
              />
              <h1 className="text-dark mb-2.5">Thank You!</h1>
              <p>We emailed you the theme list. please check your email. </p>
            </div>
            <Link href="/" class="btn btn-primary mt-6 btn-lg">
              Close
            </Link>
          </div>
        );
      },
    },
  ];

  return steps;
};

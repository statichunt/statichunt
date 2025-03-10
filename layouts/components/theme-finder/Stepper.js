import config from "@/config/config.json";
import { slugify } from "lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { FaCheck } from "react-icons/fa6";
import MultiSelect from "../MultiSelect";
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
            className={`relative flex overflow-hidden  border rounded   ${isSelected ? "border-primary" : "border-border dark:border-darkmode-border"} ${view === "list" ? "flex-row items-center gap-x-3 p-4" : "flex-col justify-center items-center px-8 space-y-2 py-6"}`}
          >
            <div
              className={`btn-primary text-white p-3 absolute right-0 top-0 w-full rotate-45 ${isSelected ? "block" : "hidden"}`}
              style={{
                transform:
                  type === "single"
                    ? "translate(50%, -19px) rotate(45deg)"
                    : "translate(46%, -11px) rotate(45deg)",
              }}
            >
              <span>
                <FaCheck
                  className={`-rotate-45 size-4 ${type === "single" ? "translate-y-2.5" : "translate-y-1"}`}
                />
              </span>
            </div>

            <div
              className={`${name === "developer" ? "bg-theme-light rounded dark:bg-darkmode-theme-light" : ""} size-[45px] flex-none`}
            >
              <Image
                src={image.icon}
                width={45}
                height={45}
                alt={image.label}
                className={`w-full h-full ${
                  dark_icon_list.includes(slugify(image.label))
                    ? "dark:brightness-0 dark:invert"
                    : ""
                }`}
              />
            </div>
            <p
              className={`text-dark dark:text-darkmode-dark text-sm font-medium ${type === "single" ? "text-left" : "text-center"}`}
            >
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

  const selectedValue = useMemo(() => {
    return options.find((option) => option.value === currentQuizValue);
  }, [currentQuizValue]);

  return (
    <div className="mt-8">
      <MultiSelect
        name={name}
        options={options}
        value={selectedValue}
        placeholder={placeholder}
        onChange={({ value }) => {
          finder.setValue({
            ...finder.value,
            [name]: value,
          });
        }}
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
          { value: "business", label: "Business" },
          { value: "blog", label: "Blog" },
          { value: "portfolio", label: "Portfolio" },
          { value: "dashboard", label: "Dashboard" },
          { value: "saas", label: "SaaS Landing" },
          { value: "ecommerce", label: "E-commerce store" },
          { value: "boilerplate", label: "Boilerplate" },
          { value: "documentation", label: "Documentation" },
          { value: "others", label: "Others" },
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
              placeholder={"Select Type"}
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
              placeholder={"Select Type"}
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
              Simply enter your email, and we’ll send the best templates
              tailored to your business directly to your inbox.
            </p>

            <div className="grid grid-cols-2 gap-x-4 gap-y-8 mt-8">
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
                  className="form-label -left-0 dark:bg-darkmode-body"
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
                  className="form-label -left-0 dark:bg-darkmode-body"
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
                  className="form-label -left-0 dark:bg-darkmode-body"
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

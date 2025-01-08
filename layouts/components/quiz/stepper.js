import Image from "next/image";
import { useMemo } from "react";
import Select from "react-select";
import { useQuiz } from "./quiz-provider";

function ImageSelectionQuiz({ name, options }) {
  const quiz = useQuiz();
  const currentQuizValue = quiz.value[name] ?? [];

  return (
    <div className="grid grid-cols-3 gap-3 mt-8">
      {options?.map((image, index) => {
        return (
          <button
            key={index}
            onClick={() => {
              quiz.setValue({
                ...quiz.value,
                [name]: currentQuizValue?.some((value) => value === image.value)
                  ? currentQuizValue?.filter((value) => value !== image.value)
                  : [...currentQuizValue, image.value],
              });
            }}
            className={`flex justify-center items-center flex-col border rounded p-8 space-y-2 ${currentQuizValue?.some((a) => a === image.value) ? "border-primary" : "border-border"}`}
          >
            <Image src={image.icon} width={45} height={45} alt={image.label} />
            <p className="text-dark text-sm font-medium text-center">
              {image.label}
            </p>
          </button>
        );
      })}
    </div>
  );
}

function ImageSelectionQuizWithSelect({ name, options, placeholder }) {
  const quiz = useQuiz();
  const currentQuizValue = quiz.value[name] ?? "";
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderWidth: "1px",
      borderRadius: "0.375rem",
      borderColor: state.isFocused
        ? "rgba(0, 168, 191, 1)"
        : "rgb(209, 213, 219)",
      boxShadow: state.isFocused ? "none" : "none",
      "&:hover": {
        borderColor: "rgba(0, 168, 191, 1)",
      },
      padding: "0",
      display: "flex",
      alignItems: "center",
      backgroundColor: "white",
    }),
    menu: (provided) => ({
      ...provided,
      boxShadow: "none",
      backgroundColor: "white",
      borderRadius: "0.375rem",
      marginTop: "0.25rem",
      zIndex: "50",
      padding: "16px",
      border: "1px solid rgba(221, 221, 221, 1)",
    }),
    option: (provided, state) => ({
      ...provided,
      cursor: "pointer",
      padding: "10px",
      fontSize: "14px",
      backgroundColor: state.isFocused ? "rgba(5, 150, 105, 0.03)" : "#fff",
      color:
        state.isFocused || state.isSelected
          ? "rgba(75, 85, 101, 1)"
          : "rgba(75, 85, 101, 1)",
      fontWeight: state.isSelected ? "600" : "600",
      "&:hover": {
        backgroundColor: "rgba(5, 150, 105, 0.03)",
        color: "rgba(75, 85, 101, 1)",
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "rgba(156, 163, 175, 1)", // Tailwind `text-gray-400`
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: state.isFocused
        ? "rgba(0, 168, 191, 1)"
        : "rgba(156, 163, 175, 1)",
      "&:hover": {
        color: "rgba(0, 168, 191, 1)",
      },
    }),
  };

  const selectedValue = useMemo(() => {
    return options.find((option) => option.value === currentQuizValue);
  }, []);

  return (
    <div className="mt-8">
      <Select
        value={selectedValue}
        placeholder={placeholder}
        styles={customStyles}
        options={options}
      />
    </div>
  );
}

export const createStepper = ({ questions }) => {
  const steps = [
    {
      id: 1,
      step: 1,
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
            value: "No preference",
          },
        ];

        return (
          <div>
            <h1 className="text-black">
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
      name: "profession",
      component: () => {
        const options = [
          { value: "blog", label: "Blog" },
          { value: "portfolio", label: "Portfolio" },
          { value: "personal", label: "Personal" },
          { value: "documentation", label: "Documentation" },
          { value: "saas-marketing", label: "SaaS Marketing Website" },
          { value: "ecommerce", label: "E-commerce store" },
          { value: "charity", label: "Charity site" },
          { value: "corporate", label: "Corporate site" },
          { value: "landing", label: "Landing page" },
        ];

        return (
          <div>
            <h1 className="text-black">What is your profession?</h1>
            <ImageSelectionQuizWithSelect
              options={options}
              name={"image"}
              placeholder={"Select type"}
            />
          </div>
        );
      },
    },
    {
      id: 3,
      step: 3,
      name: "company_size",
      component: () => {
        const features = [
          {
            icon: "/images/quiz/search.svg",
            label: "Search",
            value: "search",
          },
          {
            icon: "/images/quiz/seo-optimization.svg",
            label: "SEO optimization",
            value: "seo",
          },
          {
            icon: "/images/quiz/speed-optimization.svg",
            label: "Speed performance",
            value: "speed",
          },
          {
            icon: "/images/quiz/ecomerce.svg",
            label: "E-commerce functionality",
            value: "ecommerce",
          },
          {
            icon: "/images/quiz/blog.svg",
            label: "Blog",
            value: "blog",
          },
          {
            icon: "/images/quiz/contact.svg",
            label: "Contact form",
            value: "contact",
          },
          {
            icon: "/images/quiz/multilingual.svg",
            label: "Multilingual support",
            value: "multilingual",
          },
          {
            icon: "/images/quiz/dark-mode.svg",
            label: "Dark mode compatibility",
            value: "darkmode",
          },
        ];
        return (
          <>
            <div>
              <h1 className="text-black">
                What must-have features are you looking for on the theme?
              </h1>
              <div className="mt-8">
                <ImageSelectionQuiz name={"feature"} options={features} />
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
            value: "No preference",
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
      name: "customize-website",
      component: () => {
        const customizing = [
          {
            label: "Beginner",
            value: "beginner",
            icon: "/images/quiz/beginner.svg",
          },
          {
            label: "Intermediate",
            value: "intermediate",
            icon: "/images/quiz/intermediate.svg",
          },
          {
            label: "Advanced",
            value: "advanced",
            icon: "/images/quiz/advanced.svg",
          },
        ];
        return (
          <div>
            <h1 className="text-black">
              How comfortable are you with customizing a website theme?
            </h1>
            <ImageSelectionQuiz
              name={"customize-website"}
              options={customizing}
            />
          </div>
        );
      },
    },
    {
      id: 7,
      step: 7,
      name: "channel",
      component: () => {
        return <h1>Stepper 1</h1>;
      },
    },
  ];

  return steps;
};

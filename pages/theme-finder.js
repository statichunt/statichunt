import ContactForm from "@/components/contactForm";
import OnboardingSelect from "@/components/ThemeFinderSelect";
import themes from "@/json/theme-finder.json";
import Base from "@/layouts/Baseof";
import MobileSidebar from "@/partials/MobileSidebar";
import axios from "axios";
import useOs from "hooks/useOs";
import { getListPage, getSinglePageServer } from "lib/contentParser";
import countryDetector from "lib/utils/countryDetector";
import { sortByHandpicked } from "lib/utils/sortFunctions";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { getCookie } from "react-use-cookie";

export default function ThemeFinder({ questions, frontmatter }) {
  const { handpicked_themes } = frontmatter;
  const country = countryDetector();
  const { platForm: device } = useOs();
  const [isloading, setLoading] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [currentQuestionId, setCurrentQuestionId] = useState(
    questions[0]?.id || 1,
  );

  const [isComplete, setIsComplete] = useState(false);
  const finder = useMemo(() => {
    return Object.keys(selectedOptions).reduce((acc, key) => {
      const name = questions.find((q) => q.id === +key).name;
      if (name) {
        acc[name] = selectedOptions[key];
      }
      return acc;
    }, {});
  }, [JSON.stringify(selectedOptions)]);

  const { matchThemes, ssgAndCategoryFilterTheme } = useMemo(() => {
    const { ssg = [], category, features = [], cms = [] } = finder || {};

    const ssgAndCategoryFilterTheme = themes.filter((theme) => {
      // Check for ssg match
      const ssgMatch = ssg.filter((ssg) => ssg).length
        ? theme.ssg?.some((themeSsg) =>
            ssg.some((s) => s.toLowerCase() === themeSsg.toLowerCase()),
          )
        : true;
      // Check for category match
      const categoryMatch = category
        ? theme.category?.some(
            (c) => c.toLowerCase() === category?.toLowerCase(),
          )
        : true;

      return ssgMatch && categoryMatch;
    });

    const newMatchThemes = ssgAndCategoryFilterTheme.filter((theme) => {
      // Check for features match
      const featuresMatch =
        Array.isArray(features) && features.filter((feature) => feature).length
          ? features.every((feature) =>
              theme.features?.some(
                (themeFeature) =>
                  themeFeature.toLowerCase().indexOf(feature.toLowerCase()) !==
                  -1,
              ),
            )
          : true;

      // Check for cms match
      const cmsMatch =
        Array.isArray(cms) && cms.filter((cms) => cms).length
          ? theme.cms?.some((cmsItem) =>
              cms.some(
                (cms) =>
                  cms.toLowerCase().indexOf(cmsItem.toLowerCase()) !== -1,
              ),
            )
          : true;

      // Return theme if all conditions are matched
      return featuresMatch && cmsMatch;
    });

    return { matchThemes: newMatchThemes, ssgAndCategoryFilterTheme };
  }, [JSON.stringify(finder)]);

  const [openDropdownId, setOpenDropdownId] = useState(questions[0]?.id || 1);

  function navigateNextQuestion({ values, questionId }) {
    const nextQuestion = questions.find(
      (question) =>
        question.id > questionId &&
        !(question.exclude && question.exclude.some((v) => values.includes(v))),
    );

    return nextQuestion ? nextQuestion.id : -1;
  }

  const handleOptionChange = ({ selectedValue, questionId }) => {
    setSelectedOptions((prev) => {
      let updatedOptions;
      updatedOptions = {
        ...prev,
        [questionId]: selectedValue,
      };

      Object.keys(updatedOptions).forEach((key) => {
        if (parseInt(key) > questionId) {
          delete updatedOptions[key];
        }
      });

      return updatedOptions;
    });

    const values = Object.values(selectedOptions);
    const nextId = navigateNextQuestion({ values, questionId });

    setCurrentQuestionId(nextId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const first_visit = getCookie("welcomeDate");
    const landing_page = getCookie("welcomeLandingPage");
    const referrer = getCookie("welcomeReferrer");

    const formData = new FormData(e.target);
    const formDataObj = Object.fromEntries(formData.entries());

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user-lead`,
        {
          ...finder,
          ssg: finder.ssg.filter((ssg) => ssg),
          cms: finder.cms.filter((cms) => cms),
          features: finder.features.filter((feature) => feature),
          country,
          first_visit,
          landing_page,
          referrer,
          device,
          ...formDataObj,
          themes: sortByHandpicked(
            matchThemes.length > 0 ? matchThemes : ssgAndCategoryFilterTheme,
            handpicked_themes,
          )
            .slice(0, 10)
            .map((theme) => theme.slug),
        },
        {
          headers: {
            authorization_token: `Barrier ${process.env.NEXT_PUBLIC_TOKEN}`,
          },
        },
      );
      setIsComplete(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const renderQuestion = (questionId) => {
    const question = questions.find((q) => q.id === questionId);
    if (!question) return null;

    const options = question?.options;
    const isVisible =
      currentQuestionId === questionId ||
      selectedOptions[questionId] !== undefined;
    const isDropdownOpen = openDropdownId === questionId;

    const handleToggleDropdown = (option) => {
      const nextId = navigateNextQuestion({
        values: Object.values(selectedOptions),
        questionId,
      });
      setOpenDropdownId(isDropdownOpen ? (option ? nextId : null) : questionId);
    };

    const questionParts = question.question.split("<COMPONENT>");
    const selectComponent =
      question.field === "input" ? (
        <input
          type={question.type}
          className="form-input w-auto"
          name={question.name}
          placeholder="https://example.com"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleOptionChange({
                questionId,
                selectedValue: e.target.value,
                isCheckbox: false,
              });
              handleToggleDropdown(e.target.value);
            }
          }}
        />
      ) : (
        <OnboardingSelect
          className={question.className}
          options={options}
          type={question.type || "select"}
          onSelect={(option) =>
            handleOptionChange({
              questionId,
              selectedValue: option,
              isCheckbox: question.type === "checkbox",
            })
          }
          isDropdownOpen={isDropdownOpen}
          onToggle={handleToggleDropdown}
        />
      );

    return (
      isVisible && (
        <div key={questionId} className="items-center space-x-5">
          <div className="flex items-center space-x-5">
            <div>
              <span className="text-lg font-medium text-dark dark:text-darkmode-light inline-block">
                {questionParts[0]}
              </span>{" "}
              {selectComponent}{" "}
              <span className="text-lg font-medium text-dark dark:text-darkmode-light">
                {questionParts[1]}
              </span>
            </div>
          </div>
        </div>
      )
    );
  };

  const isEndOfQuestions =
    currentQuestionId === -1 || currentQuestionId === questions.length;

  return (
    <Base
      title={frontmatter.title}
      description={frontmatter.description}
      meta_title={frontmatter.meta_title}
      image={frontmatter.image}
    >
      <MobileSidebar />
      <section className="bg-theme-light dark:bg-darkmode-theme-light min-[1045px]:py-6">
        <div
          className={`min-[1045px]:max-w-[850px] w-full bg-body mx-auto rounded sm:p-10 p-8 dark:bg-darkmode-body ${!isComplete ? "min-h-[450px]" : ""}`}
        >
          {isComplete ? (
            <CompeleteForm />
          ) : (
            <>
              <div className="rounded border-primary/20 dark:border-darkmode-border border bg-theme-light dark:bg-darkmode-body flex items-center p-3 mt-5 sm:mt-8 sm:space-x-5 space-x-3">
                <div className="bg-primary/5 dark:bg-darkmode-primary/30 rounded p-1 size-10 flex items-center justify-center">
                  <Image
                    width={24}
                    height={24}
                    src={"/images/icons/search-magnify.svg"}
                    alt="search"
                  />
                </div>

                <p className="font-bold max-sm:text-sm text-base text-dark dark:text-darkmode-dark">
                  {Object.keys(selectedOptions).length
                    ? `We found ${matchThemes.length} themes that best match your
                selections.`
                    : "Select your preferences"}
                </p>
              </div>

              <div className="space-x-2 flex *:flex-1 mt-8">
                {!isEndOfQuestions &&
                  [...Array(questions.length)].map((_, index) => (
                    <span
                      key={index}
                      className={`${
                        index < currentQuestionId ? "bg-primary" : "bg-gray-300"
                      } h-1.5 rounded inline-block`}
                    />
                  ))}
              </div>

              <form className="space-y-4 mt-5" onSubmit={handleSubmit}>
                {isEndOfQuestions ? (
                  <ContactForm
                    isPending={isloading}
                    finder={finder}
                    matchThemes={
                      matchThemes.length > 0
                        ? matchThemes
                        : ssgAndCategoryFilterTheme
                    }
                  />
                ) : (
                  questions?.map((question) => renderQuestion(question.id))
                )}
              </form>
            </>
          )}
        </div>
      </section>
    </Base>
  );
}

export const getServerSideProps = async (context) => {
  const data = await getListPage("content/landing-pages/theme-finder.md");
  const getQuestions = await getSinglePageServer(
    "content/theme-finder",
    "_index",
  );
  return {
    props: {
      questions: getQuestions?.frontmatter.questions,
      ...data,
    },
  };
};

function CompeleteForm() {
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
}

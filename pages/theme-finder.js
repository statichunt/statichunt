import ContactForm from "@/components/contactForm";
import OnboardingSelect from "@/components/OnboardingSelect";
import themes from "@/json/theme-finder.json";
import Base from "@/layouts/Baseof";
import MobileSidebar from "@/partials/MobileSidebar";
import Axios from "axios";
import { getSinglePageServer } from "lib/contentParser";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";

const OnboardingPage = ({ questions }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [currentQuestionId, setCurrentQuestionId] = useState(
    questions[0]?.id || 1,
  );

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

  const handleOptionChange = ({ selectedValue, questionId, isCheckbox }) => {
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
    const submissionData = {};

    Object.entries(selectedOptions).forEach(([questionId, selectedValue]) => {
      const question = questions.find((q) => q.id === parseInt(questionId));
      if (question) {
        submissionData[question.name] = Array.isArray(selectedValue)
          ? selectedValue
          : [selectedValue];
      }
    });

    const reqBody = { ...submissionData, user_id: userState?.users?.id };

    try {
      const res = await Axios.post(`user-persona`, reqBody, {
        headers: {
          authorization: `Bearer ${session?.user?.accessToken}`,
        },
      });
      if (res.status === 200) {
        router.push("/dashboard/downloads");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      if (
        error?.response?.status === 401 ||
        error?.response?.data?.message === "jwt expired"
      ) {
      }
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
    currentQuestionId === -1 || currentQuestionId === questions.length - 1;

  return (
    <Base>
      <MobileSidebar />
      <section className="bg-theme-light dark:bg-darkmode-theme-light min-[1045px]:py-6">
        <div className="min-[1045px]:max-w-[850px] w-full bg-body mx-auto rounded sm:p-10 p-8 dark:bg-darkmode-body min-h-[450px]">
          <div className="container">
            <div className="mx-auto">
              <p className="font-bold max-sm:text-sm text-base text-dark dark:text-darkmode-dark">
                {Object.keys(selectedOptions).length
                  ? `We found ${matchThemes.length} themes that best match your
                selections.`
                  : "Select your preferences"}
              </p>
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
                  <ContactForm />
                ) : (
                  questions?.map((question) => renderQuestion(question.id))
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </Base>
  );
};

export default OnboardingPage;

export const getServerSideProps = async (context) => {
  const getQuestions = await getSinglePageServer(
    "content/theme-finder",
    "_index",
  );
  return { props: { questions: getQuestions?.frontmatter.questions } };
};

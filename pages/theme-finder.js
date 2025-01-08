import { createStepper } from "@/components/theme-finder/Stepper";
import { useThemeFinder } from "@/components/theme-finder/themeFinderProvider";
import withQuizProvider from "@/components/theme-finder/withFinder";
import themes from "@/json/theme-finder.json";
import Base from "@/layouts/Baseof";
import axios from "axios";
import { sortByWeight } from "lib/utils/sortFunctions";
import Image from "next/image";
import { startTransition, useEffect, useState, useTransition } from "react";
import { FiLoader } from "react-icons/fi";

function Quiz() {
  const finder = useThemeFinder();
  const steppers = createStepper();
  const ActiveStepper = steppers.find((step) => step.id === finder.activeQuiz);
  const [isPending, startLoading] = useTransition();
  const [matchThemes, setMatchTheme] = useState(themes);

  useEffect(() => {
    startTransition(() => {
      const newMatchThemes = themes.filter((theme) => {
        const {
          ssg = [],
          category,
          features = [],
          cms = [],
        } = finder.value || {};

        // Check for ssg match
        const ssgMatch = ssg.filter((ssg) => ssg).length
          ? theme.ssg?.some((themeSsg) => ssg.includes(themeSsg))
          : true;

        // Check for category match
        const categoryMatch = category
          ? theme.category?.includes(category) || theme?.category?.length === 0
          : true;

        // Check for features match
        const featuresMatch =
          Array.isArray(features) && features.length
            ? theme.features?.some((feature) => features.includes(feature))
            : true;

        // Check for cms match
        const cmsMatch =
          Array.isArray(cms) && cms.filter((cms) => cms).length
            ? theme.cms?.some((cmsItem) => cms.includes(cmsItem))
            : true;

        // Return theme if all conditions are matched
        return ssgMatch && categoryMatch && featuresMatch && cmsMatch;
      });

      setMatchTheme(matchThemes);
    });
  }, [JSON.stringify(finder.value)]);

  const handleSubmit = (e) => {
    e.preventDefault();
    startLoading(async () => {
      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/user-lead`,
          {
            ...finder.value,
            themes: sortByWeight(matchThemes, "weight").slice(0, 10),
          },
          {
            headers: {
              authorization_token: `${process.env.NEXT_PUBLIC_TOKEN}`,
            },
          },
        );
        finder.nextStep();
      } catch (error) {}
    });
  };

  return (
    <Base>
      <section className="bg-theme-light dark:bg-darkmode-theme-light section">
        <form
          onSubmit={handleSubmit}
          className="max-w-[872px] w-full bg-body mx-auto rounded sm:p-16 p-8 dark:bg-darkmode-body"
        >
          <ActiveStepper.component />
          <div className="text-right mt-5 sm:mt-8 flex sm:justify-between flex-wrap gap-4 items-center justify-center">
            {finder.activeQuiz !== 1 &&
              finder.activeQuiz < steppers.length - 1 && (
                <button
                  type="button"
                  onClick={finder.previousStep}
                  className="btn btn-outline-primary font-bold max-sm:w-full group"
                >
                  <span className="text-gradient-primary">
                    Previous Question
                  </span>
                </button>
              )}

            {finder.activeQuiz < steppers.length - 1 && (
              <button
                type="button"
                disabled={!(ActiveStepper.name in finder.value)}
                onClick={finder.nextStep}
                className="btn btn-outline-primary font-bold sm:ml-auto max-sm:w-full disabled:text-white group"
              >
                <span className="text-gradient-primary">Next Question</span>
              </button>
            )}

            {finder.activeQuiz === steppers.length - 1 && (
              <button
                className="btn btn-outline-primary ml-auto"
                type="submit"
                disabled={isPending}
              >
                {isPending && <FiLoader className="animate-spin mr-2 size-4" />}
                Submit
              </button>
            )}
          </div>

          {finder.activeQuiz !== 1 && finder.activeQuiz !== steppers.length && (
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
                We found {matchThemes.length} themes
              </p>
            </div>
          )}
        </form>
      </section>
    </Base>
  );
}

export default withQuizProvider(Quiz);

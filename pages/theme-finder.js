import { createStepper } from "@/components/theme-finder/Stepper";
import { useThemeFinder } from "@/components/theme-finder/themeFinderProvider";
import withQuizProvider from "@/components/theme-finder/withFinder";
import themes from "@/json/theme-finder.json";
import Base from "@/layouts/Baseof";
import axios from "axios";
import useOs from "hooks/useOs";
import countryDetector from "lib/utils/countryDetector";
import { sortByWeight } from "lib/utils/sortFunctions";
import Image from "next/image";
import { useMemo, useTransition } from "react";
import { FiLoader } from "react-icons/fi";
import { getCookie } from "react-use-cookie";

function Quiz() {
  const country = countryDetector();
  const finder = useThemeFinder();
  const steppers = createStepper();
  const ActiveStepper = useMemo(() => {
    return steppers.find((step) => step.id === finder.activeQuiz);
  }, [finder.activeQuiz]);
  const [isPending, startLoading] = useTransition();
  const { platForm: device } = useOs();

  const { matchThemes, ssgAndCategoryFilterTheme } = useMemo(() => {
    const { ssg = [], category, features = [], cms = [] } = finder.value || {};

    const ssgAndCategoryFilterTheme = themes.filter((theme) => {
      // Check for ssg match
      const ssgMatch = ssg.filter((ssg) => ssg).length
        ? theme.ssg?.some((themeSsg) =>
            ssg.some(
              (s) => s.toLowerCase().indexOf(themeSsg.toLowerCase()) !== -1,
            ),
          )
        : true;
      // Check for category match
      const categoryMatch = category
        ? theme.category?.some((c) => c.toLowerCase().indexOf(category) !== -1)
        : true;

      return ssgMatch && categoryMatch;
    });

    const newMatchThemes = ssgAndCategoryFilterTheme.filter((theme) => {
      // Check for features match
      const featuresMatch =
        Array.isArray(features) && features.filter((feature) => feature).length
          ? theme.features?.some((feature) =>
              features.some(
                (f) => f.toLowerCase().indexOf(feature.toLowerCase()) !== -1,
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
  }, [JSON.stringify(finder.value)]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const first_visit = getCookie("welcomeDate");
    const landing_page = getCookie("welcomeLandingPage");
    const referrer = getCookie("welcomeReferrer");

    startLoading(async () => {
      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/user-lead`,
          {
            ...finder.value,
            ssg: finder.value.ssg.filter((ssg) => ssg),
            cms: finder.value.cms.filter((cms) => cms),
            features: finder.value.features.filter((feature) => feature),
            country,
            first_visit,
            landing_page,
            referrer,
            device,
            themes: sortByWeight(
              matchThemes.length > 0 ? matchThemes : ssgAndCategoryFilterTheme,
              "weight",
            )
              .slice(0, 10)
              .map((theme) => theme.slug),
          },
          {
            headers: {
              authorization_token: `${process.env.NEXT_PUBLIC_TOKEN}`,
            },
          },
        );
        finder.nextStep();
      } catch (error) {
        console.log(error);
      }
    });
  };

  const isValidate = useMemo(() => {
    const currentValue = finder.value[ActiveStepper.name];
    return Array.isArray(currentValue)
      ? currentValue.length <= 0
      : !finder.value[ActiveStepper.name];
  }, [JSON.stringify(finder.value), ActiveStepper.name]);

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
                disabled={isValidate}
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

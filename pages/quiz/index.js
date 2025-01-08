import QuizProvider, { useQuiz } from "@/components/quiz/quiz-provider";
import { createStepper } from "@/components/quiz/stepper";
import withQuizProvider from "@/components/quiz/with-quiz";
import Base from "@/layouts/Baseof";
import { getListPage } from "lib/contentParser";
import Image from "next/image";

function Quiz({ quizContent }) {
  const quiz = useQuiz();
  const steppers = createStepper({ questions: quizContent.questions });
  const ActiveStepper = steppers.find((step) => step.id === quiz.activeQuiz);

  let matchThemes = [];

  // useEffect(() => {
  //   startTransition(() => {
  //     const newMatchThemes = themes.filter(
  //       (theme) => {
  //         const { ssg =[] } = quiz.value || { };
  //         if(ssg.length){
  //          return  theme.ssg(themeSsg => ssg.some(s => themeSsg === s))
  //         }
  //         return true;
  //       }
  //     );
  //     setMatchTheme(newMatchThemes);
  //   });
  // }, [JSON.stringify(quiz.value)]);

  return (
    <Base {...quizContent}>
      <QuizProvider>
        <section className="bg-theme-light section">
          <div className="max-w-[872px] w-full bg-body mx-auto rounded p-16">
            <ActiveStepper.component quizContent={quizContent} />
            <div className="text-right mt-8 flex justify-between">
              <button
                onClick={quiz.previousStep}
                className="btn btn-outline-primary"
              >
                Previous Question
              </button>
              <button
                onClick={quiz.nextStep}
                className="btn btn-outline-primary"
              >
                Next Question
              </button>
            </div>

            <div className="rounded border-primary/20 border bg-theme-light flex items-center p-3 mt-8 space-x-5">
              <div className="bg-primary/5 rounded p-1 size-10 flex items-center justify-center">
                <Image
                  width={24}
                  height={24}
                  src={"/images/icons/search-magnify.svg"}
                  alt="search"
                />
              </div>
              <p className="font-bold text-base text-dark">
                We found {matchThemes.length} themes
              </p>
            </div>
          </div>
        </section>
      </QuizProvider>
    </Base>
  );
}

export const getStaticProps = async () => {
  const quizContent = await getListPage("content/quiz/_index.md");
  return {
    props: {
      quizContent: quizContent.frontmatter,
    },
  };
};

export default withQuizProvider(Quiz);

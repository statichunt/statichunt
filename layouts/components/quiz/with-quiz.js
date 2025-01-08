import QuizProvider from "./quiz-provider";

const withQuizProvider = (WrappedComponent) => {
  return function WithQuizProvider(props) {
    return (
      <QuizProvider>
        <WrappedComponent {...props} />
      </QuizProvider>
    );
  };
};

export default withQuizProvider;

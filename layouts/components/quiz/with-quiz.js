import QuizProvider from "./quiz-provider";

const withQuizProvider = (WrappedComponent, ...rest) => {
  console.log(rest);
  return function WithQuizProvider(props) {
    return (
      <QuizProvider>
        <WrappedComponent {...props} />
      </QuizProvider>
    );
  };
};

export default withQuizProvider;

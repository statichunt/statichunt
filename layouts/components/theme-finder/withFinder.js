import QuizProvider from "./themeFinderProvider";

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

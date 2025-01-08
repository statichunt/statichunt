import React, { useContext, useReducer } from "react";

// Create the context
const QuizContext = React.createContext();

// Define action types
const SET_ACTIVE_QUIZ = "SET_ACTIVE_QUIZ";
const SET_VALUE = "SET_VALUE";
const NEXT_STEP = "NEXT_STEP";
const PREVIOUS_STEP = "PREVIOUS_STEP";

// Reducer function to handle state changes
function quizReducer(state, action) {
  switch (action.type) {
    case SET_ACTIVE_QUIZ:
      return {
        ...state,
        activeQuiz: action.payload,
      };
    case SET_VALUE:
      return {
        ...state,
        value: {
          ...state.value,
          ...action.payload,
        },
      };
    case NEXT_STEP:
      return {
        ...state,
        activeQuiz: state.activeQuiz + 1,
      };
    case PREVIOUS_STEP:
      return {
        ...state,
        activeQuiz: state.activeQuiz - 1,
      };
    default:
      return state;
  }
}

export function useQuiz() {
  const store = useContext(QuizContext);
  if (!store) {
    throw new Error("useProvider must be used within a filter context");
  }
  return store;
}

// QuizProvider component
export default function QuizProvider({ children }) {
  const initialState = {
    activeQuiz: 1,
    value: {},
  };

  // Initialize useReducer with the reducer function and initial state
  const [state, dispatch] = useReducer(quizReducer, initialState);

  // Action creators
  const setActiveQuiz = () => {
    dispatch({ type: SET_ACTIVE_QUIZ, payload: initialState.activeQuiz + 1 });
  };

  const setValue = (newValue) => {
    dispatch({ type: SET_VALUE, payload: newValue });
  };

  const nextStep = () => {
    dispatch({ type: NEXT_STEP });
  };
  const previousStep = () => {
    dispatch({ type: PREVIOUS_STEP });
  };

  return (
    <QuizContext.Provider
      value={{
        ...state,
        setActiveQuiz,
        setValue,
        nextStep,
        previousStep,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

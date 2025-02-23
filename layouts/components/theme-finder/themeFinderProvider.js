import React, { useContext, useReducer } from "react";

// Create the context
const QuizContext = React.createContext();

// Define action types
const SET_ACTIVE_QUIZ = "SET_ACTIVE_QUIZ";
const SET_VALUE = "SET_VALUE";
const NEXT_STEP = "NEXT_STEP";
const PREVIOUS_STEP = "PREVIOUS_STEP";

// Reducer function to handle state changes
function findReducer(state, action) {
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
    case PREVIOUS_STEP: {
      const values = state.value;
      const keys = Object.keys(values);
      const currentKey = action.payload;
      const formsData = ["first_name", "last_name", "email"];

      if (currentKey === "from") {
        const newKeys = keys.filter((key) => !formsData.includes(key));
        const newValues = newKeys.reduce((acc, key) => {
          acc[key] = values[key];
          return acc;
        }, {});

        return {
          ...state,
          activeQuiz: state.activeQuiz - 1,
          value: newValues,
        };
      }

      const currentValues = keys.reduce((acc, curr) => {
        if (curr === currentKey) {
          return acc;
        }

        return { ...acc, [curr]: values[curr] };
      }, {});

      return {
        ...state,
        value: currentValues,
        activeQuiz: state.activeQuiz - 1,
      };
    }
    default:
      return state;
  }
}

export function useThemeFinder() {
  const store = useContext(QuizContext);
  if (!store) {
    throw new Error("useThemeFinder must be used within a QuizProvider");
  }
  return store;
}

// QuizProvider component
export default function QuizProvider({ children }) {
  const initialState = {
    activeQuiz: 1,
    value: {}, // Empty initial value
  };

  // Initialize useReducer with the reducer function and initial state
  const [state, dispatch] = useReducer(findReducer, initialState);

  // Action creators
  const setActiveQuiz = (quizNumber) => {
    dispatch({ type: SET_ACTIVE_QUIZ, payload: quizNumber });
  };

  const setValue = (newValue) => {
    dispatch({ type: SET_VALUE, payload: newValue });
  };

  const nextStep = () => {
    dispatch({ type: NEXT_STEP });
  };

  const previousStep = (currentKey) => {
    dispatch({ type: PREVIOUS_STEP, payload: currentKey });
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

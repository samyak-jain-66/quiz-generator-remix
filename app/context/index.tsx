import React, { createContext, useContext, useReducer, ReactNode } from "react";

// Define the shape of the state and actions
type StateType = {
  count: number;
  formData: any[];
};

type ActionType =
  | { type: "INCREMENT" }
  | { type: "DECREMENT" }
  | { type: "UPDATE_FORM_DATA"; value: any };

type AppContextType = {
  state: StateType;
  dispatch: React.Dispatch<ActionType>;
};

// Initial state
const initialState: StateType = {
  count: 0,
  formData: [],
};

// Reducer function
const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 };
    case "DECREMENT":
      return { ...state, count: state.count - 1 };
    case "UPDATE_FORM_DATA":
      return { ...state, formData: [...state.formData, action.value] };
    default:
      return state;
  }
};

// Create the context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Context Provider component
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the AppContext
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

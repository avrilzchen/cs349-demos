import { createContext } from "preact";

// defines what state to store in context
export type CountContextType = {
  count: number;
  setCount: (count: number) => void;
  colour: string;
};

// create an empty context
export const CountContext = createContext({} as CountContextType);

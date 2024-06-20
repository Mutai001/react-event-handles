import React, { createContext, useReducer, ReactNode, Dispatch } from 'react';
import { jokeReducer, initialState, State, Action } from './JokeReducer';

interface JokeProviderProps {
  children: ReactNode;
}

interface JokeContextProps {
  state: State;
  dispatch: Dispatch<Action>;
}

export const JokeContext = createContext<JokeContextProps | undefined>(undefined);

export const JokeProvider = ({ children }: JokeProviderProps) => {
  const [state, dispatch] = useReducer(jokeReducer, initialState);

  return (
    <JokeContext.Provider value={{ state, dispatch }}>
      {children}
    </JokeContext.Provider>
  );
};

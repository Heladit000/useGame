import React, { createContext, useReducer} from "react";
import GameReducer from "../reducers/gameReducer";
import defaultGameState from "../config/gameState";

const gameContext = createContext();

const GameContextProvider = ({ children }) => {

  //Create a global reducer with a global state and global dispatch
  const [gameState, dispatch] = useReducer(GameReducer, defaultGameState);

  return (
    <gameContext.Provider value={[gameState, dispatch]}>
      {children}
    </gameContext.Provider>
  );
};

export { GameContextProvider, gameContext };

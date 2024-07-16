import useGameLogic from "../hooks/gameLogic";

/* I know, put a customHook inside a reducer it's not the best idea, but
its only for use hooks in this project */

const GameReducer = (state, action) => {

  //Create a copy of the actual state
  const newState = { ...state };

  //Get the useGameLogic hook with the actual state
  const {
    assignCanvas,
    getMaxScore,
    updateMaxScore,
    resetGame,
    startGame,
    createObjetive,
    checkCollision,
    endGame,
  } = useGameLogic(newState);

  //Handle reducer dispatch
  switch (action.type) {
    case "assign_canvas": {
      assignCanvas(action.canvas);
      resetGame();

      return newState;
    }
    case "get_max_score": {
      getMaxScore();

      return newState;
    }
    case "update_max_score": {
      updateMaxScore();

      return newState;
    }
    case "reset_game": {
      resetGame();

      return newState;
    }
    case "start_game": {
      startGame();

      return newState;
    }
    case "change_objetive": {
      createObjetive();

      return newState;
    }
    case "click_event": {
      checkCollision(action.mousePosition);

      return newState;
    }
    case "reset_block": {
      newState.blocked = false;

      return newState;
    }
    case "change_objetive_time": {
      newState.objetiveTime = action.objetiveTime;

      return newState;
    }
    case "change_health": {
      newState.health = action.health;

      return newState;
    }
    case "game_over": {
      endGame();

      return newState;
    }

    default:
      return state;
  }
};

export default GameReducer;

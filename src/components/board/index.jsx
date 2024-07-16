//Loops and events for game

import { useContext, useEffect, useRef } from "react";
import { gameContext } from "../../contexts/gameContext";

import "./style/board.css";

const Board = () => {
  const canvasRef = useRef();

  const intervalObjetiveRef = useRef();
  const intervalHealthRef = useRef();

  const infoRef = useRef();

  const [state, dispatch] = useContext(gameContext);

  //Pass the canvas to the reducer
  useEffect(() => {
    dispatch({
      type: "assign_canvas",
      canvas: canvasRef.current,
    });
  }, [dispatch]);

  useEffect(() => {
    if (state.started) {
      //Recursive function
      //When the game starts create a objetive every (state.objetiveTime) time
      const handleChangeObjetive = () => {
        if (!state.ended) {
          //Dispatch the event to the reducer
          dispatch({
            type: "change_objetive",
          });

          //Update the current value of reference to stop the interval outside
          intervalObjetiveRef.current = setTimeout(
            handleChangeObjetive,
            state.objetiveTime
          );
        }
      };

      //Call for first time
      handleChangeObjetive();
    }

    return () => {
      clearInterval(intervalObjetiveRef.current);
    };
  }, [state.started, state.ended, state.objetiveTime, dispatch]);

  useEffect(() => {
    if (state.started) {
      //Create a interval to control the health and accessing it outside
      intervalHealthRef.current = setInterval(() => {
        //If the health is 0 dispatch game over and check the max score to update it
        if (state.health === 0) {
          dispatch({
            type: "game_over",
          });

          dispatch({
            type: "update_max_score",
          });

          //Reset the health interval and the changeObjetive interval
          resetIntervals();
        } else {
          //Quit one unit to the health every 50ms
          dispatch({
            type: "change_health",
            health: state.health - 1,
          });
        }
      }, 50);
    }

    return () => {
      clearInterval(intervalHealthRef.current);
    };
  }, [state.started, state.health, dispatch]);

  const resetIntervals = () => {
    //Clear all intervals using his refs
    clearInterval(intervalObjetiveRef.current);
    clearInterval(intervalHealthRef.current);
  };

  const handleCanvasClick = (e) => {
    //Get the mouse or touch coordinates in the canvas
    //https://stackoverflow.com/questions/17130395/real-mouse-position-in-canvas

    const rect = state.board.canvas.getBoundingClientRect();

    const normalizedMousePosition = {
      x:
        ((e.clientX - rect.left) / (rect.right - rect.left)) *
        state.board.canvas.width,
      y:
        ((e.clientY - rect.top) / (rect.bottom - rect.top)) *
        state.board.canvas.height,
    };

    dispatch({
      type: "click_event",
      mousePosition: normalizedMousePosition,
    });
  };

  const handleStart = () => {
    //Dispatch the start actions and hide the menu
    dispatch({
      type: "reset_game",
    });
    dispatch({
      type: "start_game",
    });

    infoRef.current.style.display = "none";
  };

  return (
    <section className="board">
      <div
        className="board__health"
        style={{
          width: `${state.health}%`,
          background: state.board.colors.pointColor,
        }}
      ></div>
      <canvas
        className="board__canvas"
        ref={canvasRef}
        width={state.board.size}
        height={state.board.size}
        onMouseDown={handleCanvasClick}
      ></canvas>
      {(!state.started || state.ended) && (
        <div className="board__info" onClick={handleStart} ref={infoRef}>
          {state.ended && (
            <span>
              <h1>
                GAME OVER, you do {state.score}{" "}
                {state.score === 1
                  ? "point"
                  : state.score === 0
                  ? "points jaja"
                  : "points"}
                !
              </h1>
            </span>
          )}
          <h1>
            Click here <br></br> to start the game
          </h1>
        </div>
      )}
    </section>
  );
};

export default Board;

import defaultGameState from "../config/gameState";
import * as Tone from "tone";

//Create a "Poly virtual instrument"
const synth = new Tone.PolySynth().toDestination();

// A "customHook" to provide the principal logic of the game
//The loops are in board component

//The hook receive the state of the reducer to update it directly
const useGameLogic = (state) => {
  //Array of Musical notes in C Major scale
  const notes = ["C", "D", "E", "F", "G", "A", "B"];

  function assignCanvas(canvas) {
    //Set the canvas
    state.board.canvas = canvas;
    state.board.ctx = canvas.getContext("2d");

    //Start the Tone library
    Tone.start();
  }

  //Get the maxScore from local storage, if is 0, set the localStorage variable
  function getMaxScore() {
    const localScore = localStorage.getItem("score") || 0;

    if (localScore === 0) {
      localStorage.setItem("score", localScore);
    }

    state.maxScore = localScore;
  }

  //If the score is bigger than maxScore, update it
  function updateMaxScore() {
    if (state.score > state.maxScore) {
      localStorage.setItem("score", state.score);
      state.maxScore = state.score;
    }
  }

  function resetGame() {
    /*From the gameState.js file in config reset the variables
    but not canvas,ctx and maxScore*/
    const newState = {
      ...defaultGameState,
      board: {
        ...defaultGameState.board,
        canvas: state.board.canvas,
        ctx: state.board.ctx,
        maxScore: state.maxScore,
      },
    };

    //Clean the canvas
    newState.board.ctx.clearRect(
      0,
      0,
      newState.board.canvas.width,
      newState.board.canvas.height
    );

    //Replace the actual state of the reducer with the new state
    Object.assign(state, newState);
  }

  function startGame() {
    state.started = true;
    state.pause = false;

    //Clean the canvas
    state.board.ctx.clearRect(
      0,
      0,
      state.board.canvas.width,
      state.board.canvas.height
    );
  }

  function createObjetive() {
    const margin = 50;

    //Create a random size objetive in random position minus the margin
    const randomPosition = {
      x: randomInRange(margin, state.board.canvas.width - margin),
      y: randomInRange(margin, state.board.canvas.height - margin),
      size: randomInRange(10, 30),
    };

    //Clean the canvas
    state.board.ctx.clearRect(
      0,
      0,
      state.board.canvas.width,
      state.board.canvas.height
    );

    //Update the objetive position in the state of reducer
    state.objetivePosition = randomPosition;

    state.board.canvas.style.background = state.board.colors.bgColor;

    //The player is not blocked now for one click
    state.blocked = false;

    drawObjetive();
  }

  function checkCollision(mousePosition) {
    //If the player ir not blocked for a oneClick
    if (!state.blocked) {
      if (evaluateCollisionCondition(mousePosition)) {
        winPoint();
      } else {
        losePoint();
      }

      drawObjetive();
      state.blocked = true;
    }
  }

  function evaluateCollisionCondition(mousePosition) {
    
    /*If is a mobile screen, set more radius for win a point
    Because touch the objective with a finger is not accurate */
    const radius = window.innerHeight <= 767 ? 20 : 0;

    /*Check if the click position its the same as the objective using
    a range, for the init coordinate from th objetive to the last */
    if (
      mousePosition.x + radius >= state.objetivePosition.x &&
      mousePosition.x - radius <=
        state.objetivePosition.x + state.objetivePosition.size &&
      mousePosition.y + radius >= state.objetivePosition.y &&
      mousePosition.y - radius <=
        state.objetivePosition.y + state.objetivePosition.size
    ) {
      return true;
    }

    return false;
  }
  function winPoint() {

    //Play a random note in 4 tone with a duration of 8n 
    synth.triggerAttackRelease(
      notes[randomInRange(0, notes.length - 1)] + "4",
      "8n"
    );

    //Update the fillStyle with win point colors
    state.board.ctx.fillStyle = state.board.colors.pointColor;
    state.board.canvas.style.background = state.board.colors.BgPointColor;

    //Reset the health and win one point
    state.health = 100;
    state.score += 1;

    //Reduce the time that enemy appears
    if (state.objetiveTime > 100) {
      state.objetiveTime -= state.changeObjetiveTime;
    }
  }

  function losePoint() {
    //Play a random note in 2 tone with a duration of 8n 
    synth.triggerAttackRelease(
      notes[randomInRange(0, notes.length - 1)] + "2",
      "8n"
    );

    //Update the fillStyle with lose point colors
    state.board.ctx.fillStyle = state.board.colors.missColor;
    state.board.canvas.style.background = state.board.colors.BgMissColor;
  }

  function drawObjetive() {
    //Draw the objetive in random position
    state.board.ctx.fillRect(
      state.objetivePosition.x,
      state.objetivePosition.y,
      state.objetivePosition.size,
      state.objetivePosition.size
    );

    //Update the fill style with normal objetive color
    state.board.ctx.fillStyle = state.board.colors.objetiveColor;
  }

  function endGame() {
    state.ended = true;
    state.started = false;

    //Clear the canvas
    state.board.ctx.clearRect(
      0,
      0,
      state.board.canvas.width,
      state.board.canvas.height
    );

    //Play the end note
    synth.triggerAttackRelease("C3", 1.2);
  }

  //Get random number in range
  //https://www.grepper.com/answers/322930/random+in+range+js
  function randomInRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  return {
    assignCanvas,
    getMaxScore,
    updateMaxScore,
    resetGame,
    startGame,
    createObjetive,
    checkCollision,
    endGame,
  };
};

export default useGameLogic;

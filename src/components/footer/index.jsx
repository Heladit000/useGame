import React, { useContext, useEffect, useState } from "react";
import Gameplay from "./images/gameplay.gif";

import "./style/Footer.css";
import { gameContext } from "../../contexts/gameContext";
const Footer = () => {
  const [state] = useContext(gameContext);

  const [modal, setModal] = useState(false);

  useEffect(() => {
    //Hide the modal if the game started or ended
    if (state.started || state.ended) {
      setModal(false);
    }
  }, [state.started, state.ended]);

  const handleModal = () => {
    //Toggle the modal view
    setModal(!modal);
  };

  return (
    <footer className="footer-container">
      <div className="footer__info">
        <h5 className="footer__info--how-to-play" onClick={handleModal}>
          How to play?
        </h5>
        <h5>©Nicolás Prieto</h5>
        <h5 className="footer__info--github">
          <a href="https://github.com/Heladit000/useGame" target="_blank" rel="noreferrer">Check me on GitHub</a>
        </h5>
      </div>

      {modal && (
        <div className="footer__modal">
          <h1 className="footer__modal--title">How to play?</h1>
          <p className="footer__modal--text">
            Press the squares before the health bar runs out
          </p>
          <img className="footer__modal--image" src={Gameplay} alt="gameplay" />
          <button onClick={handleModal} className="footer__modal--button">
            Got it
          </button>
        </div>
      )}
    </footer>
  );
};

export default Footer;

import { useContext, useEffect } from "react";
import { gameContext } from "../../contexts/gameContext";
import "./style/Header.css";

const Header = () => {
  const [state, dispatch] = useContext(gameContext);

  useEffect(() => {
    //Get the max score from a reducer
    //Because the reducer calls localStorage
    dispatch({
      type: "get_max_score",
    });
  }, [dispatch]);

  return (
    <header className="header">
      <h1 className="header__title">useGame</h1>
      <section className="header__score">
        <h1>score: {state.score}</h1>
        <h1>maxScore: {state.maxScore}</h1>
      </section>
    </header>
  );
};

export default Header;

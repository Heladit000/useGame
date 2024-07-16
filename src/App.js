import Board from './components/board';
import Footer from './components/footer';
import Header from './components/header';
import { GameContextProvider } from './contexts/gameContext';
import "./styles/App.css";

function App() {
  return (
    <div className="menu-container">
      <GameContextProvider>
        <Header />
        <Board />
        <Footer/>
      </GameContextProvider>
    </div>
  );
}


export default App;

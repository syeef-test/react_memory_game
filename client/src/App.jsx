import { useState, useEffect } from "react";

import "./App.css";

const colourlist = ["Red", "Green", "Blue", "Yellow", "Orange", "Pink"];

function App() {
  const [cards, setCards] = useState([]);
  const [score, setScore] = useState(0);
  const [hintCounter, setHintCounter] = useState(3);
  const [moves, setMoves] = useState(0);

  const startGame = () => {
    const duplicateCardList = colourlist.concat(colourlist); //to compare two cards
    // console.log(duplicateCardList);

    const newGameList = [];
    while (newGameList.length < colourlist.length * 2) {
      let randomIndex = Math.floor(Math.random() * duplicateCardList.length); //geting random index from list
      // console.log(randomIndex);
      newGameList.push({
        colourCard: duplicateCardList[randomIndex],
        flipped: false,
        solved: false,
        position: newGameList.length,
      });
    }
    setCards(newGameList);
  };

  // console.log(cards);

  useEffect(() => {
    startGame();
  }, []);
  return (
    <main>
      <h1>Memory Game</h1>

      <div>
        <h2>Score:0</h2>

        <button>Hint</button>
      </div>

      <div className="container">
        {cards.map((card, index) => (
          <div className="flip-card" key={index}>
            <div className="flip-card-inner">
              <div className="flip-card-front"></div>
              <div className="flip-card-back">{card.colourCard}</div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;

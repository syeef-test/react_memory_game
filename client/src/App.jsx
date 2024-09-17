import { useState, useEffect, useRef } from "react";

import "./App.css";

const colourlist = ["Red", "Green", "Blue", "Yellow", "Orange", "Pink"];

function App() {
  const [cards, setCards] = useState([]);
  const [score, setScore] = useState(0);
  const [hintCounter, setHintCounter] = useState(3);
  const [moves, setMoves] = useState(0);

  let timeout = useRef();

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

      //to make sure no card is repeated twice when clicked on card
      duplicateCardList.splice(randomIndex, 1);
    }
    setCards(newGameList);
  };

  // console.log(cards);

  useEffect(() => {
    startGame();
  }, []);

  const handleActiveCard = (card) => {
    // const flippedCards = cards.filter((data) => data.flipped && !data.solved);
    // console.log(flippedCards);
    // console.log("card", card);

    // if (flippedCards.length === 2) return;

    const newCards = cards.map((carddata) => {
      if (carddata.position === card.position) {
        carddata.flipped = !carddata.flipped;
      }
      return carddata;
    });
    setCards(newCards);
    setMoves((prevMoves) => prevMoves + 1);
  };

  // console.log("moves:", moves);

  const gameLogic = () => {
    const flippedCards = cards.filter((data) => data.flipped && !data.solved);
    if (flippedCards.length === 2) {
      timeout.current = setTimeout(() => {
        setCards(
          cards.map((card) => {
            if (
              card.position === flippedCards[0].position ||
              card.position === flippedCards[1].position
            ) {
              //comapre two selected card
              if (flippedCards[0].colourCard === flippedCards[1].colourCard) {
                card.solved = true;
                setScore(score + 10); //add score if it is correct
              } else {
                card.flipped = false;
                if (score > 0) {
                  setScore(score - 5);
                }
              }
            }
            return card;
          })
        );
      }, 800);
    }
  };

  useEffect(() => {
    gameLogic();
    return () => clearTimeout(timeout.current);
  }, [cards]);

  return (
    <main>
      <h1>Memory Game</h1>

      <div className="scorecontent">
        <h2>Score:{score}</h2>

        <button className="hint-button">Hint</button>
      </div>

      <div className="container">
        {cards.map((card, index) => (
          <div
            className={`flip-card ${card.flipped ? "active" : ""}`}
            key={index}
            onClick={() => handleActiveCard(card)}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front"></div>
              <div className="flip-card-back">{card.colourCard}</div>
            </div>
          </div>
        ))}
        <div className="hint-counter">Hints Remaining:0</div>
      </div>
    </main>
  );
}

export default App;

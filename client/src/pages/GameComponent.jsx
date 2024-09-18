import { useState, useEffect, useRef, useMemo } from "react";

import "./GameComponent.css";
import Confetti from "react-confetti";
import useAxios from "../hooks/useAxios/index.js";
import Button from "react-bootstrap/Button";

const colourlist = ["Red", "Green", "Blue", "Yellow", "Orange", "Pink"];

function GameComponent() {
  const [cards, setCards] = useState([]);
  const [score, setScore] = useState(0);
  const [hintCounter, setHintCounter] = useState(3);
  const [moves, setMoves] = useState(0);

  //const [success, setSuccess] = useState(false);
  const { response, error, loading, fetchData } = useAxios();

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
    const flippedCards = cards.filter((data) => data.flipped && !data.solved);
    // console.log(flippedCards);
    // console.log("card", card);

    if (flippedCards.length === 2) return;

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
    } else if (flippedCards.length === 1 && hintCounter < 3) {
      timeout.current = setTimeout(() => {
        setCards(
          cards.map((card) => {
            if (card.position === flippedCards[0].position) {
              card.flipped = false;
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

  const handleHint = (data) => {
    if (hintCounter > 0) {
      const unFlippedCards = data.filter(
        (data) => !data.flipped && !data.solved
      );
      if (unFlippedCards.length > 0) {
        const randomIndex = Math.floor(Math.random() * unFlippedCards.length);
        const cardToReveal = unFlippedCards[randomIndex];
        const newPieces = [...cards];
        newPieces[cardToReveal.position].flipped = true;
        setCards(newPieces);
        setHintCounter(hintCounter - 1);
      }
    }
  };

  const isGameCompleted = useMemo(() => {
    if (cards.length > 0 && cards.every((card) => card.solved)) {
      return true;
    }
    return false;
  }, [cards]);

  const saveGameResult = () => {
    const userId = localStorage.getItem("userId");
    const fullname = localStorage.getItem("fullname");
    const email = localStorage.getItem("email");
    const data = {
      score,
      moves,
      result: score > 45 ? "win" : "lose",
      userId: userId,
      fullname: fullname,
      email: email,
    };

    const token = localStorage.getItem("token");

    fetchData({
      url: "game/save",
      method: "POST",
      data: data,
      headers: { authorization: token },
    });
  };

  useEffect(() => {
    if (isGameCompleted) {
      saveGameResult();
    }
  }, [isGameCompleted]);

  // useEffect(() => {
  //   if (response) {
  //     console.log(response);
  //   }
  // }, [response]);

  const resetGame = () => {
    setScore(0);
    setMoves(0);
    setHintCounter(3);
    startGame();
  };

  return (
    <main>
      <h1>Memory Game</h1>

      <div className="scorecontent">
        <h2>Score:{score}</h2>

        <Button
          variant="info"
          className="hint-button"
          onClick={() => handleHint(cards)}
          disabled={hintCounter === 0}
        >
          Hint
        </Button>
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
              <div
                className="flip-card-back"
                style={{
                  backgroundColor: card.colourCard ? card.colourCard : "",
                }}
              >
                {card.colourCard}
              </div>
            </div>
          </div>
        ))}
        <div className="hint-counter">Hints Remaining:{hintCounter}</div>
      </div>
      {isGameCompleted && (
        <div className="gamecompleted">
          {score > 45 ? (
            <>
              <h1>
                YOU WIN!!!
                <br />
                Your Score is {score}
                <br />
                No. of moves {moves}
              </h1>
              <Confetti width={window.innerWidth} height={window.innerHeight} />
            </>
          ) : (
            <>
              <h1>
                OOPS... YOU LOSE!!!
                <br />
                Your Score is {score}
                <br />
                No. of moves {moves}
              </h1>
            </>
          )}
          <Button
            variant="success"
            className="playagain-button"
            onClick={resetGame}
          >
            Play Again
          </Button>
        </div>
      )}
    </main>
  );
}

export default GameComponent;

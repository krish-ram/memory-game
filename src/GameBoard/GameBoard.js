import React, { useState, useEffect } from "react";
import "./GameBoard.css";
import Card from "../Card/Card";
import { Data } from "../util/data";

function GameBoard() {
  const [moves, setMoves] = useState(0);
  const [cards, setCards] = useState(Data);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [stopFlip, setStopFlip] = useState(false);
  const [won, setWon] = useState(false);

  useEffect(() => {
    NewGame();
  }, []);

  useEffect(() => {
    if (firstCard && secondCard) {
      setStopFlip(true);
      if (firstCard.name === secondCard.name) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.name === firstCard.name) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        setWon((prev) => prev + 1);
        removeSelection();
      } else {
        setTimeout(() => {
          removeSelection();
        }, 1500);
      }
    }
  }, [firstCard, secondCard]);

  function removeSelection() {
    setFirstCard(null);
    setSecondCard(null);
    setStopFlip(false);
    setMoves((prev) => prev + 1);
  }

  function NewGame() {
    setCards(Data);
    setFirstCard(null);
    setSecondCard(null);
    setMoves(0);
    setStopFlip(false);
    setWon(false);
  }

  function handleSelectedCards(item) {
    if (firstCard && firstCard.id !== item.id) {
      setSecondCard(item);
    } else if (!firstCard) {
      setFirstCard(item);
    }
  }

  return (
    <div className="game">
      <div className="container">
        {cards.map((item) => (
          <Card
            key={item.id}
            item={item}
            handleSelectedCards={handleSelectedCards}
            toggled={item === firstCard || item === secondCard || item.matched}
            stopFlip={stopFlip}
          />
        ))}
      </div>
      <br />
      <div className="footer">
        {won !== 6 ? (
          <span>Moves: {moves}</span>
        ) : (
          <span>You won in {moves} moves</span>
        )}
        <button className="btn" onClick={NewGame}>
          New Game
        </button>
      </div>
    </div>
  );
}

export default GameBoard;

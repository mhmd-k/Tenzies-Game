import React from "react";
import Rock from "./components/Rock";
import uuid from "react-uuid";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = React.useState(dices());
  const [gameOver, setGameOver] = React.useState(false);
  const [chosenValue, setchosenValue] = React.useState(null);

  React.useEffect(() => {
    let d = dice.filter((e) => e.isHeld === false);
    if (d.length === 0) {
      setGameOver(true);
    }
  }, [dice]);

  // generate a new number
  function creatNewDice() {
    return {
      id: uuid(),
      isHeld: false,
      value: Math.ceil(Math.random() * 6),
    };
  }

  function dices() {
    let arr = [];
    for (let i = 0; i < 10; i++) {
      arr.push(creatNewDice());
    }
    return arr;
  }

  // Roll button function
  function roll() {
    if (gameOver) {
      setDice(dices());
      setGameOver(false);
    } else {
      setDice((prevDice) => {
        return prevDice.map((e) => {
          return e.isHeld ? e : creatNewDice();
        });
      });
    }
  }

  // changeing the isHeld property of a rock
  function diceClick(id, value) {
    let d = dice.filter((e) => e.isHeld === true);
    if (chosenValue !== null && d.length > 0 && value !== chosenValue) {
      return;
    }
    setchosenValue(value);
    setDice((prevDice) => {
      return prevDice.map((e) => {
        return e.id === id ? { ...e, isHeld: !e.isHeld } : e;
      });
    });
  }

  const dicesArr = dice.map((e) => {
    return (
      <Rock
        key={e.id}
        isHeld={e.isHeld}
        value={e.value}
        handleToggle={() => diceClick(e.id, e.value)}
      />
    );
  });

  return (
    <div className="container">
      {gameOver && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
      <div className="text">
        <h1>Tenzies</h1>
        <p>
          Roll until all dices are the same. Click each dice to freeze it at its
          current value between rolls.
        </p>
      </div>
      <div className="box">{dicesArr}</div>
      <button className="roll" onClick={roll}>
        {gameOver ? "restart" : "roll"}
      </button>
    </div>
  );
}

export default App;

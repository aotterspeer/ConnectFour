import React from "react";
import Board from "./Board";
import GameInfo from "./GameInfo";
import { useConnectFour } from "../hooks/useConnectFour";

const Game: React.FC = () => {
  const {
    board,
    currentPlayer,
    winner,
    selectedColumn,
    dropDisc,
    moveLeft,
    moveRight,
    resetGame,
    getGameStatus,
  } = useConnectFour();

  const gameStatus = getGameStatus();

  return (
    <div className="game">
      <h1>Connect Four</h1>
      <div className="game-container">
        <Board board={board} selectedColumn={selectedColumn} />
        <GameInfo
          currentPlayer={currentPlayer}
          gameStatus={gameStatus}
          winner={winner}
          onReset={resetGame}
        />
      </div>
      <div className="button-controls">
        <button onClick={moveLeft} disabled={gameStatus !== "playing"}>
          ← Move Left
        </button>
        <button onClick={dropDisc} disabled={gameStatus !== "playing"}>
          Drop Disc ↓
        </button>
        <button onClick={moveRight} disabled={gameStatus !== "playing"}>
          Move Right →
        </button>
      </div>
    </div>
  );
};

export default Game;

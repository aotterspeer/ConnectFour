import React from "react";
import { Player, GameStatus } from "../types";

interface GameInfoProps {
  currentPlayer: Player;
  gameStatus: GameStatus;
  winner: Player | null;
  onReset: () => void;
}

const GameInfo: React.FC<GameInfoProps> = ({
  currentPlayer,
  gameStatus,
  winner,
  onReset,
}) => {
  return (
    <div className="game-info">
      <div className="status">
        {gameStatus === GameStatus.PLAYING && (
          <div>
            <h2>Player {currentPlayer}'s Turn</h2>
            <div className={`player-indicator player${currentPlayer}`}>
              <div className="disc" />
            </div>
          </div>
        )}

        {gameStatus === GameStatus.WON && (
          <div>
            <h2>Player {winner} Wins!</h2>
            <div className={`player-indicator player${winner}`}>
              <div className="disc" />
            </div>
          </div>
        )}

        {gameStatus === GameStatus.DRAW && <h2>Game Ended in a Draw!</h2>}
      </div>

      <div className="controls">
        <h3>Controls:</h3>
        <ul>
          <li>← → Arrow keys: Move selection</li>
          <li>↓ / Enter / Space: Drop disc</li>
          <li>R: Reset game</li>
        </ul>
        <button onClick={onReset} className="reset-button">
          Reset Game
        </button>
      </div>
    </div>
  );
};

export default GameInfo;

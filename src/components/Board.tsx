import React from "react";
import Cell from "./Cell";
import { Board as BoardType } from "../types";

interface BoardProps {
  board: BoardType;
  selectedColumn: number;
}

const Board: React.FC<BoardProps> = ({ board, selectedColumn }) => {
  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              value={cell}
              isSelected={
                colIndex === selectedColumn && cell === null && rowIndex === 0
              }
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;

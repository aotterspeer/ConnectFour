import React from "react";
import { Cell as CellType } from "../types";

interface CellProps {
  value: CellType;
  isSelected?: boolean;
}

const Cell: React.FC<CellProps> = ({ value, isSelected = false }) => {
  let cellClass = "cell";

  if (value === 1) {
    cellClass += " player1";
  } else if (value === 2) {
    cellClass += " player2";
  } else {
    cellClass += " empty";
  }

  if (isSelected) {
    cellClass += " selected";
  }

  return (
    <div className={cellClass}>
      {value !== null && <div className="disc" />}
    </div>
  );
};

export default Cell;

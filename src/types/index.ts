export type Player = 1 | 2;
export type Cell = Player | null;
export type Board = Cell[][];

export interface GameState {
  board: Board;
  currentPlayer: Player;
  winner: Player | null;
  isDraw: boolean;
  selectedColumn: number;
}

export enum GameStatus {
  PLAYING = 'playing',
  WON = 'won',
  DRAW = 'draw',
} 
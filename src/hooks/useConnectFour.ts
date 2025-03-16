import { useState, useCallback, useEffect } from 'react';
import { Board, Cell, GameState, Player, GameStatus } from '../types';

// Constants
const ROWS = 6;
const COLUMNS = 7;
const WINNING_LENGTH = 4;

// Create an empty board
const createEmptyBoard = (): Board => {
  return Array(ROWS).fill(null).map(() => Array(COLUMNS).fill(null));
};

// Initial game state
const initialGameState: GameState = {
  board: createEmptyBoard(),
  currentPlayer: 1,
  winner: null,
  isDraw: false,
  selectedColumn: 3, // Start with middle column selected
};

export const useConnectFour = () => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  // Check if the board is full (draw)
  const checkDraw = useCallback((board: Board): boolean => {
    return board[0].every(cell => cell !== null);
  }, []);

  // Check if a player has won
  const checkWinner = useCallback((board: Board, player: Player): boolean => {
    // Check horizontal
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col <= COLUMNS - WINNING_LENGTH; col++) {
        if (
          board[row][col] === player &&
          board[row][col + 1] === player &&
          board[row][col + 2] === player &&
          board[row][col + 3] === player
        ) {
          return true;
        }
      }
    }

    // Check vertical
    for (let row = 0; row <= ROWS - WINNING_LENGTH; row++) {
      for (let col = 0; col < COLUMNS; col++) {
        if (
          board[row][col] === player &&
          board[row + 1][col] === player &&
          board[row + 2][col] === player &&
          board[row + 3][col] === player
        ) {
          return true;
        }
      }
    }

    // Check diagonal (down-right)
    for (let row = 0; row <= ROWS - WINNING_LENGTH; row++) {
      for (let col = 0; col <= COLUMNS - WINNING_LENGTH; col++) {
        if (
          board[row][col] === player &&
          board[row + 1][col + 1] === player &&
          board[row + 2][col + 2] === player &&
          board[row + 3][col + 3] === player
        ) {
          return true;
        }
      }
    }

    // Check diagonal (up-right)
    for (let row = WINNING_LENGTH - 1; row < ROWS; row++) {
      for (let col = 0; col <= COLUMNS - WINNING_LENGTH; col++) {
        if (
          board[row][col] === player &&
          board[row - 1][col + 1] === player &&
          board[row - 2][col + 2] === player &&
          board[row - 3][col + 3] === player
        ) {
          return true;
        }
      }
    }

    return false;
  }, []);

  // Find the lowest empty row in a column
  const findLowestEmptyRow = useCallback((board: Board, column: number): number | null => {
    for (let row = ROWS - 1; row >= 0; row--) {
      if (board[row][column] === null) {
        return row;
      }
    }
    return null; // Column is full
  }, []);

  // Drop a disc in the selected column
  const dropDisc = useCallback(() => {
    const { board, currentPlayer, selectedColumn } = gameState;
    
    // Find the lowest empty row in the selected column
    const row = findLowestEmptyRow(board, selectedColumn);
    
    // If the column is full, do nothing
    if (row === null) return;
    
    // Create a new board with the disc dropped
    const newBoard = board.map(rowArray => [...rowArray]);
    newBoard[row][selectedColumn] = currentPlayer;
    
    // Check if the current player has won
    const hasWon = checkWinner(newBoard, currentPlayer);
    
    // Check if the game is a draw
    const isDraw = !hasWon && checkDraw(newBoard);
    
    // Update the game state
    setGameState({
      board: newBoard,
      currentPlayer: hasWon || isDraw ? currentPlayer : (currentPlayer === 1 ? 2 : 1),
      winner: hasWon ? currentPlayer : null,
      isDraw,
      selectedColumn,
    });
  }, [gameState, findLowestEmptyRow, checkWinner, checkDraw]);

  // Move the selection left
  const moveLeft = useCallback(() => {
    if (gameState.winner || gameState.isDraw) return;
    
    setGameState(prev => ({
      ...prev,
      selectedColumn: Math.max(0, prev.selectedColumn - 1),
    }));
  }, [gameState.winner, gameState.isDraw]);

  // Move the selection right
  const moveRight = useCallback(() => {
    if (gameState.winner || gameState.isDraw) return;
    
    setGameState(prev => ({
      ...prev,
      selectedColumn: Math.min(COLUMNS - 1, prev.selectedColumn + 1),
    }));
  }, [gameState.winner, gameState.isDraw]);

  // Reset the game
  const resetGame = useCallback(() => {
    setGameState(initialGameState);
  }, []);

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          moveLeft();
          break;
        case 'ArrowRight':
          moveRight();
          break;
        case 'ArrowDown':
        case ' ':
        case 'Enter':
          dropDisc();
          break;
        case 'r':
        case 'R':
          resetGame();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [moveLeft, moveRight, dropDisc, resetGame]);

  // Get the current game status
  const getGameStatus = useCallback((): GameStatus => {
    if (gameState.winner) return GameStatus.WON;
    if (gameState.isDraw) return GameStatus.DRAW;
    return GameStatus.PLAYING;
  }, [gameState.winner, gameState.isDraw]);

  return {
    board: gameState.board,
    currentPlayer: gameState.currentPlayer,
    winner: gameState.winner,
    isDraw: gameState.isDraw,
    selectedColumn: gameState.selectedColumn,
    dropDisc,
    moveLeft,
    moveRight,
    resetGame,
    getGameStatus,
  };
}; 
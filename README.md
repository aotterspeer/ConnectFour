# Connect Four Game

A classic Connect Four game built with React and TypeScript.

## Game Description

Connect Four is a classic two-player strategy game in which players take turns dropping colored discs into a vertical grid with seven columns and six rows. The goal is to be the first player to align four of their own discs either vertically, horizontally, or diagonally before their opponent does.

## Game Rules

1. The game begins with an empty grid.
2. Players take turns dropping a colored disc (red for Player 1, yellow for Player 2) into one of the seven columns.
3. The disc falls to the lowest available row within the chosen column.
4. The first player to connect four of their own discs in a row, column, or diagonal wins the game.
5. If the grid is completely filled without a four-in-a-row connection, the game ends in a draw.

## How to Play

### Keyboard Controls

- **Left Arrow (←)**: Move selection to the left
- **Right Arrow (→)**: Move selection to the right
- **Down Arrow (↓)**, **Enter**, or **Space**: Drop disc in the selected column
- **R**: Reset the game

### Mouse Controls

You can also use the buttons below the game board to control the game:

- **← Move Left**: Move selection to the left
- **Drop Disc ↓**: Drop disc in the selected column
- **Move Right →**: Move selection to the right
- **Reset Game**: Start a new game

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser to play the game.

## Technologies Used

- React
- TypeScript
- CSS

## License

This project is open source and available under the [MIT License](LICENSE).

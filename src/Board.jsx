import React from 'react';
import Cell from './Cell'; 
import createBoard from './utils';
import './Board.css';

export class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: createBoard(25, 5),
      gameOver: false,
      gameWon: false
    };
  }

  handleCellClick = (index) => {
    if (this.state.gameOver || this.state.gameWon || this.state.board[index].visible) {
      return; 
    }
  
    const newBoard = [...this.state.board]; 
    newBoard[index].visible = true; 

    console.log(index);
    console.log(this.state.board[index].hasMine);
    console.log(this.state.board[index].visible);
    console.log(this.state.board[index].numberOfNeighbouringMines);
    
    if (newBoard[index].hasMine) {
      this.setState({ board: newBoard, gameOver: true });
    } else {
      this.setState({ board: newBoard }, this.winCheck);
    }
  };

  winCheck = () => {
    const { board } = this.state;
    const winCon = board.every(cell => cell.visible || cell.hasMine);

    //winCon förkortning för winCondition
    if (winCon) {
      this.setState({ gameWon: true });
    }
  };


  renderBoard = () => {
    return this.state.board.map((cell, index) => {
      return (
        <Cell
          key={index}
          cell={cell}
          onClick={() => this.handleCellClick(index)}
        />
      );
    });
  };

  displayGameMessage = () => {
    if (this.state.gameOver) {
      return <div className="message game-over">Game Over!</div>;
    } else if (this.state.gameWon) {
      return <div className="message game-won">You Won!</div>;
    }
    return null;
  };

  render() {
    return (
      <div className="game-container">
        <h1 className="title">Minesweeper</h1>
        {this.displayGameMessage()}
        <div className="board">
        {this.renderBoard()}
        </div>
      </div>
    );
  }
}
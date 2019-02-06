import React, { Component } from 'react';
// import Square from './Square';
import Cell from './Cell';
import { gameProperties } from './Game';

import './Board.css';

export default class Board extends Component {
	constructor (props) {
		super (props);

    const { squaresPerBoardRow } = gameProperties;
    const iterBoardRow = Array(squaresPerBoardRow).fill(null);
    const tempData = [];
    for (let i=0; i<3; i++)
      tempData.push (iterBoardRow.slice());

    this.myProps = {
      iterBoardRow: iterBoardRow.slice(),
      boardData: tempData.slice(),
    }

    // console.log ('Board.constructor', this.props);
	}

  /****************************************************
   React LifeCycle hook
   Attempts to stop un-necessary UI updates

   ** need to find a more efficient way and get rid
   ** of the double for loop
   ****************************************************/
  shouldComponentUpdate (nextProps, nextState) {
    // console.log ('Board: currentProps', this.props, 'nextProps', nextProps);
    let requireRedraw = false;
    let i, j;
    for (i=0; i<3 && !requireRedraw; i++)
      for (j=0; j<3 && !requireRedraw; j++)
        if (this.props.boardData[i][j] !== nextProps.boardData[i][j]) {
          requireRedraw = true;
        }

    if (requireRedraw) {
      // save a copy of the current props.boardData into myProps...
      const boardData = [];
      for ( i=0; i<3; i++)
        boardData.push (this.props.boardData[i].slice());
      this.myProps.boardData = boardData;
    }
    return requireRedraw;
  }

  /************************************************
    handleClick
   ************************************************/
	// handleClick = (row, col) => {
  	
 //  	console.log ('Board.handleClick [row, col]:[', row, col, ']', 'boardID', this.props.boardID);


 //    this.props.handleClick (this.props.boardID, row, col);
 //  }

  /************************************************
    draws a square in the given row, col position
   ************************************************/
  renderSquare(row, col) {
    const squares = this.props.boardData;
    const { gameInit, boardID, handleClick, userPlaying, slotStatus } = this.props;
    const { squaresPerBoardRow } = gameProperties;

    const requireRedraw = this.myProps.boardData[row][col] !== squares[row][col];
    let   colour = 'x';
    switch (slotStatus[row][col]) {
      case 1: colour = 'red'; // gameInit board
        break;

      case 2: colour = 'blue';  // user playing
        break;

      case 3: colour = 'pink';  // hint
        break;

      default: colour = '';
    }

    return <Cell value={ squares[row][col] }
                   handleClick = { () => handleClick (boardID, row, col) } 
                   // gameInit = {gameInit}
                   redraw = {requireRedraw}
                   key = {row*squaresPerBoardRow + col} 

                   bold = {gameInit && !userPlaying}
                   color = { colour }
                   />;
  }


  /************************************************
   renders a Board's row - 3 squares in each board row for a 9x9 game
   ************************************************/
  renderSquareRow = (row) => {
    const { iterBoardRow } = this.myProps;

    return (
      <div key={row} /*className="board-row"*/>
        { iterBoardRow.map ( (val, idx) => (this.renderSquare(row, idx)) ) }
      </div>
  	)

  }

  /************************************************
   
   ************************************************/
  render() {
    // console.log ('Board,render() boardID=', this.props.boardID);
    let cls=''; 
    const { iterBoardRow } = this.myProps;
    const { boardID } = this.props;
    const { boardsPerRow } = gameProperties;
    if ( ~~(boardID / boardsPerRow) < boardsPerRow-1  )
      cls += 'board-bottom ';

    if ( (boardID+1)%boardsPerRow )
      cls += ' board-right';

    return (
        <div className={cls} >
          { iterBoardRow.map ( (val, idx) => (this.renderSquareRow(idx)) )}
        </div>
    );
  }
}

import React, { Component } from 'react';
import Board from './Board';
import Keypad from './Keypad';
import Solver, { checkValue } from './Solver';

import './Game.css';

export const gameProperties = {
  boardsPerRow: 3,
  squaresPerBoardRow: 3,
}

/***************************************************
  Test data
 ***************************************************/
const sBoard0= [
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0]
];

const sBoard1= [
    [0,0,0,0,0,0,0,5,0],
    [8,0,0,4,0,0,1,9,0],
    [0,6,0,0,3,0,0,0,0],
    [0,9,4,0,0,2,0,3,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,9,0,2,6],
    [0,4,3,7,0,0,0,0,8],
    [0,0,0,1,0,0,5,7,0],
    [0,7,0,0,9,0,0,4,0]
];
const sBoard2= [
    [6,3,0,7,0,0,0,0,8],
    [7,0,0,2,0,3,0,0,0],
    [8,0,0,0,0,0,0,0,5],
    [0,0,0,0,0,0,8,9,6],
    [0,5,0,0,0,0,0,0,0],
    [0,0,0,0,9,0,4,0,0],
    [0,0,0,0,0,4,2,6,1],
    [0,2,0,0,0,0,0,0,0],
    [9,0,0,6,0,5,3,0,0]
];
const sBoard3= [
    [2,0,0,0,0,1,0,0,0],
    [0,0,0,0,9,0,3,4,0],
    [6,4,0,2,0,0,0,7,0],
    [0,3,0,6,0,0,1,0,7],
    [0,8,0,7,0,0,2,0,9],
    [0,0,0,0,0,0,6,0,0],
    [0,0,0,0,5,3,0,0,0],
    [0,1,0,0,0,0,0,0,8],
    [0,0,8,0,4,0,0,0,0]
];
const sBoard4= [
    [0,0,0,0,6,0,3,0,2],
    [1,0,5,4,0,0,0,0,0],
    [0,9,0,0,0,0,4,8,0],
    [0,0,0,0,0,3,0,1,9],
    [3,0,0,0,0,0,7,0,0],
    [0,8,0,0,0,0,0,0,0],
    [0,3,8,0,1,0,0,0,0],
    [0,5,0,0,0,0,0,0,0],
    [7,0,1,5,0,6,0,3,0]
];
const sBoard5= [
    [0,0,6,8,0,4,0,0,5],
    [0,7,0,0,1,0,0,0,2],
    [0,0,0,3,5,0,0,0,0],
    [6,0,1,4,0,0,0,0,0],
    [5,0,3,0,0,0,0,0,0],
    [0,4,0,0,0,0,0,0,3],
    [7,0,0,0,0,0,0,5,8],
    [0,2,0,0,8,5,0,0,7],
    [0,0,0,0,0,2,0,1,0]
];
const sBoard6= [
    [0,5,0,0,6,0,8,0,0],
    [3,0,0,0,0,1,0,5,0],
    [0,0,0,0,0,0,4,2,0],
    [0,0,5,0,0,2,6,0,0],
    [0,8,0,9,0,0,0,0,0],
    [0,0,4,0,8,0,3,0,0],
    [4,0,0,6,0,0,0,0,0],
    [0,7,0,0,0,0,0,0,0],
    [2,0,0,0,0,0,0,9,1]
];
const sBoard7 = [
    [0,9,0,0,0,0,0,0,6],
    [0,0,0,9,6,0,4,8,5],
    [0,0,0,5,8,1,0,0,0],
    [0,0,4,0,0,0,0,0,0],
    [5,1,7,2,0,0,9,0,0],
    [6,0,2,0,0,0,3,7,0],
    [1,0,0,8,0,4,0,2,0],
    [7,0,6,0,0,0,8,1,0],
    [3,0,0,0,9,0,0,0,0]
];
const sBoard8 = [
    [6,8,1,0,0,5,0,0,0],
    [0,4,0,0,3,0,0,0,0],
    [0,0,0,0,9,4,0,5,0],
    [0,0,2,0,0,0,0,0,0],
    [0,0,0,4,6,7,0,0,0],
    [7,0,0,0,0,0,0,1,0],
    [8,0,0,0,7,0,0,0,2],
    [0,0,0,0,0,0,0,9,0],
    [4,0,5,0,0,1,0,7,3]
];
const sBoard9 = [
    [1,0,0,0,0,8,0,2,0],
    [9,0,0,0,0,0,4,8,3],
    [0,0,0,5,0,0,0,0,0],
    [0,0,0,0,0,2,7,0,0],
    [0,4,0,8,3,0,0,0,0],
    [0,0,0,0,9,0,0,3,0],
    [0,8,0,3,0,0,0,5,0],
    [0,0,3,0,0,5,0,0,0],
    [0,0,6,0,0,7,0,1,8]
];
const sBoard10= [
    [0,0,5,0,6,0,0,2,0],
    [0,1,6,8,0,0,3,0,0],
    [0,0,0,9,0,0,0,0,0],
    [0,3,0,0,0,0,0,5,0],
    [0,0,0,0,9,1,0,0,0],
    [0,0,1,7,0,0,8,3,0],
    [8,0,0,0,0,0,0,0,9],
    [7,0,0,0,0,6,0,1,0],
    [0,0,0,0,0,0,4,6,0]
];
const sBoard11= [
    [7,0,0,0,1,2,4,0,0],
    [0,1,0,0,8,0,0,0,0],
    [3,0,2,0,6,0,0,0,0],
    [0,0,1,0,0,0,0,4,3],
    [5,8,0,0,0,3,0,2,9],
    [0,0,0,0,0,0,8,0,1],
    [1,0,0,6,0,0,3,0,0],
    [0,7,5,0,0,0,0,0,0],
    [0,0,0,5,4,0,1,0,0]
];
const sBoard12= [
    [4,2,0,0,0,0,8,0,0],
    [0,0,1,0,0,0,0,0,0],
    [6,0,0,2,5,0,0,0,0],
    [0,0,0,0,0,0,4,0,0],
    [5,9,0,0,0,0,0,0,6],
    [0,0,0,0,3,5,0,0,1],
    [2,0,4,0,7,0,0,3,0],
    [1,0,0,6,0,0,0,0,0],
    [0,3,0,0,0,8,0,6,9]
];
const sBoard13= [
    [1,8,0,0,4,0,0,6,3],
    [0,0,3,0,8,0,0,0,0],
    [0,2,0,0,0,7,4,0,0],
    [0,0,0,0,3,0,2,9,0],
    [4,0,0,6,0,0,0,0,7],
    [0,0,0,0,0,0,0,0,5],
    [2,0,0,8,0,0,0,0,0],
    [0,0,9,0,0,0,7,0,0],
    [0,7,0,1,6,2,0,0,0]
];
const sBoard14= [
    [0,2,0,0,5,0,1,7,0],
    [7,6,0,0,0,0,0,0,9],
    [0,9,4,0,0,0,0,0,0],
    [9,1,0,0,8,0,7,6,0],
    [6,3,0,0,7,0,0,0,0],
    [0,0,0,0,0,0,0,0,3],
    [0,0,0,0,0,0,0,0,0],
    [0,0,7,0,1,8,4,0,0],
    [0,0,0,0,0,0,0,9,8]
];
const sBoard15= [
    [8,0,0,7,0,3,0,0,0],
    [2,0,0,0,0,0,0,1,0],
    [0,0,0,5,4,0,0,3,9],
    [0,0,0,0,0,0,0,0,0],
    [0,0,5,0,0,1,0,0,0],
    [6,0,8,9,0,0,0,0,4],
    [0,7,0,4,0,8,0,0,2],
    [0,0,0,0,0,0,4,0,8],
    [0,0,0,0,3,5,0,6,0]
];

const gameBoards = [];

const squaresPerGameRow = gameProperties.squaresPerBoardRow * gameProperties.boardsPerRow;
const blankGame = Array (squaresPerGameRow * squaresPerGameRow).fill(0);

export default class Game extends Component {

  constructor (props) {
    super (props);

    this.state = {
      slots: this.clearBoards(),
      gameInit: true,
      keypadIdx: null,
      keypadMode: 0,  // 0 - game setup
                      // 1 - user playing (to the program, it is still gameInit: true)
      userMessage: 'click a button below to Play...',
    };

    /********************************************
      slotStatus - holds the status of each cell...
        0 - no status (for displaying "solved" puzzle cells)
        1 - sudoku game (bold red)
        2 - user entered (playing game - blue)
        3 - hint (user requeted hint)
     ********************************************/
    this.myProps = {
      slotStatus: this.clearBoards(),
      solvedPuzzle: this.state.slots,
      isPuzzleSolved: false,
      gameIndex: 0,
    };

    gameBoards.push (sBoard1);
    gameBoards.push (sBoard2);
    gameBoards.push (sBoard3);
    gameBoards.push (sBoard4);
    gameBoards.push (sBoard5);
    gameBoards.push (sBoard6);
    gameBoards.push (sBoard7);
    gameBoards.push (sBoard8);
    gameBoards.push (sBoard9);
    gameBoards.push (sBoard10);
    gameBoards.push (sBoard11);
    gameBoards.push (sBoard12);
    gameBoards.push (sBoard13);
    gameBoards.push (sBoard14);
    gameBoards.push (sBoard15);
  }

  /************************************************
    Helper function
    Sets/Clears user message
   ************************************************/
  setMessageText = (newUserMessage) => {
    const { userMessage } = this.state;

    if (userMessage === newUserMessage)
      return;

    this.setState ({userMessage: newUserMessage});
  }

  clearMessageText = () => {
    this.setMessageText ('');
  }

  /************************************************
    Helper function 
    returns: a ZERO filled, blank 9x9 matrix
   ************************************************/  
  clearBoards = () => {
    const linearData = blankGame.slice();
    const tSlots = [];
    for (let i=0; i < squaresPerGameRow; i++)
      tSlots.push (linearData.slice(i*squaresPerGameRow, (i+1)*squaresPerGameRow));

    return tSlots;
  }

  /************************************************
    Sets up a new game
   ************************************************/  
  newGame = () => {
    this.myProps.slotStatus = this.clearBoards();
    this.myProps.isPuzzleSolved = false;
    this.clearMessageText();

    this.setState ({
      slots: this.clearBoards(),
      gameInit: true,
      keypadMode: 0,
    })
  }

  /************************************************
    Load Test data into game
   ************************************************/  
  loadTestBoard = () => {
    const newSlotStatus = [];
    const currentGameIndex = this.myProps.gameIndex;

    let i, j;
    for (i=0; i < squaresPerGameRow; i++) {
      newSlotStatus.push ( gameBoards[currentGameIndex][i].slice() );
      for (j=0; j < squaresPerGameRow; j++)
        if (newSlotStatus[i][j] !== 0)
          newSlotStatus[i][j] = 1;
    }

    // saves the status to myProps.slotStatus
    this.myProps.slotStatus = newSlotStatus;
    this.myProps.isPuzzleSolved = false;
    this.myProps.gameIndex = (currentGameIndex + 1) % gameBoards.length;
    this.clearMessageText();
    this.setState ({
      slots: gameBoards[currentGameIndex].slice(),
      gameInit: true,
      keypadMode: 0,
    });
  }


  /************************************************
    change keypad mode - user is playing 
   ************************************************/  
  userPlay = () => {
    if (this.myProps.isPuzzleSolved) {
      this.setMessageText ('Please start a New Game');
      return;
    }

    this.setState ({
      keypadMode: 1,
    })
  }

  /************************************************
     
   ************************************************/  
  giveHint = () => {
    if (this.myProps.isPuzzleSolved) {
      this.setMessageText ('Please start a Brand new Game.')
      return;
    }

    // user may have added some numbers to the game board
    // so we need to re-resolve it 
    this.solvePuzzleBehindTheScene();

    // search myProps.slotStatus[][] to locate the
    // first ZERO value
    const { slots } = this.state;
    let row, col, found=false;
    for (row=0; !found && row < squaresPerGameRow; row++)
      for (col=0; !found && col < squaresPerGameRow; col++)
        if (!slots[row][col]) {
          this.myProps.slotStatus[row][col] = 3;

          // duplicated from handleClick()...
          // Gets a copy of the row
          const dataRow = this.state.slots[row].slice();
          dataRow[col] = this.myProps.solvedPuzzle[row][col];

          slots[row] = dataRow;

          this.setState ({slots});
          found = true;
        }

    // sets to "usePlay" mode (user may ask for hint right after
    // the game begins)
    this.setState ({
      keypadMode: 1,
    })
  }

  /************************************************
    componentDidMount
   ************************************************/  
  componentDidMount () {
  }

  /************************************************
    handleClick
   ************************************************/
  handleClick = (boardID, boardRow, boardCol) => {
    // console.log ('Game.handleClick: boardID, boardRow, boardCol', 
    //   boardID, boardRow, boardCol,
    //   'keyPad value:', this.state.keypadIdx);

    this.clearMessageText();
    if (this.state.keypadIdx === null)
      return;

    const { boardsPerRow, squaresPerBoardRow } = gameProperties;
    const dataRowIdx = ~~(boardID / boardsPerRow)*squaresPerBoardRow + boardRow;
    const dataColIdx = (boardID % boardsPerRow)*squaresPerBoardRow + boardCol;

    // prevents the user (playing) from changing the board's initial settings
    if (this.state.keypadMode === 1 && this.myProps.slotStatus[dataRowIdx][dataColIdx] === 1) {
      this.setMessageText ("Cannot alter game's setup");
      return;
    }


    // Gets a copy of the row
    const dataRow = this.state.slots[dataRowIdx].slice();
    if (dataRow[dataColIdx] === this.state.keypadIdx+1)
      return;

    const { slots } = this.state;
    if (!checkValue(slots, dataRowIdx, dataColIdx, this.state.keypadIdx+1)) {
      this.setMessageText (this.state.keypadIdx+1 + ' cannot be put here!')
      return;
    }

    // set/update the cell's status
    if (this.state.gameInit)
      this.myProps.slotStatus[dataRowIdx][dataColIdx] = this.state.keypadMode === 0 ? 1 : 2;

    // console.log ('Game.handleClick: myProps.slotStatus',this.myProps.slotStatus);

    dataRow[dataColIdx] = this.state.keypadIdx+1;
    slots[dataRowIdx] = dataRow;

    this.setState ({slots});
  }


  /************************************************
    keypadIdxChange
   ************************************************/
  keypadIdxChange = (i) => {
    // console.log ('keypadIdxChange', i);
    this.setState ( {keypadIdx: i})
  }

  /************************************************
    input params:
    - boardID - self explanatory
    - fromSource - either this.state.slots or this.myProps.slotStatus
                 - must be a 9x9 matrix
   returns a 3x3 data array corresponding the board's data from the 9x9 data matrix
   (boardID // 3) * 3 ==> beginning ROW in the 9x9 data matrix (0, 3, 6) depending w.r.t. the boardID
   (boardID % 3) * 3  ==> beginning COL in the 9x9 data matrix (0, 3, 6) depending w.r.t. the boardID
   ************************************************/
  getBoardData = (boardID, fromSource) => {
    const { boardsPerRow, squaresPerBoardRow } = gameProperties;
    // const beginningRow = ~~(boardID / 3) * 3;
    // const beginningCol = (boardID % 3) * 3;

    const beginningRow = ~~(boardID / boardsPerRow) * squaresPerBoardRow;
    const beginningCol = (boardID % boardsPerRow) * squaresPerBoardRow;

    const bData = [];
    for (let j=0; j < squaresPerBoardRow; j++)
      // bData.push ( slots[beginningRow+j].slice(beginningCol, beginningCol+squaresPerBoardRow) );
      bData.push ( fromSource[beginningRow+j].slice(beginningCol, beginningCol+squaresPerBoardRow) );

    // console.log ('boardData: boardID', boardID, 'bData', bData);
    return bData;
  }


  /************************************************
   render one row of boards - there are 3 boards in one row
   ************************************************/
  renderBoardRow = (boardRowID) => {
    // let keypadValue = null;
    // if (this.state.keypadIdx != null)
    //   keypadValue = this.state.keypadIdx + 1; 

    const { boardsPerRow } = gameProperties;
    const iterBoardsPerRow = Array (boardsPerRow).fill(null);
    const boardStartIdx = boardRowID * boardsPerRow;

    // console.log ('Game.renderBoardRow: slotStatus', this.myProps.slotStatus);

    return (

      <div className="game-board" key={boardRowID}>
        { iterBoardsPerRow.map ( (item, index) => (
            <Board boardID={boardStartIdx + index} 
                   boardData={this.getBoardData(boardStartIdx + index, this.state.slots)} 
                   handleClick={this.handleClick}
                   gameInit={this.state.gameInit}
                   userPlaying={this.state.keypadMode}
                   slotStatus={this.getBoardData(boardStartIdx + index, this.myProps.slotStatus)}
                   key={boardStartIdx + index} />
          ) ) }

      </div>
    );
  }


  /************************************************
    
   ************************************************/
  solvePuzzleBehindTheScene = () => {
    const resolved = Solver (this.state.slots);
    if ( resolved === null ) {
      console.log ('solvePuzzleBehindTheScene...null')
      this.setMessageText ('Puzzle is NOT solvable!')
    }
    else {
      this.myProps.solvedPuzzle = resolved.slice();
      this.clearMessageText();
    }

    return resolved !== null;
  }

  /************************************************
    Only solve the puzzle behind the scene if it
    has NOT been solved. (don't keep calling Solve() un-necessarily)
    - Also check to see if it is solvable
   ************************************************/
  solvePuzzle = () => {
    if (!this.myProps.isPuzzleSolved) {
      this.myProps.isPuzzleSolved = this.solvePuzzleBehindTheScene();
      if (!this.myProps.isPuzzleSolved)
        return;
    }
    else {
      this.setMessageText ('Game already solved. Please start a new Game.')
      return;
    }

    this.setState ({
      slots: this.myProps.solvedPuzzle,
      gameInit: false,
      keypadMode: 0,
      // userMessage: userMsg,
    });
  }


  /************************************************
    
   ************************************************/
  render() {
    // assuming boardsPerRow is also the same as # of rows in the game 
    // creates a 1-D array so array.map() can iterate thru each role (render each row)
    // must "fill()" the array, map() & forEach() will NOT be called for "undef" value
    const { boardsPerRow } = gameProperties;
    const iterBoardsPerRow = Array (boardsPerRow).fill(null);

    return (
      <div >
        <div className="game">
          { iterBoardsPerRow.map ( (item, index) => (
              this.renderBoardRow(index)
            ) )}
        </div>

        <div className="game-info">
          <div> {this.state.userMessage} </div>
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>

        <div className=''>
          <Keypad 
            keypadMode = {this.state.keypadMode}
            keypadIdx = {this.state.keypadIdx}
            keypadIdxChange={this.keypadIdxChange} />
        </div>

        <div className='' >
          <button className='game-button' onClick={this.newGame} >
            New Blank Game
          </button>

          <button className='game-button' onClick={this.userPlay}>
            Start playing
          </button>

          <button className='game-button' onClick={this.solvePuzzle}>
            Solve
          </button>
        </div>

        <div className='' >
          <button className='game-button' onClick={this.giveHint} >
            Hint
          </button>
        </div>

        <div className='' >
          <button className='game-button' onClick={this.loadTestBoard} >
            Load Board
          </button>
        </div>

      </div>
    );
  }
}


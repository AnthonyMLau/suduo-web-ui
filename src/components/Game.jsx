import React, { Component } from 'react';
import Board from './Board';
import Keypad from './Keypad';

import './Game.css';

export default class Game extends Component {

  constructor (props) {
    super (props);
    this.state = {
      keypadIdx: null,
    }
  };

  keypadIdxChange = (i) => {
    console.log ('keypadIdxChange', i);
    this.setState ( {keypadIdx: i})
  }



  renderBoardRow = (boardRowID) => {
    let keypadValue = null;
    if (this.state.keypadIdx != null)
      keypadValue = this.state.keypadIdx + 1; 

    return (
      <div className="game-board">
        <Board value={keypadValue} boardID={boardRowID * 3 + 0} />
        <Board value={keypadValue} boardID={boardRowID * 3 + 1} />
        <Board value={keypadValue} boardID={boardRowID * 3 + 2} />
      </div>
    );
  }

  render() {
    return (
      <div className="game">
        { this.renderBoardRow(0) }   
        { this.renderBoardRow(1) }   
        { this.renderBoardRow(2) }   

        <div className="game-info">
          <div> some text </div>
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>

        <div className=''>
          <Keypad keypadIdxChange={this.keypadIdxChange} />
        </div>

      </div>
    );
  }
}
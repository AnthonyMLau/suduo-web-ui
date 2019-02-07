import React, { Component } from 'react';
// import Square from './Square';
import Cell from './Cell';
import { gameProperties } from './Game';

import './Board.css';

export default class Keypad extends Component {
	constructor (props) {
		super (props);
    const { squaresPerBoardRow } = gameProperties;

		this.state = {
      // selectedValue: null,
      // private array - use to iterate through # of items via map()
      //   can very well be using a loop
      digits: Array (squaresPerBoardRow).fill(null),
      modeChange: false,
		}

    this.myState = {
      modeChanged: false,
    }
	}

	handleClick = (i) => {
    const { keypadIdx } = this.props;
    if ( keypadIdx === i )
      return;

  	// console.log ('Keypad.handleClick', i);
    // this.setState ( {selectedValue: i} );
    this.props.keypadIdxChange (i);
  }


  /********************************************************
    React Life Cycle hook
    - check to see if the keypad instance needs to re-render
   ********************************************************/
  shouldComponentUpdate (nextProps, nextState) {
    this.myState.modeChanged = (this.props.keypadMode !== nextProps.keypadMode);
    return true;
  }

  renderSquare(i) {
    return (
      <Cell value={ i+1 }
         selectedValue = {this.props.keypadIdx}
				 handleClick = { () => this.handleClick (i) } 
         bold = {!this.props.keypadMode}
         active = { i === this.props.keypadIdx }
         redraw = { this.myState.modeChanged /** || i === this.props.keypadIdx **/}
         key = { i } />
    );
  }

  renderSquareRow = (row) => {
    const { squaresPerBoardRow } = gameProperties;
    return (
      <div className="board-row" key={row} >
        {/** renders 3 cells/squares **/}
        { this.state.digits.map ( (val, idx) => (
            this.renderSquare (row*squaresPerBoardRow + idx)
          ))}
      </div>
    );  
  };

  render() {
    return (
      <div>
        {/* <div className="status" > {status} </div> */}
        <div className='board-border' >
          {/** renders 3 rows **/}
          { this.state.digits.map ( (val, idx) => (
              this.renderSquareRow (idx)
            ))}
        </div>
        <br/>
      </div>
    );
  }
}

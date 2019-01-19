import React, { Component } from 'react';
import Square from './Square';

import './Board.css';

export default class Keypad extends Component {
	constructor (props) {
		super (props);
		this.state = {
      selectedValue: null,
		}
	}

	handleClick = (i) => {
    const { selectedValue } = this.state;
    if ( selectedValue === i )
      return;

  	// console.log ('Keypad.handleClick', i);
    this.setState ( {selectedValue: i} );
    this.props.keypadIdxChange (i);
  }

  renderSquare(i) {
    return <Square value={ i+1 }
                   selectedValue = {this.state.selectedValue}
    							 handleClick = { () => this.handleClick (i) } />;
  }

  renderSquareRow = (row) => (
    <div className="board-row">
      {this.renderSquare(row*3+0)}
      {this.renderSquare(row*3+1)}
      {this.renderSquare(row*3+2)}
    </div>    
  );

  render() {
    return (
      <div>
        {/* <div className="status" > {status} </div> */}
        <div className='board-border' >
          { this.renderSquareRow(0) }
          { this.renderSquareRow(1) }
          { this.renderSquareRow(2) }
        </div>
      </div>
    );
  }
}

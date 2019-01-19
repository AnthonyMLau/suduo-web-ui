import React, { Component } from 'react';
import Square from './Square';

import './Board.css';

export default class Board extends Component {
	constructor (props) {
		super (props);
		this.state = {
			boardID: this.props.boardID,
			squares: Array(9).fill(null),
		}
	}

	handleClick = (i) => {
  	if (this.state.squares[i])
  		return;
  	
  	console.log ('Board.handleClick', i, 'boardID', this.state.boardID);
  	const squares = this.state.squares.slice();
  	squares[i] = this.props.value;
  	this.setState ({squares});

  }

  renderSquare(i) {
    return <Square value={ this.state.squares[i] }
    							 handleClick = { () => this.handleClick (i) } />;
  }


  renderSquareRow = (row) => {
  	return (
      <div className="board-row">
	      {this.renderSquare(row*3)}
	      {this.renderSquare(row*3+1)}
	      {this.renderSquare(row*3+2)}
      </div>
  	)

  }

  render() {

    return (
      <div>
        {/* <div className="status" > {status} </div> */}
        <div className='board-border' >
        	{ this.renderSquareRow (0) }
        	{ this.renderSquareRow (1) }
        	{ this.renderSquareRow (2) }
        </div>
      </div>
    );
  }
}

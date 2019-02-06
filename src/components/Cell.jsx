import React, { Component } from 'react';
import './Cell.css';

export default class Cell extends Component {
	constructor (props) {
		super (props);
		this.state = {
			digitSet: false,
		}
	}

/****************************************************
 React LifeCycle hook
 Attempts to stop un-necessary UI updates
 - the parent object will send down a boolean prop name:value
   with the name being 'redraw'
 ****************************************************/
	shouldComponentUpdate (nextProps, nextState) {
		// console.log ('Cell: this.props', this.props, 'nextProps', nextProps);
		if (nextProps.redraw)
			return true;

		if (this.props.active !== nextProps.active)
			return true;

		if (this.props.value !== nextProps.value)
			return true;

		return false;
	}

  render() {
		const { value, handleClick, bold, color, active } = this.props;
		let cName = 'cell ';

		let setBoldRed = false;
		// console.log ('>>Cell.render() >> state.digitSet', this.state.digitSet,
		// 	'props', this.props);

		if (bold || setBoldRed) {
			cName += 'bold ';
			if (setBoldRed)
				cName += 'color-red ';
		}

		if (active)
			cName += 'shaded '

		if (color === 'red')
			cName += 'color-red ';
		else if (color === 'blue')
			cName += 'color-blue '
		else if (color === 'pink')
			cName += 'color-pink '

		return (
			<button className={cName} onClick={ handleClick } >
				{ value !== 0 ? value : '' }
			</button>
		);
  }
}

// export default function Square (props)  {
// }
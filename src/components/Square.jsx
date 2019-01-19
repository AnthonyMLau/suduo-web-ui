import React, { Component } from 'react';
import './Square.css';

// export default class Square extends Component {

//   render() {
//   	const { value, handleClick } = this.props;
//     return (
//       <button 
//       		className="square" 
//       		onClick={ handleClick } >
//         {value}
//       </button>
//     );
//   }
// }

export default function Square (props)  {
	const { value, handleClick, selectedValue } = props;
	let cName = 'square';
	if (selectedValue != null && selectedValue === value-1) {
		cName += ' shaded';
	}

	return (
		<button className={cName} onClick={ handleClick } >
			{ value }
		</button>
	);
}
import { gameProperties } from './Game';

let numCheckValueInvoked = 0;
let numBackTracking = 0;
let numAssembleLegalValues = 0;
let timeStart;
let timeCheckValue;

/**********************************************
	returns an array of legal values for a particular
	cell
 **********************************************/
function assembleLegalValues (gameData, row, col) {

	numAssembleLegalValues++;
	const legalValues = [];

	// check each digit (1..9) and save the possible ones
	for (let num = 1; num <= 9; num++) {
		if (checkValue (gameData, row, col, num))
			legalValues.push (num);
	}

	// tries to ramdomize the distribution...
	const limit = legalValues.length;
	const numSwaps = ~~(limit/2);
	for (let i=0; i < numSwaps; i++) {
		const swapPairIndexOne = Math.floor (Math.random() * limit);
		const swapPairIndexTwo = Math.floor (Math.random() * limit);

		const tmpValue = legalValues[swapPairIndexOne];
		legalValues[swapPairIndexOne] = legalValues[swapPairIndexTwo];
		legalValues[swapPairIndexTwo] = tmpValue;
	}

	return legalValues;	
}

/**********************************************
	returns emptySlots:
	An array of empty slots:
	[0] = row
	[1] = col
	[2] = current index into the legal array of numbers 
				used for BackTracking
	[3] = array of legal values for this cell (row, col)
 **********************************************/
function assembleEmptySlots (gameData) {
	const { boardsPerRow, squaresPerBoardRow } = gameProperties;
	const cellsPerDataRow = boardsPerRow * squaresPerBoardRow;

	const emptySlots = [];
	let i, j;

	for (i=0; i < cellsPerDataRow; i++) {
		for (j=0; j<gameData[i].length; j++) {
			if (gameData[i][j] === 0) {

				/*** v2 ***/
				// finds the legal values for this cell
				const legalValues = assembleLegalValues (gameData, i, j);

				// emptySlots: [row, col, curIndx into legalValues, legalValues]
				emptySlots.push ([i,j,0,legalValues]);
				/*** v2 ***/

				/*** v3 ***
				emptySlots.push ([i,j,0,null])
				*** v3 ***/
			}
		}
	}

	return emptySlots;
}

/**********************************************
	returns False if value exists in row
	ALL input arguements should be immutable
 **********************************************/
function checkRow (gameData, rowIndex, value) {
	const { boardsPerRow, squaresPerBoardRow } = gameProperties;
	const cellsPerDataRow = boardsPerRow * squaresPerBoardRow;

	for (let i=0; i < cellsPerDataRow; i++)
		if (gameData[rowIndex][i] === value) 
			return false;
	return true;
}

/**********************************************
	returns False if value exists in Column
	ALL input arguements should be immutable
 **********************************************/
function checkCol (gameData, colIndex, value) {
	const { boardsPerRow, squaresPerBoardRow } = gameProperties;
	const cellsPerDataRow = boardsPerRow * squaresPerBoardRow;

	for (let i=0; i < cellsPerDataRow; i++)
		if (gameData[i][colIndex] === value)
			return false;
	return true;
}

/**********************************************
	returns False if value exists in its 3x3 board
	ALL input arguements should be immutable
 **********************************************/
function checkBoard (gameData, rowIndex, colIndex, value) {
	// finds the upper top left corner of the corresponding board
	let rowCorner = 0,
			colCorner =0;
	const { squaresPerBoardRow } = gameProperties;

	while (colIndex >= colCorner + squaresPerBoardRow)
		colCorner += squaresPerBoardRow;

	while (rowIndex >= rowCorner + squaresPerBoardRow)
		rowCorner += squaresPerBoardRow;

	let i, j;
	for (i=rowCorner; i < rowCorner + squaresPerBoardRow; i++)
		for (j=colCorner; j < colCorner + squaresPerBoardRow; j++)
			if (gameData[i][j] === value)
				return false;

	return true;
}


/**********************************************
	returns False if value exists in its row, col, or 3x3 board
 **********************************************/
export function checkValue (gameData, row, col, value) {
	const timeBegin = Date.now();
	numCheckValueInvoked++;

	const returnValue = checkRow (gameData, row, value) &&
											checkCol (gameData, col, value) &&
											checkBoard (gameData, row, col, value);

	timeCheckValue += Date.now() - timeBegin;

	return ( returnValue	);
}

/**********************************************
	puzzle solver - initial attempt
	Note: if the game is NOT solvable and we run out
	  of digits to try (and obviously will backtack
	  to i < 0, it will CRASH)
	**********************************************/
function solvePuzzle (board, emptyPositions) {
  // Variables to track our position in the solver
  var limit = 9,
      i, row, column, value, found;
  for(i = 0; i < emptyPositions.length;) {
    row = emptyPositions[i][0];
    column = emptyPositions[i][1];
    // Try the next value
    value = board[row][column] + 1;
    // Was a valid number found?
    found = false;
    // Keep trying new values until either the limit
    // was reached or a valid value was found
    while(!found && value <= limit) {
      // If a valid value is found, mark found true,
      // set the position to the value, and move to the
      // next position
      if(checkValue(board, row, column, value)) {
        found = true;
        board[row][column] = value;
        i++;
      } 
      // Otherwise, try the next value
      else {
        value++;
      }
    }
    // If no valid value was found and the limit was
    // reached, move back to the previous position
    if(!found) {
    	numBackTracking++;
      board[row][column] = 0;
      i--;
    }
  }

  // A solution was found! Log it
  board.forEach(function(row) {
    console.log(row.join());
  });
  console.log('v1-# of checkValue invoked, # of BackTracking', numCheckValueInvoked, numBackTracking);

  // return the solution
  return board;
};

/**********************************************
	puzzle solver - v2
	track the "legal/valid" values and ONLY try those
 **********************************************/
function solvePuzzle2 (board, emptyPositions) {
  // Variables to track our position in the solver
  let i=0, row, column, value, found;

  while ( i < emptyPositions.length && i >= 0) {
    row = emptyPositions[i][0];
    column = emptyPositions[i][1];

    let 	vArrayIdx = emptyPositions[i][2];
    const vArrayLength = emptyPositions[i][3].length;
    const valueArray = emptyPositions[i][3];

    // Was a valid number found?
    found = false;
    while(!found && vArrayIdx < vArrayLength) {
    	value = valueArray[vArrayIdx];

      // If a valid value is found, mark found true,
      // set the position to the value, and move to the
      // next position
      if(checkValue(board, row, column, value)) {
        found = true;
        board[row][column] = value;

        // save the current Legal array index - just in case we 
        // need to backTrace
        emptyPositions[i][2] = vArrayIdx;
        i++;
      } 
      // Otherwise, try the next value
      else {
      	vArrayIdx++
      }
    }
    // If no valid value was found and the limit was
    // reached, move back to the previous position
    if(!found) {
    	numBackTracking++;
    	// console.log ('Tried all legal values in [',i,'] and NO fit, initiating a BackTracking')
      board[row][column] = 0;
      emptyPositions[i][2] = 0;	// reset the current index into the valid array
      i--;
    }
  }

  // the puzzle is NOT solved
  if ( i < 0 ) {
  	console.log ('puzzle NOT solved.')
  }

  // A solution was found! Log it
  board.forEach(function(row) {
    console.log(row.join());
  });

  console.log('v2-# of checkValue invoked, # of BackTracking', numCheckValueInvoked, numBackTracking);

  // return the solution (if it was solved)
  return ( (i<0) ? null : board );
};

/**********************************************
	puzzle solver - v3
	NOT pre-assemble the legal values for each cell at start of game
	** ONLY look at the cell's legal value when we are here
	** we DO want to keep track of the index into the legal array if we
	** have successfully placed a value to this cell (so we can backTrack 
	** later if needed)
 **********************************************/
function solvePuzzle3 (board, emptyPositions) {
  // Variables to track our position in the solver
  let i, row, column, value, found;

  for(i = 0; i < emptyPositions.length;) {
    row = emptyPositions[i][0];
    column = emptyPositions[i][1];

    // console.log ('emptyPositions index', i);
    // console.log ('>> emptyPositions[i]', emptyPositions[i]);

    if (emptyPositions[i][3] === null)
     	emptyPositions[i][3] = assembleLegalValues (board, row, column);

    const valueArray = emptyPositions[i][3];
    let   vArrayIdx = emptyPositions[i][2];
    const vArrayLength = emptyPositions[i][3].length;

    // console.log ('>>> emptyPositions[i]', emptyPositions[i]);

    // Was a valid number found?
    found = false;
    while(!found && vArrayIdx < vArrayLength) {
    	value = valueArray[vArrayIdx];

      // If a valid value is found, mark found true,
      // set the position to the value, and move to the
      // next position
      if(checkValue(board, row, column, value)) {
        found = true;
        board[row][column] = value;

        // save the current Legal array index - just in case we 
        // need to backTrace
        emptyPositions[i][2] = vArrayIdx + 1;
        i++;
      } 
      // Otherwise, try the next value
      else {
      	vArrayIdx++
      }
    }
    // If no valid value was found and the limit was
    // reached, move back to the previous position
    if(!found) {
    	numBackTracking++;
    	// console.log ('Tried all legal values in [',i,'] and NO fit, initiating a BackTracking')
      board[row][column] = 0;
      emptyPositions[i][2] = 0;	// reset the current index into the valid array
      emptyPositions[i][3] = null;
      i--;
    }
  }

  // A solution was found! Log it
  board.forEach(function(row) {
    console.log(row.join());
  });

  console.log('v3-# of checkValue invoked, # of BackTracking', numCheckValueInvoked, numBackTracking);

  // return the solution
  return board;
};

/**********************************************
	puzzle solver
	returns the "solved" puzzle if it is solvable
	returns null if it is NOT solvable
 **********************************************/
export default function Solver (inputGameData) {

	numCheckValueInvoked = 0;
	numBackTracking = 0;
	numAssembleLegalValues = 0;
	timeCheckValue = 0;

	// console.log ('inputGameData', inputGameData);

	// Make a copy of the input data to work with
	const gameData = [];
	for (let i=0; i<inputGameData.length; i++)
		gameData.push (inputGameData[i].slice());

	// console.log ('test gameData', gameData);
	const emptySlots = assembleEmptySlots (gameData);
	// console.log ('emptySlots', emptySlots);

	timeStart = Date.now();
	timeCheckValue = Date.now();

	const solved = solvePuzzle2 (gameData, emptySlots);

	const timeTaken = Date.now() - timeStart;
	console.log ('Total time:', timeTaken, 'msec');
	console.log ('# of times assembleLegalValues() called', numAssembleLegalValues);

	return solved ? gameData : null;
}
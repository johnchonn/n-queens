/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting





// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function(n) {
  // create a new instance of a board {n:n}
  // hasAnyRooksConflicts: function() {
  //   return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
  // },

  let board = new Board({n: n});
  var solution = undefined;

  // var tree = {board: board, children:[]}

  // if board does not have conflicts, toggle a piece
  // push into children array
  for (let i = 0; i < board.rows().length; i++) {
    for (let j = 0; j < board.rows()[i].length; j++) {
      board.togglePiece(i, j);

      if (board.hasAnyRooksConflicts()) {
        board.togglePiece(i, j);
      }
    }
  }

  solution = board.rows();

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {

  // hasAnyRooksConflicts: function() {
  //   return this.hasAnyRowConflicts()  true === yes conflicts || this.hasAnyColConflicts();  true === yes conflicts

  // this function returns true if there are conflicts
  // },

  let board = new Board({n: n});
  var solutionCount = [];
  let pieces = 0; // 0

  var innerFunction = function(rows, col) {
    let somethingHappened = 0; // 1
    if (pieces === n) {
      // console.log(JSON.parse(JSON.stringify(board)));
      solutionCount.push(board);

    }

    let startingRow = rows; // 0
    let startingColumn = col; // 0

    for (let i = startingRow; i < board.rows().length; i++) {  // row: 2
      if (somethingHappened !== 0) {
        startingColumn = 0;
      }
      for (let j = startingColumn; j < board.rows().length; j++) {  // col: 0
        board.togglePiece(i, j);  // row: 0 and col: 0
        pieces++;
        if (board.hasAnyRooksConflicts()) {
          board.togglePiece(i, j);
          pieces--;
        } else if (startingColumn === board.rows().length - 1) {
          innerFunction(startingRow + 1, 0);
        } else {
          innerFunction(startingRow, startingColumn + 1);
          // board.togglePiece(i, j);
        }
      }
      somethingHappened++;
    }

    // [1, 0, 0, 0]
    // [0, 1, 0, 0]
    // [0, 0, 1, 0]
    // [0, 0, 0, 1]

    // [0, 1]
    // [1, 0]
  };

  innerFunction(0, 0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount.length;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

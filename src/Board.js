// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },

    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      // return false; // fixme

      // store the input rowIndex in a variable using "this" keyword
      // create count var set to 0
      // iterate over the rowIndex
      //   if current element equals 1
      //     increment count by 1

      // if count is greater than 1
      //   return true
      // otherwise
      //   return false

      // Get the current value of an attribute from the model. For example: note.get("title")

      let row = this.rows()[rowIndex];
      // this.get(rowIndex)
      let counter = 0;

      for (let i = 0; i < row.length; i++) {
        if (row[i] === 1) {
          counter++;
        }
      }

      if (counter > 1) {
        return true;
      } else {
        return false;
      }
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      // return false; // fixme

      // create a var that stores all the rows of our board

      // iterate over the var
      //   if the current row's elements has a conflict (use this.hasRowConflictAt)
      //     return true

      // return false

      let rows = this.rows();

      for (let i = 0; i < rows.length; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }

      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      // return false; // fixme

      // create a var that stores our board's rows
      // create an empty array var to store our columns
      // create a count var set to 0

      // iterate over the rows
      //   push the item where the current row at colIndex sits into the empty array
      // iterate over the columns array
      //   if the current item is equal to 1
      //     increment the counter by 1

      // if count is greater than 1
      //   return true
      // otherwise
      //   return false

      let newRows = this.rows();
      let counter = 0;

      for (let i = 0; i < newRows.length; i++) {
        if (newRows[i][colIndex] === 1) {
          counter++;
        }
      }

      if (counter > 1) {
        return true;
      } else {
        return false;
      }
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      // return false; // fixme

      // make a var that stores all the rows on our board

      // iterate over that var
      //   if current item in column has a conflict (use this.hasColConflictAt)
      //     return true

      // return false

      let newRows = this.rows();

      for (let i = 0; i < newRows.length; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      // return false; // fixme

      // make a var that stores all the rows on our board
      // create an empty array for the diagonals
      // create a count var set to 0
      // iterate over the rows array
      //   push the item that sits inside the current row at majorDiagonalColumnIndexAtFirstRow
      //    increment majorDiagonalColumnIndexAtFirstRow

      // iterate over the diagonals array
      //   if current item is equal to 1
      //    increment the count by 1

      // if count is greater than 1
      //   return true
      // otherwise
      //    return false

      let rows = this.rows();
      let counter = 0;
      let diagonals = [];
      let index = majorDiagonalColumnIndexAtFirstRow;

      for (let i = 0; i < rows.length; i++) {
        diagonals.push(rows[i][index]);
        index++;
      }
      // console.log(diagonals);

      for (let j = 0; j < diagonals.length; j++) {
        if (diagonals[j] === 1) {
          counter++;
        }
      }

      if (counter > 1) {
        return true;
      } else {
        return false;
      }
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      // return false; // fixme

      // create a var that stores all the rows on our board

      // iterate into the rows array

      let rows = this.rows();

      for (let i = -rows.length; i < rows.length; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      // return false; // fixme

      let rows = this.rows();
      let counter = 0;
      let diagonals = [];
      let index = minorDiagonalColumnIndexAtFirstRow;

      for (let i = 0; i < rows.length; i++) {
        diagonals.push(rows[i][index]);
        index--;
      }
      // console.log(diagonals);

      for (let j = 0; j < diagonals.length; j++) {
        if (diagonals[j] === 1) {
          counter++;
        }
      }

      if (counter > 1) {
        return true;
      } else {
        return false;
      }
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      // return false; // fixme
      let rows = this.rows();

      for (let i = 0; i < rows.length * 2; i++) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());

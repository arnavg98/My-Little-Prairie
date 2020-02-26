export default class Game {
  constructor(size) {
      this.size = size;
      this.gameState = {
          board: new Array(this.size),
          score: 0,
          won: false,
          over: false
      }
      this.moveCalls = [];
      this.winCalls = [];
      this.loseCalls = [];
      this.setupNewGame();
  }
  

  setupNewGame() {
      // for (var i = 0; i < this.gameState.board.length; i++) {
      //     this.gameState.board[i] = 0; 
      // }
      this.randomSpot();
      this.randomSpot();
  };

  loadGame(newGameState) {
      this.gameState = newGameState;
  };

  slide(row) {
      let arr = row.filter(x => x);
      let missing = this.size - arr.length;
      let zeros = Array(missing).fill(0);
      arr = arr.concat(zeros);
      return arr;
    }

    combine(row) {
      for (let i = 0; i < this.size-1; i++) {
        let curr = row[i];
        let next = row[i +1];
        if (curr == next) {
          row[i] = curr + next;
          this.gameState.score += row[i];

          if (row[i] >= 2048) {
              this.gameState.won = true;
          } 

          row[i+1] = 0;
        }
      }
      
      return row;
    }

    move(direction) {
      let temp = this.gameState.board;
      let rows = this.size;
      let tArr = [];
      let fArr = [];
      let i, i2;
      let flipped = false;
      
      
      if(direction === "up" || direction === "down"){
        for(i = 0; i < rows; i++) {
          tArr[i] = [];
          for(i2 = 0; i2 < rows; i2++) {
            tArr[i][i2] = this.gameState.board[(i2*this.size) + i];
          }
        }
        if(direction ==="down") {
          flipped = true;
        }
      }
      
      else if(direction === "left" || direction === "right") {
        for(i = 0; i < rows; i++) {
          tArr[i] =  this.gameState.board.slice(i*rows, (i+1)*rows);
        }
        if(direction ==="right") {
          flipped = true;
        }
      }

      if(flipped) { this.flip(tArr);}

      
      for(i = 0; i < rows; i++) {
        tArr[i] = this.slide(tArr[i]);
        tArr[i] = this.combine(tArr[i]);
        tArr[i] = this.slide(tArr[i]);
      }

      if(flipped) { this.flip(tArr);}

      if(direction === "up" || direction === "down") {
        for(let i = 0; i < this.size; i++) {
          for(let i2 = 0; i2 < this.size; i2++) {
            fArr.push(tArr[i2][i]);
          }
        }
      }else if (direction === "left" || direction === "right") {
        for (let i = 0; i < this.size; i++) {
          fArr = fArr.concat(tArr[i]);
        }
      }

  
      this.gameState.board = fArr; // save board
      if (this.gameState.board != temp) { // random if not same as old board
        this.randomSpot();
      }

      for (let i = 0; i < this.gameState.board.length; i++) {// checks for 2048
        if (this.gameState.board[i] >= 2048) {
          this.gameState.won = true;
        } 
      }

      if (this.isOver(fArr) && !this.gameState.won) {
        this.loseCalls.forEach(x => x(this.gameState));
      }

      if(this.gameState.won) {
        this.winCalls.forEach(x => x(this.gameState));
      }
      
      for (let i = 0; i < this.moveCalls.length; i++) {
        this.moveCalls.forEach(x => x(this.gameState));
      }
    }

    flip(grid) {
      for(let i = 0; i < this.size; i++){
        grid[i].reverse();
      }
    }

  toString() {
  };

  onMove(callback) { //Takes a callback function as input and registers that function as a listener to the move event. Every time a move is made, the game should call all previously registered move callbacks, passing in the game's current gameState as an argument to the function.
    this.moveCalls.push(callback);    
  };

  onWin(callback) {
    this.winCalls.push(callback);
  };

  onLose(callback) {
    this.loseCalls.push(callback);
  };

  getGameState() {
      return this.gameState;
  };

  randomSpot() {
      var num = Math.floor(Math.random()*this.size**2);
      var placed = false;
      for (var i = num; i >= 0; i--) {
          if (this.gameState.board[i] == 0 && placed == false) {
              this.gameState.board[i] = twoOrFour();
              placed = true;
          }
      }
      if (placed == false) {
          for (var i = num; i < this.gameState.board.length; i++) {
              if (this.gameState.board[i] == 0 && placed == false) {
                  this.gameState.board[i] = twoOrFour();
                  placed = true;
              }
          }
      }
  }

  isOver(arr) {
    if (this.gameState.win == true) {
      this.gameState.over = true;
      return true;
    }
    for (let i = 0; i < this.size*this.size-this.size; i++) {
      if (((i+1) % this.size) != 0){ 
        if(arr[i] == arr[i+1]) {
          return false;
        }
      }
        if(arr[i] == 0 || arr[i+this.size] == 0) {
          return false;
        }
        if(arr[i] == arr[i+this.size]) {
          return false;
        }
      }
      for (let i = this.size*this.size-this.size; i < this.size*this.size-1; i++) {
        if(arr[i] == arr[i+1]) {
          return false;
        }
      }
      this.gameState.over = true;
      return true;
    }
  }

export const twoOrFour = function() {
  var num = Math.random();
  if (num >= .9) {
      return 4;
  } else {
      return 2;
  }
}
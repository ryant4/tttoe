// Create a player object factory
    const Player = (name, marker) => {
    let wins = 0;
    const gotAWin = () => wins++;
    const winCount = () => wins;
    return { name, marker, gotAWin, winCount };
  };


const playerOne = Player(prompt("Enter Player One's name"), "X");
const playerTwo = Player(prompt("Enter Player Two's name"), "O");

// I had to scope this globally, I couldn't fucking figure it out
let playerOneTurn = true;
let gameOver = false;

// GAMEBOARD OBJECT
const gameBoard = (() => {
    // Create a gameboard array
    let boardArray = [];
  
    // Grab DOM elements
    const gameNotice = document.querySelector(".game-notices");
    const scoreNotice = document.querySelector(".scores");
    const resetButton = document.querySelector(".next-round");
    
    gameNotice.innerHTML = `Let's have ${playerOne.name} go first this time!`;
  
    // Check for win function
    const checkForWin = (player) => {
      const z = player.marker;
      if (
        (boardArray[0] === z && boardArray[1] === z && boardArray[2] === z) ||
        (boardArray[3] === z && boardArray[4] === z && boardArray[5] === z) ||
        (boardArray[6] === z && boardArray[7] === z && boardArray[8] === z) ||
        (boardArray[0] === z && boardArray[3] === z && boardArray[6] === z) ||
        (boardArray[1] === z && boardArray[4] === z && boardArray[7] === z) ||
        (boardArray[2] === z && boardArray[5] === z && boardArray[8] === z) ||
        (boardArray[0] === z && boardArray[4] === z && boardArray[8] === z) ||
        (boardArray[2] === z && boardArray[4] === z && boardArray[6] === z)
      ) {
        gameNotice.innerHTML = `${player.name} has won the game`;
        gameOver = true;
        player.gotAWin();
        gameEndDuties();
      }
    };
  
    // Check for tie function
    let markerCount = 0;
    const checkForTie = () => {
      if (markerCount < 8) {
        markerCount++;
      } else {
        gameNotice.innerHTML = "It looks like we have a tie";
        gameEndDuties();
      }
    };
  
    // Everything to reset the board after game over
    function gameEndDuties() {
      resetButton.style.display = "block";
      scoreNotice.innerHTML = `${playerOne.name}'s score: ${playerOne.winCount()}<br><br> ${playerTwo.name}'s score: ${playerTwo.winCount()}`;
      resetButton.addEventListener("click", () => {
        for (let btn of displayController.gameButtons) {
          btn.innerHTML = "";
        }
        boardArray.length = 0;
        markerCount = 0;
        gameOver = false;
        resetButton.style.display = "none";
        if (playerOneTurn === true) {
            gameNotice.innerHTML = `Let's have ${playerOne.name} go first this time!`;
        }
        else if (playerOneTurn === false) {
            gameNotice.innerHTML = `Let's have ${playerTwo.name} go first this time!`;
        }
      });
    }
    return { boardArray, checkForWin, checkForTie, gameNotice };
  })();
  
  // DISPLAY CONTROLLER OBJECT
  const displayController = (() => {
    // Get all the buttons
    const gameButtons = document.querySelectorAll(".game-button");
  
    // Update display function
    const updateDisplay = () => {
      for (let i = 0; i < gameBoard.boardArray.length; i++) {
        if (gameBoard.boardArray[i] !== undefined) {
          gameButtons[i].innerHTML = gameBoard.boardArray[i];
        }
      }
    };
  
    // Make each button call the makeMove function
    for (let btn of gameButtons) {
      btn.addEventListener("click", makeMove);
    }
 

    // The makeMove function checks whose turn, makes sure the spot in the array is empty, marks the board, checks for game end
    function makeMove() {
      if (gameOver === true) {
        return;
      }
        gameBoard.gameNotice.innerHTML = "";
      if (playerOneTurn === true && gameBoard.boardArray[this.id] === undefined) {
        gameBoard.boardArray[this.id] = playerOne.marker;
        playerOneTurn = false;
        gameBoard.checkForTie();
        gameBoard.checkForWin(playerOne);
      } else if (gameBoard.boardArray[this.id] === undefined) {
        gameBoard.boardArray[this.id] = playerTwo.marker;
        playerOneTurn = true;
        gameBoard.checkForTie();
        gameBoard.checkForWin(playerTwo);
      }
      updateDisplay();
    }
  
    return { updateDisplay, gameButtons };
  })();


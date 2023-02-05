// Create a gameboard object using module pattern
const gameBoard = (() => {

    // Create a gameboard array
    boardArray = [];

    // Make the array public
    return {boardArray};

})();

// Create a display controller that will keep the buttons in line with the array values
const displayController = (() => {

    // Get all the buttons
    const gameButtons = document.querySelectorAll('.game-button');

    // Create a function to iterate through the buttons to update their innerHTML to the matching array index
    const updateDisplay = () => {
        for (let i = 0; i < boardArray.length; i++) {
            if (boardArray[i] !== undefined) {
            gameButtons[i].innerHTML = boardArray[i];
            };
        };
    }

    // Create a function that checks for win
    const checkForWin = () => {
        console.log("Win check")
    };

    // Create a function that checks for a tie
    const checkforTie = () => {
        console.log("Tie check")

    };

    // Start the game with player one's turn
    let playerOneTurn = true;


    // Add event listeners to each button
    for (btn of gameButtons) {
        btn.addEventListener('click', function() {

            if (playerOneTurn === true) {
                gameBoard.boardArray[this.id] = "X"
                playerOneTurn = false;
            }
            else {
                gameBoard.boardArray[this.id] = "O"
                playerOneTurn = true;
            }
            updateDisplay();
            checkForWin();
            checkforTie();
        });
    }
    
    // Make the updateDisplay function accessible to public (maybe I don't need to do this)
    return {updateDisplay};

})();

// Create a player object factory
const Player = (name, marker) => {
    let wins = 0;
    let losses = 0
    const getWins = () => wins;
    const getLosses = () => losses;
    return {name, marker, getWins, getLosses};
};

// Eventually I might make this dynamic, but for now, here are the two players
const playerOne = Player('Ryan', 'X');
const playerTwo = Player('Alex', 'O');

// TEMPORARY INVOCATION OF THIS FUNCTION SO I KNOW ITS WORKING
displayController.updateDisplay();

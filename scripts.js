// Create a gameboard object using module pattern
const gameBoard = (() => {

    // Create a gameboard array
    boardArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

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
            gameButtons[i].innerHTML = boardArray[i];
        };
    }

    // Make the updateDisplay function accessible to public using displayController.updateDisplay();
    return {updateDisplay};

})();

// Create a player object factory
const Player = (name, marker) => {
    return {name, marker};
}

// Eventually I might make this dynamic, but for now, here are the two players
const playerOne = Player('Ryan', 'X');
const playerTwo = Player('Alex', 'O');

// TEMPORARY INVOCATION OF THIS FUNCTION SO I KNOW ITS WORKING
displayController.updateDisplay();

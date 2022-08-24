/*  A simple Tic-Tac-Toe game
Players 'X' and 'O' take turn inputing their position on the command line using numbers 1-9
1 | 2 | 3
---------
4 | 5 | 6
---------
7 | 8 | 9
*/

// importing user import library
const prompt = require('prompt-sync')({sigint: true});
const assert = require('assert');
const { count } = require('console');



// TODO: update the gameboard with the user input
function markBoard(position, mark) 
{
    board[position] = mark;
}

// TODO: print the game board as described at the top of this code skeleton
// Will not be tested in Part 1
function printBoard() 
{
    console.log("\n" + 
    board[1] + " | " + board[2] + " | " + board[3] + 
    "\n-------------\n" + 
    board[4] + " | " + board[5] + " | " + board[6] + 
    "\n-------------\n" + 
    board[7] + " | " + board[8] + " | " + board[9]);

}


// TODO: check for wrong input, this function should return true or false.
// true denoting that the user input is correct
// you will need to check for wrong input (user is entering invalid position) or position is out of bound
// another case is that the position is already occupied
// position is an input String
function validateMove(position) 
{
    if (position < 1 || position > 9)
    {
        return false;
    }

    if(position > 0 && position <= 9 && position != 'X' && position != 'O' && board[position] === ' ')
    {
        return true;
    }
    
    else 
    {
        return false;
    }
  

}

// TODO: list out all the combinations of winning, you will neeed this
// one of the winning combinations is already done for you
let winCombinations = 
[
    [1, 2, 3], [1, 4, 7], [3, 5, 7],
    [4, 5, 6], [2, 5, 8], [1, 5, 9],
    [7, 8, 9], [3, 6, 9]
];

// TODO: implement a logic to check if the previous winner just win
// This method should return with true or false
function checkWin(player) 
{
    let i, j, markCount;
    for(i = 0; i < winCombinations.length; i++)
    {
        markCount = 0;
        for(j = 0; j < winCombinations[i].length; j++)
        {
            if(board[winCombinations[i][j]] === player)
            {
                markCount++;
            }
            if(markCount == 3)
            {
                return true;
            }
            
        }
    }

    return false;
}

// TODO: implement a function to check if the game board is already full
// For tic-tac-toe, tie bascially means the whole board is already occupied
// This function should return with boolean

function checkFull() 
{
    let i, checkMark = 0;
    for(mark in board)
    {
        if(board[mark] === 'X' || board[mark] === 'O')
        {
            checkMark++;
        }
        if(checkMark == 9)
        {
            return true;
        }
        
    }
    return false;
    
}

// *****************************************************
// Copy all your code/fucntions in Part 1 to above lines
// (Without Test Cases)
// *****************************************************


// TODO: the main part of the program
// This part should handle prompting the users to put in their next step, checking for winning or tie, etc
function playTurn(player) 
{
    console.log("It's your turn player:  " + player);
    positionChoose = prompt("");
        
    if (validateMove(positionChoose) === true)
    {
        markBoard(positionChoose, player);
        printBoard();
        if(checkWin(player) === true)
        {
            console.log(`Congratulations, player ${player}! You win!!`);
            return;
        }
        if(checkFull() === true)
        {
            console.log("It's a draw!! No one wins.");
            return;
        }
        if(player === 'X')
        {
            playTurn('O');
        }
        if(player === 'O')
        {
            playTurn('X');
        }
    }
    
    else
    {
        console.log("Invalid input. Please re-enter.");
        playTurn(player);
    }

}

// entry point of the whole program
//loop starts here for every start of a game
do
{
    // The board object used to save the current status of a gameplay
    var board = 
    {
        1: ' ', 2: ' ', 3: ' ',
        4: ' ', 5: ' ', 6: ' ',
        7: ' ', 8: ' ', 9: ' '
    
    };
    console.log('\nGame started: \n\n' +
    ' 1 | 2 | 3 \n' +
    ' --------- \n' +
    ' 4 | 5 | 6 \n' +
    ' --------- \n' +
    ' 7 | 8 | 9 \n');

    var winnerIdentified = false;
    var currentTurnPlayer = 'X';


    while ((checkWin('X') === false && checkWin('O') === false) && checkFull() === false)
    {
        playTurn(currentTurnPlayer);
        
    }
    console.log("play again? Y/N");
    //loop for asking the user to enter a valid input
    do
    {
        playAgain = prompt(' ');
        if(playAgain == 'Y' || playAgain == 'y')
        {
            winnerIdentified = true;
        }
        else if(playAgain == 'N' || playAgain == 'n')
        {
            winnerIdentified = false;
        }
        else
        {
            console.log("Invalid input. Please re-enter. Y/N");
        }
    }while(playAgain != 'Y' && playAgain != 'y' && playAgain != 'n' && playAgain != 'N');
}while(winnerIdentified === true);  //Condition for the user to play again

// Bonus Point: Implement the feature for the user to restart the game after a tie or game over

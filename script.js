//Requirements

//There are 2 players and players take turns.
//  step 1 create  an array for the dice  roll for each player

// define the rollDice function

//  indicate diceroll#1 and diceroll #2

// When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.

var Dice_Roll_Game_Mode = 'Dice Roll';
var Choose_Dice_Order_Game_Mode = 'Choose Dice Order';

// initialize game with dice roll
var gamemode = Dice_Roll_Game_Mode;

// keep track of current player number
var currentPlayer = 1;

// keep track of each player dice rolls

var player1Roll = [];
var player2Roll = [];

//  keep track of each player's chosen two digit number
var player1Result;
var player2Result;
var playersResult;

var num1;
var num2;

// Helper function
var rollDice = function () {
  // produces a decimal between 0 and 6
  var randomDecimal = Math.random() * 6;

  // take off the decimal
  var randomInteger = Math.floor(randomDecimal) + 1;

  return randomInteger;
};

// function to roll dice for the player

var getDiceRoll = function () {

  // roll dice two times each independent of  the other 
  var playersRoll = [rollDice(), rollDice()]

  // assign random dice rolls to player 1
  if (currentPlayer == 1) {
    player1Roll = playersRoll;
  }
  // if currPlayer !=1 ,assume it is player2
  else {
    player2Roll = playersRoll;
  }
  //return the function
  return playersRoll;
};


var diceNumbercombination = function (num1, num2) {
  return Number(String(num1) + String(num2));
};


var getPlayerNumber = function (firstIndex) {
  var diceOrder = currentPlayer == 1 ? player1Roll : player2Roll;
  // if first dice is chosen, create player result starting with 1st dice
  if (firstIndex == 1) {
    playersResult = diceNumbercombination(diceOrder[0], diceOrder[1])
  }
  // else start the number with the result of the 2nd dice
  else {
    playersResult = diceNumbercombination(diceOrder[1], diceOrder[0])
  }
  // store in number in relevant global variable
  if (currentPlayer == 1) {
    player1Result = playersResult;
  }

  else {
    player2Result = playersResult;
  }

  return playersResult;
};

var determineWinner = function () {
  if (player1Result > player2Result) {
    return 1;
  }
  return 2;
};

var main = function (input) {

  //Get dice rolls for current player
  if (gamemode == Dice_Roll_Game_Mode) {
    var playersRoll = getDiceRoll();

    //Switch game mode to dice order
    gamemode = Choose_Dice_Order_Game_Mode;

    return `Welcome to the game Player ${currentPlayer}. <br>
      You rolled Dice 1: ${playersRoll[0]} and Dice 2: ${playersRoll[1]} <br>
      Your goal is to get the largest number possible by selecting the order of the dice <br>
      Choose the order of the dice by entering 1 or 2 as the first numeral index.`;
  }

  if (gamemode == Choose_Dice_Order_Game_Mode); {

    var firstIndex = Number(input);
    if (firstIndex !== 1 && firstIndex !== 2) {
      return `Please select 1 or 2 as the first index of your dice rolls`;
    }

    // Get player number for current player
    var playersResult = getPlayerNumber();
    var playersResultResponse = `Player ${currentPlayer}, You chose Dice ${firstIndex} first. <br>
    Your number is ${playersResult}.`;

    // If currentPlayer is Player 1, change currentPlayer to Player 2, switch mode to dice roll
    if (currentPlayer == 1) {
      currentPlayer = 2;
      gameMode = Dice_Roll_Game_Mode;
      // Return player number to Player 1, let Player 2 know it is their turn
      return `${playersResultResponse} <br>
        Welcome to the game Player 2.It is now your turn. Press Submit to roll Player 2's dice.`;
    }

    // Else if currentPlayer is Player 2, determine the winner and let the players know who won.
    else {
      var winningPlayer = determineWinner();
    };
    // Reset the game
    currentPlayer = 1;
    gameMode = Dice_Roll_Game_Mode;

    // Return the game end response
    return `${playersResultResponse} <br>
      Congratulations! Player ${winningPlayer} has won. <br>
      Player 1's number: ${player1Result} | Player 2's number: ${player2Result} <br> <br>
      Press Submit to play again.`;

  }

};















//There are 2 players and players take turns.
// When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
// The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
// After both players have rolled and chosen dice order, the player with the higher combined number wins.

//the game modes
var diceRollGameMode = 'DICE ROLL GAME MODE';
var diceOrderGameMode = 'DICE ORDER GAME MODE';
var gameMode = 'DICE ROLL GAME MODE'
var compareScore = 'COMPARE SCORE'

//current  player

var currentPlayer = 1;

// keep track of each player dice rolls

var currentPlayerRolls = [];

//  keep track of player score

var playersResult = [];

// keep track of the 2 player scores

var player1Win = 0;
var player2Win = 0;

var diceRollCombination = function () {
  var counter = 0;
  while (counter < 2) {
    currentPlayerRolls.push(rollDice());
    console.log(currentPlayerRolls, `Combination of outcome of the two dice rolls`);
    counter = counter + 1;
  }
  return `Hello Player ${currentPlayer} ! Your dice rolls : <br> Dice 1 : ${currentPlayerRolls[0]} <br> Dice 2 : ${currentPlayerRolls[1]}`;
};

// Helper function
var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomdiceNumber = Math.floor(randomDecimal) + 1;
  console.log(`computer generated random dice number`, randomdiceNumber)
  return randomdiceNumber;
};

var getPlayerScore = function (playerInput) {
  var playerScore;

  // // if input is not 1 or 2
  // if (playerInput != 1 && playerInput != 2) {
  //   console.log(`if player did not input 1 or 2`);
  //   return `Please key in either 1 or 2 to choose the Dice that you want to be the first number <br> Dice 1 : ${currentPlayerRolls[0]} <br> Dice 2 : ${currentPlayerRolls[1]}`;
  // }

  // if input is 1
  if (playerInput == 1) {
    console.log(`if player's input is 1`);
    var playerScore = Number(String(currentPlayerRolls[0]) + String(currentPlayerRolls[1])
    );
    // myOutputValue = `Hello Player ${currentPlayer},  your score is ${playerScore}`;
  }

  // if input is 2
  if (playerInput == 2) {
    console.log(`if player's input is 2`);
    var playerScore = Number(String(currentPlayerRolls[1]) + String(currentPlayerRolls[0])
    );
    // myOutputValue = `Hello Player ${currentPlayer},  your score is ${playerScore}`;
  }

  // store the player score
  playersResult.push(playerScore);
  console.log("score has been pushed to all players result");

  // clear the store value
  currentPlayerRolls = [];
  console.log(`current player rolls reset`);

  return `Player ${currentPlayer} your chosen value is   ${playerScore}`;
};

var restartGame = function () {
  currentPlayer = 1;
  playersResult = [];
  gameMode = 'DICE ROLL GAME MODE'
  console.log(`game is restarted`);
};

var main = function (input) {
  console.log(gameMode, `current game mode`)
  console.log(currentPlayer, `current player`)

  if (gameMode == diceRollGameMode) {
    console.log('game mode is in dice roll mode')

    output = `${diceRollCombination()}<br> Please key in 1 or 2 to choose yoour first dice in the order`
    // switch gamemode to dice order game mode
    gameMode = diceOrderGameMode;
    console.log(`game mode is in dice order mode`)

    return output;
  }

  if (gameMode == diceOrderGameMode) {
    // if input is not 1 or 2
    if (input != 1 && input != 2) {
      console.log(`input is INVALID`)
      return (output = `Please enter 1 or 2 to indicate the Dice that outputs the first number in your score <br> Dice 1 : ${currentPlayerRolls[0]} <br> Dice 2 : ${currentPlayerRolls[1]}`);
    }
    else {
      console.log(`player score input`)
      output = getPlayerScore(input)
    }
    if (currentPlayer == 1) {
      console.log(`end of player 1 turn, begin  player 2 turn`)
      currentPlayer = 2;
      gameMode = diceRollGameMode;
      return output + `<br> it is now player ${currentPlayer}'s turn`
    }

    if (currentPlayer == 2) {
      console.log(`end of player 2 turn`)
      gameMode = compareScore;
      console.log(`game  mode changes to compare score of players`);
    }
    return `${output} <br> click submit button to reveal the player scores`
  }

  if (gameMode == compareScore) {
    // if tie
    if (playersResult[0] == playersResult[1]) {
      console.log(`it's a draw`)
      outputValue = `It's a DRAW! No player wins this round`
    }

    // if player 1 wins

    if (playersResult[0] > playersResult[1])  {
      console.log("player 1 wins")
      player1Win ++;
      outputValue = `Player 1 WINS this round`
    }
    //if player 2  wins
    if (playersResult[0] < playersResult[1])  {
      console.log("player 2 wins")
      player2Win ++;
      outputValue = `Player 2 WINS this round`
    }
    console.log (`players' score compared`);
    restartGame();
  
    return `<b> ${outputValue} <b> <br> <br> The current score is <br> Player 1:${player1Win} <br> Player2:${player2Win} <br> Click submit to  play again!`;

  }
};
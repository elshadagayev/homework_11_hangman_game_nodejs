var Word = require("./my_modules/Word");
var Words = require("./my_modules/Words");
var inquirer = require("inquirer");
var chalk = require('chalk');
var HangmanDraw = require('./my_modules/hangman-draw');

var wins = looses = 0;

var tryCount = 0;
var words = new Words();
var word = null;
var hangmanDraw = new HangmanDraw();


word = getWord ();
const TRY_LIMIT = 27;
tryCount = setTryCount();

console.log(chalk.bold("This is the Hangman game. You have to guess Car Manufacturers. So let's go!!!\n\n"));

ask();

function ask () {
	if(!word.guessedLetters.length)
		console.log(chalk.yellow("Manufacturer country is", word.country, ", Guesses left", tryCount));
	inquirer.prompt([
		{
			type: 'input',
			message: "Guess letter: " + word.toString(),
			name: "letter",
			validate: function(name) {
				if(name.trim().length !== 1) {
					console.log("\nType only one letter\n");
					return false;
				}

				return true;
			}
		}
	]).then(function(res){
		var isCorrect = word.guess(res.letter);
		if(!word.isFinished() && tryCount > 0) {
			if(isCorrect)
				console.log(chalk.green("\nCORRECT!!!", "Guesses left", tryCount--));
			else {
				console.log(chalk.red("\nTry again!", "Guesses left", tryCount--));
				hangmanDraw.draw(TRY_LIMIT - tryCount);
			}

			if(word.guessedLetters.length)
				console.log(chalk.bold("Guessed letters are", word.guessedLetters.join(", "), "\n\n"));
			ask();
		} else {
			if(word.isFinished()) {
				console.log(chalk.bold(chalk.green("You won!", "Car Manufacturer is", word.toString())));
				wins++;
			}
			else if(tryCount <= 0) {
				console.log(chalk.bold(chalk.red("You lost!", "Car Manufacturer is", word.realWord)));
				hangmanDraw.draw(TRY_LIMIT + 1);
				looses++;
			}

			inquirer.prompt([
				{
					type: 'confirm',
					message: 'Do you want to play again?',
					name: 'play_again',
				}
			]).then(function(res){
				if(res.play_again) {
					word = getWord();
					tryCount = setTryCount();
					ask();
				} else {
					console.log(chalk.bold("\n\n--------------------------\n\Wins:", wins + ",", "Looses:", looses + ".", "Bye!\n--------------------------\n\n"));
				}
			})
		}
	});
}


function getWord () {
	return new Word(words.getWord());
}

function setTryCount () {
	return TRY_LIMIT;
}
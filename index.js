var Word = require("./my_modules/Word");
var Words = require("./my_modules/Words");
var inquirer = require("inquirer");

var wins = looses = 0;

var tryCount = 0;
var words = new Words();
var word = null;


word = getWord ();
tryCount = setTryCount();

console.log("This is the Hangman game. You have to guess Car Manufacturers. So let's go!!!\n\n");

ask();

function ask () {
	if(!word.guessedLetters.length)
		console.log("Manufacturer country is", word.country, ", Guesses left", tryCount);
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
				console.log("\nCORRECT!!!", "Guesses left", tryCount--);
			else {
				console.log("\nTry again!", "Guesses left", tryCount--);
			}

			if(word.guessedLetters.length)
				console.log("Guessed letters are", word.guessedLetters.join(", "), "\n\n");
			ask();
		} else {
			if(word.isFinished()) {
				console.log("You won!", "Car Manufacturer is", word.toString());
				wins++;
			}
			else if(tryCount <= 0) {
				console.log("You lost!", "Car Manufacturer is", word.realWord);
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
					console.log("Wins:", wins + ",", "Looses:", looses + ".", "Bye!");
				}
			})
		}
	});
}


function getWord () {
	return new Word(words.getWord());
}

function setTryCount () {
	return word.length * 2;
}
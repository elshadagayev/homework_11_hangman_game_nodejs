var Letter = require("./Letter");

var Word = function (word) {
	this.word = [];
	this.realWord = "";
	this.country = "";
	this.length = 0;
	this.guessedLetters = [];

	this.setWord = function(word) {
		this.realWord = word['car'];
		for(var i in word['car']) {
			var letter = new Letter(word['car'][i]);
			this.word.push(letter);
			if(letter.isLetter())
				this.length++;
		}

		this.country = word['country'];
	}

	this.toString = function () {
		var str = "";
		for(var i in this.word) {
			str += this.word[i].toString();
		}

		return str;
	}

	this.setWord(word);

	this.guess = function(letter) {
		var isCorrect = false;
		for(var i in this.word) {
			var guessed = this.word[i].guess(letter);
			if(!isCorrect && guessed === 1) {
				isCorrect = true;
			}
		}

		if(this.guessedLetters.indexOf(letter.toLowerCase()) === -1)
			this.guessedLetters.push(letter.toLowerCase());

		return isCorrect;
	}

	this.isFinished = function () {
		var length = 0;
		for(var i in this.word)
			if(this.word[i].guessed)
				length++;
		return length > 0 && length === this.length;
	}
}

module.exports = Word
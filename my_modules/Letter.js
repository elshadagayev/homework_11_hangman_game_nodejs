var Letter = function Letter (letter) {
	this.letter = letter;
	this.guessed = false;

	this.guess = function (letter) {
		if(!this.guessed) {
			if(letter.trim().toLowerCase() === this.letter.trim().toLowerCase()) {
				this.guessed = true;
				return 1;
			} else {
				return 0;
			}
		} else {
			return -1;
		}
	}

	this.isLetter = function () {
		return this.letter.match(/^[0-9a-z]$/gi);
	}

	this.toString = function () {
		if(this.letter === " ") {
			return " ";
		} else if(this.guessed) {
			return this.letter;
		} else {
			return "-";
		}
	}
}


module.exports = Letter
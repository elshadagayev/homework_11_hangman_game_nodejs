var words = {
	"Italia": [
		"Maserati",
		"Lamborghini",
		"Ferrari",
	],
	"Japan": [
		"Honda",
		"Lexus",
		"Mitsubishi",
		"Infiniti",
		"Nissan",
		"Suzuki",
		"Toyota",
	],
	"Korea": [
		"Kia Motors",
	],
	"Russia": [
		"Lada",
		"Volga"
	],
	"USA": [
		"Chrysler",
		"Dodge",
		"Jeep",
		"Ram",
		"Ford",
		"Lincoln",
		"Tesla Motors",
		"Hennessey"
	],
	"Germany": [
		"Porsche",
		"Audi",
		"BMW",
		"Daimler",
		"Lloyd",
		"Maybach",
		"Mercedes Benz",
		"Opel",
		"Volkswagen",
	]
}

var Words = function () {
	this.getWord = function () {
		var countries = Object.keys(words);
		var country = countries[Math.floor(Math.random() * (countries.length - 1))];
		var cars = words[country];
		var car = cars[Math.floor(Math.random() * (cars.length - 1))];
		return {
			country,
			car
		}
	}
}

module.exports = Words;
module.exports = function(score) {
	if (score > 85) return 'A';
	else if (score > 70) return 'B';
	else if (score > 55) return 'C';
	else if (score) return 'E';
	else return 'Empty'
}
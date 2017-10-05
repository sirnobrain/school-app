const express = require('express');
const router = express.Router();
const model = require('./../models');

router.get('/', (req, res) => {
	model.Subject.findAll()
	.then(subjects => {
		res.render('subjects', {subjects});
	});
});

module.exports = router;
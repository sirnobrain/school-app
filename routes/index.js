const express = require('express');
const router = express.Router();
const models = require('./../models');

router.get('/', (req, res) => {
	console.log(req.session);
	res.render('index');
});

router.get('/login', (req, res) => {
	res.render('login');
});

router.post('/login', (req, res) => {
	const options = {
		where: {
			username: req.body.username
		}
	}
	models.User.findOne(options)
	.then(user => {
		if (user.password === req.body.password) {
			// all clear, set session
			const sessionUser = {
				username: user.username,
				role: user.role
			}
			req.session.user = sessionUser;
			res.redirect('/');
		} else {
			res.redirect('/login');
		}
	})
	.catch(err => {
		res.redirect('/login');
		// cek kalo usernamenya ga ada
		// atau error pas query
	});
});

router.get('/logout', (req, res) => {
	req.session.destroy(err => {
		if (err) throw err;
		res.redirect('/');
	});
});

module.exports = router;
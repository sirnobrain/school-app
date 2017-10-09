const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const models = require('./../models');
const randomSalt = require('./../helpers/randomSalt');

router.get('/', (req, res) => {
	const menubar = req.menubar;
	res.render('index', {menubar});
});

router.post('/', (req, res) => {
	const menubar = req.menubar;
	const registerUser = (req, res) => {
		const options = {
			username: req.body.username,
			password: req.body.password,
			role: req.body.role,
			salt: randomSalt(),
			createdAt: new Date(),
			updatedAt: new Date()
		}
		models.User.create(options)
		.then(() => {
			res.redirect('/login');
		})
		.catch(err => {
			if (err.name === 'SequelizeValidationError') {
				registerUser(req, res);
			} else if (err.name === 'SequelizeUniqueConstraintError') {
				res.render('index', {menubar, err});
			} else {
				throw err;	
			}
		});
	}

	registerUser(req, res);
});

router.get('/login', (req, res) => {
	const menubar = req.menubar;
	res.render('login', {menubar});
});

router.post('/login', (req, res) => {
	const options = {
		where: {
			username: req.body.username
		}
	}
	models.User.findOne(options)
	.then(user => {
		const password = crypto.createHmac('sha256', user.salt)
                        .update(req.body.password)
                        .digest('hex');
		if (user.password === password) {
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
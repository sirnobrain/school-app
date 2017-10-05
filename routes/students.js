const express = require('express');
const router = express.Router();
const model = require('./../models');

router.get('/', (req, res) => {
	model.Student.findAll({order: [['id', 'asc']]})
	.then(students => {
		res.render('students', {students});
	})
});

router.get('/add', (req, res) => {
	res.render('student-add');
});

router.post('/add', (req, res) => {
	model.Student.create({
		first_name: req.body.first_name, 
		last_name: req.body.last_name, 
		email: req.body.email,
		createdAt: new Date(),
		updatedAt: new Date()
	})
	.then(() => {
		res.redirect('/students');
	})
	.catch(err => {
		res.render('student-add', {err})
	});
});

router.get('/edit/:id', (req, res) => {
	model.Student.findById(req.params.id)
	.then(student => {
		res.render('student-edit', {student});
	});
});

router.post('/edit/:id', (req, res) => {
	const newValues = {
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		email: req.body.email,
		updatedAt: new Date()
	}
	const condition = {
		where: {id: req.params.id}
	};
	model.Student.update(newValues, condition)
	.then(() => {
		res.redirect('/students');
	});
});

router.get('/delete/:id', (req, res) => {
	const condition = {
		where: {id: req.params.id}
	};
	model.Student.destroy(condition)
	.then(() => {
		res.redirect('/students');
	});
});

module.exports = router;
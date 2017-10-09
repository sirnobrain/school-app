const express = require('express');
const router = express.Router();
const models = require('./../models');
const checkAccessToTeachers = require('./../helpers/checkAccessToTeachers');

router.use(checkAccessToTeachers);

router.get('/', (req, res) => {
	const condition = {
		include: [{
			model: models.Subject
		}]
	};

	models.Teacher.findAll(condition)
	.then(teachers => {
		res.render('teachers', {teachers});
	})
	.catch(err => {
		if (err) throw err;
	});
});

router.get('/add', (req, res) => {
	models.Subject.findAll()
	.then(subjects => {
		res.render('teacher-add', {subjects});
	})
	.catch(err => {
		if (err) throw err;
	});
});

router.post('/add', (req, res) => {
	models.Teacher.create({
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		email: req.body.email,
		SubjectId: req.body.SubjectId,
		createdAt: new Date(),
		updatedAt: new Date()
	})
	.then(() => {
		res.redirect('/teachers');
	})
	.catch(err => {
		models.Subject.findAll()
		.then(subjects => {
			res.render('teacher-add', {subjects, err});
		});
	});
});

router.get('/edit/:id', (req, res) => {
	const condition = {
		include: [{
			model: models.Subject
		}]
	};
	Promise.all([models.Teacher.findById(req.params.id, condition), models.Subject.findAll()])
	.then(values => {
		let data = {
			teacher: values[0],
			subjects: values[1]
		}
		res.render('teacher-edit', {data});
	})
	.catch(err => {
		if (err) throw err;
	});
});

router.post('/edit/:id', (req, res) => {
	const newValues = {
		id: req.params.id,
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		email: req.body.email,
		SubjectId: req.body.SubjectId,
		updatedAt: new Date()
	}
	const condition = {
		where: {id: req.params.id}
	};

	models.Teacher.update(newValues, condition)
	.then(() => {
		res.redirect('/teachers');
	})
	.catch(err => {
		if (err) throw err;
	});
});

router.get('/delete/:id', (req, res) => {
	const condition = {
		where: {id: req.params.id}
	};
	models.Teacher.destroy(condition)
	.then(() => {
		res.redirect('/teachers');
	})
	.catch(err => {
		if (err) throw err;
	});
});

module.exports = router;
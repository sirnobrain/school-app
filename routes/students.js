const express = require('express');
const router = express.Router();
const models = require('./../models');

router.get('/', (req, res) => {
	models.Student.findAll({order: [['id', 'asc']]})
	.then(students => {
		res.render('students', {students});
	})
	.catch(err => {
		if (err) throw err;
	})
});

router.get('/add', (req, res) => {
	res.render('student-add');
});

router.post('/add', (req, res) => {
	models.Student.create({
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
	models.Student.findById(req.params.id)
	.then(student => {
		res.render('student-edit', {student});
	})
	.catch(err => {
		if (err) throw err;
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
	models.Student.update(newValues, condition)
	.then(() => {
		res.redirect('/students');
	})
	.catch(err => {
		if (err) throw err;
	});
});

router.get('/delete/:id', (req, res) => {
	const condition = {
		where: {id: req.params.id}
	};

	models.Student.destroy(condition)
	.then(() => {
		res.redirect('/students');
	})
	.catch(err => {
		if (err) throw err;
	});
});

router.get('/:id/addsubject', (req, res) => {
	const condition = {
		where: {id: req.params.id}
	};

	Promise.all([models.Student.findById(req.params.id), models.Subject.findAll()])
	.then(values => {
		const data = {
			student: values[0],
			subjects: values[1]
		}

		res.render('student-add-subject', {data});
	})
	.catch(err => {
		if (err) throw err;
	});
});

router.post('/:id/addsubject', (req, res) => {
	const values = {
		StudentId: req.params.id,
		SubjectId: req.body.SubjectId,
		score: null,
		updatedAt: new Date(),
		createdAt: new Date()
	}

	models.StudentSubject.create(values)
	.then(() => {
		res.redirect('/students');
	})
	.catch(err => {
		console.log(JSON.stringify(err, null, 4));
	});
});

module.exports = router;
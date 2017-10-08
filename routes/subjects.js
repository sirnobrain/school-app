const express = require('express');
const router = express.Router();
const models = require('./../models');

router.get('/', (req, res) => {
	const condition = {
		include: [{
			model: models.Teacher
		}]
	};

	models.Subject.findAll(condition)
	.then(subjects => {
		res.render('subjects', {subjects});
	})
	.catch(err => {
		if (err) throw err;
	});
});

router.get('/:id/enrolledstudents', (req, res) => {
	const condition = {
		include: [
			{
				model: models.StudentSubject,
				attributes: ['id', 'score'],
				include: [
					{
						model: models.Student,
						attributes: ['first_name', 'last_name']
					}
				]
			}
		]
	}

	models.Subject.findById(req.params.id, condition)
	.then(subject => {
		res.render('subject-enrolled-students', {subject});
	})
	.catch(err => {
		if (err) throw err;
	});
});

router.get('/:id/givescore', (req, res) => {
	const condition = {
		where: {
			id: req.params.id
		},
		include: [models.Student, models.Subject],
		attributes: ['id']
	}

	models.StudentSubject.findOne(condition)
	.then(studentSubject => {
		res.render('subject-give-score', {studentSubject});
	})
	.catch(err => {
		if (err) throw err;
	});
});

router.post('/:id/givescore', (req, res) => {
	const newValues = {
		score: req.body.score,
		updatedAt: new Date()
	}
	const condition = {
		where: {
			id: req.params.id
		}
	}

	models.StudentSubject.update(newValues, condition)
	.then(() => {
		res.redirect(`/subjects/${req.body.subject_id}/enrolledstudents`)
	})
	.catch(err => {
		if (err) throw err;
	});
});

module.exports = router;
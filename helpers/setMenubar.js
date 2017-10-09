module.exports = function(req, res, next) {
	req.menubar = {
		students: false,
		subjects: false,
		teachers: false,
		loggedIn: false
	};

	if (req.session.hasOwnProperty('user')) {
		switch(req.session.user.role) {
			case 'headmaster':
				req.menubar.students = true;
				req.menubar.subjects = true;
				req.menubar.teachers = true;
				req.menubar.loggedIn = true;
				break;
			case 'teacher':
				req.menubar.students = true;
				req.menubar.loggedIn = true;
				break;
			case 'academic':
				req.menubar.students = true;
				req.menubar.subjects = true;
				req.menubar.loggedIn = true;
				break;
		}
	}

	next();
}
module.exports = function(req, res, next) {
	if (req.session.hasOwnProperty('user')) {
		if (req.session.user.role === 'headmaster') {
			next();
		} else {
			// do not have access
			res.redirect('/');
		}
	} else {
		// haven't login yet
		res.redirect('/');
	}
}
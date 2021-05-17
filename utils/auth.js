const withAuth = (request, response, next) => {
	if(!request.session.logged_in){
		response.redirect('/');
	} else {
		next();
	}
};

module.exports = withAuth;
const router = require('express').Router();

router.get('*', (request, response) => {
	response.status(404).send();
});

module.exports = router;
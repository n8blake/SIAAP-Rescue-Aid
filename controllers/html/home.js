const router = require('express').Router();
const { Listing } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (request, response) => {
	try {
		const listingsData = await Listing.findAll({
			order: [['name', 'ASC']],
		});

		const listings = listingsData.map((listing) => listing.get({ plain: true }));

		response.render('homepage', {
			listings,
			logged_in: request.session.logged_in,
		});

	} catch (error) {
		response.status(500).json(error);
	}
});

module.exports = router;
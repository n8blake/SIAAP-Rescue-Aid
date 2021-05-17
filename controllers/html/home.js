const router = require('express').Router();
const { Listing, User, Rating, Type, ListingType, Image } = require('../../models');
const withAuth = require('../../utils/auth');

const listingQueryConfig = {
		attributes: [ 
			'listing_id',
			'name',
			'description',
			'location',
			'height',
			'width',
			'depth',
			'weight',
			'year',
			'createdAt',
			'updatedAt'
		],
		include: [
			{ model: Type ,
				attributes: [ 
					'type'
				]
			},
			{ model: Rating ,
				attributes: [
					'used_new',
					'soft_firm',
					'ugly_cute'
				]
			},
			{ model: User ,
				attributes: [ 
					'user_name'
				]
			},
			{ model: Image ,
				attributes: [
					'title',
					'description',
					'url'
				]
			}
		],
		order: [['createdAt', 'ASC']]
	};

router.get('/', async (request, response) => {
	try {
		const listingsData = await Listing.findAll(listingQueryConfig);

		const listings = listingsData.map((listing) => listing.get({ plain: true }));
		//console.log(listings);

		response.render('homepage', {
			listings,
			logged_in: request.session.logged_in,
			user_name: request.session.user_name
		});

	} catch (error) {
		response.status(500).json(error);
	}
});

module.exports = router;
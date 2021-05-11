const router = require('express').Router();
const { Listing, User, Rating, Type, ListingType, Image } = require('../../models');

const listingQueryConfig = {
		attributes: [ 
			'listing_id',
			'name',
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
		]
	};

router.get('/', async (request, response) => {
	// get all the listingings
	try {
		const listings = await Listing.findAll(listingQueryConfig).catch((error) => {response.json(error)});
		if(listings){
			response.json(listings);		
		} else {
			response.status(404);
		}
		
	} catch(error) {
		response.status(500).json(error);
	}
	
});

router.get('/:id', async (request, response) => {
	
	// get a listinging by its id
	const listing = await Listing.findByPk(request.params.id, listingQueryConfig).catch((error) => {
		response.json(error);
	});

	response.json(listing);

});


router.post('/', async (request, response) => {

	// post a new listing
	try {

	} catch (error) {
		response.status(400).
	}

});

router.put('/:id', async (request, response) => {

	// update a listing by id

});

router.delete('/:id', async (request, response) => {

	// delete a listing by id

});

module.exports = router;
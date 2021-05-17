const router = require('express').Router();
const { Listing, User, Rating, Type, ListingType, Image } = require('../../models');

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
					'user_name',
					'user_id'
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

router.get('/:id', async (request, response) => {
	try {
		// get a listinging by its id
		const listingData = await Listing.findByPk(request.params.id, listingQueryConfig).catch((error) => {
			response.json(error);
		});
		const listing = listingData.get({plain: true});
		
		//console.log(listing);
		//const listing = listingData.map((listing) => listing.get({ plain: true }));
		//const this_user = await (listing.user.user_id == request.session.user_id);
		//console.log(this_user);
		const users_listing = (listing.user.user_id == request.session.user_id);
		if(listing){
			response.render('listing', {
				listing,
				user_id: request.session.user_id,
				users_listing: users_listing,
				logged_in: request.session.logged_in,
			});
		} else {
			response.status(404);
		}
	} catch (error) {
		console.log(error);
		response.status(500);
	}
	

});

module.exports = router;
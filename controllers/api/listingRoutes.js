const router = require('express').Router();
const { Listing, User, Rating, Type, ListingType, Image } = require('../../models');
const withAuth = require('../../utils/auth');

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
	try {
		// get a listinging by its id
		if(Number.isInteger(request.params.id)){
			const listing = await Listing.findByPk(request.params.id, listingQueryConfig).catch((error) => {
				response.json(error);
			});
			if(listing){
				response.json(listing);	
			} else {
				response.status(404);
			}
		} else {
			response.status(400);
		}
		
	} catch (error) {
		console.log(error);
		response.status(500);
	}
	

});

router.post('/', async (request, response) => {

	// post a new listing
	/*
		expect body to look like:
		{
			"name":"myName",
			"description":"My listing description",
			"location":"My Listing, Location",
			"height":"0",
			...
			"user_id":"userid",
			"image"{
				"title":"My Image Title",
				"description":'My Image description',
				"image_url":"my.image.url/image"
			}
			"rating":{
				"new_used":1,
				"soft_firm":2,
				"ugly_cute":2
			},
			"types":[
				"myType1",
				"myType2"
			]
		}
	*/
	try {
		if(!request.body.user_id){
			request.body.user_id = request.session.user_id;
		}
		Listing.create(request.body).then(async listing => {
			try {
				if(request.body.types && request.body.types.length){
					await request.body.types.forEach(async _type => {
						// query for the type
						let typeData = await Type.findOne({where: {type: _type}});
						if(!typeData){
							//create a new type
							typeData = await Type.create({type: _type});	
						}
						const type = typeData.get({ plain: true});
						const listingType = await ListingType.create({listing_id: listing.listing_id, type_id: type.type_id});
					});
				}
				if(request.body.rating){
					// create a rating
					request.body.rating.listing_id = listing.listing_id;
					const rating = await Rating.create(request.body.rating);
					if(rating.rating_id){
						// update the image id in Lisitng
						await Listing.update({rating_id: rating.rating_id}, { where: {
							listing_id: listing.listing_id }
						});
					}
				}
				if(request.body.image){
					// create an image
					const image = await Image.create(request.body.image);
					if(image.image_id){
						// update the image id in Lisitng
						await Listing.update({image_id: image.image_id}, { where: {
							listing_id: listing.listing_id }
						});
					}
				}
				if(listing){
					response.redirect('/listing/' + listing.listing_id);
					//response.status(200).json(listing);
				} else {
					response.status(400);
				}
			} catch (error) {
				response.status(410).json(error);
			}
		});
	} catch (error) {
		response.status(500).json(error);
	}

});

//withAuth
router.put('/:id', async (request, response) => {
	console.log(request.params.id);
	console.log(request.body);
	// update a listing by id
	try {
		Listing.update(request.body, {
			where: {
				listing_id: request.params.id
			}
		})
		// .then((listing) => {
		// 	return ListingType.findAll({where: {listing_id: request.params.id}});
		// })
		// .then((existinglistingTypes) => {
		// 	const listingTypes = existinglistingTypes.map(({type}) => type);
		// 	// the request.body has types (names) not type_ids
		// 	const newListingTypes = request.body.types.filter(type => !listingTypes.includes(type))
		// 	.map(type => {
		// 		return {

		// 		}
		// 	})

		// })
		.then(async listing => {
			console.log('---');
			console.log(listing[0]);
			console.log('---');

			try {
				// 
				// if(request.body.types && request.body.types.length){
				// 	//const typesIdArray = [];
				// 	await request.body.types.forEach(async _type => {
				// 		// query for the type
				// 		let type = await Type.findOne({where: {type: _type}});
				// 		if(!type){
				// 			//create a new type
				// 			type = await Type.create({type: _type});
				// 		}
				// 		//typesIdArray.push(type.type_id);
				// 	});
				// }
				// if(request.body.rating){
				// 	// create a rating
				// 	request.body.rating.listing_id = listing.listing_id;
				// 	const rating = await Rating.create(request.body.rating);
				// 	if(rating.rating_id){
				// 		// update the image id in Lisitng
				// 		await Listing.update({rating_id: rating.rating_id}, { where: {
				// 			listing_id: listing.listing_id }
				// 		});
				// 	}
				// }
				// if(request.body.image){
				// 	// create an image
				// 	const image = await Image.create(request.body.image);
				// 	if(image.image_id){
				// 		// update the image id in Lisitng
				// 		await Listing.update({image_id: image.image_id}, { where: {
				// 			listing_id: listing.listing_id }
				// 		});
				// 	}
				// }
				if(listing[0]){
					response.status(200).json(listing);
				} else {
					response.status(400).json(listing);
				}
			} catch (error) {
				console.log(error);
				response.status(410).json(error);
			}
		});

	} catch (error) {
		response.status(500).json(error);
	}
});

router.delete('/', async (request, response) => {

	// delete a listing by id
	try {
		Listing.destroy({where: {listing_id: request.body.listing_id}})
			.then((code) => {
				code === 1 ? response.status(200).json(code) : response.status(400).json(code);
			})
			.catch((error) => {
				console.log(error);
				response.status(400).json(error);
			});
	} catch (error) {
		response.status(500).json(error);
	}
});

module.exports = router;
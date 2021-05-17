function preflightValidation(value) {
	if(value.length){
		return value;
	}
	return null;
}
/*
{
			"name":"My Other Little Buddy 6",
			"description":"He was my other friend 6",
			"location":"My Listing, Location",
			"height":"11",
			"user_id":"1",
			"image":{
				"title":"My Image Title",
				"description":"My Image description",
				"url":"my.image.url/image"
			},
			"rating":{
				"used_new":1,
				"soft_firm":2,
				"ugly_cute":2
			},
			"types":[
				"myType1",
				"myType2"
			]

		}
*/

const newListingFormHandler = async (event) => {
	event.preventDefault(); 

	const name = document.querySelector('#name').value.trim();
	const description = document.querySelector('#description').value.trim();
	const location = document.querySelector('#location').value.trim();
	const imageURL = document.querySelector('#image').value.trim();
	const weight = preflightValidation(document.querySelector('#weight').value.trim());
	const height = preflightValidation(document.querySelector('#height').value.trim());
	const width = preflightValidation(document.querySelector('#width').value.trim());
	const depth = preflightValidation(document.querySelector('#depth').value.trim());
	
	try {
		if (name && description && location && image) {
			console.log("creating new listing ");
			// how do I get the listing ID here...???
			const listingUrl = '/api/listings/';
			const response = await fetch(listingUrl, {
				method: 'POST',
				body: JSON.stringify({
					name,
					description,
					location,
					image:{
						"title":name,
						"description":description,
						"url":imageURL
					},
					weight,
					height,
					width,
					depth
				}),
				headers: { 'Content-Type': 'application/json' },
			});
			console.log(response);
			if (response.ok && response.url) {
				// refresh this page....
				//const listing_id = response.listing_id;
				document.location.replace(response.url);
			} else {
				console.log(response);
				alert('Failed to create listing');
			}
		} else {
			// show form validation error
			alert('Missing required fields!');
		}
	} catch (error) {
		console.log(error);
	}
	
};

document.querySelector('#new-form').addEventListener('submit', newListingFormHandler);
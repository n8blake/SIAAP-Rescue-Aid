function preflightValidation(value) {
	if(value.length){
		return value;
	}
	return null;
}

const updateFormHandler = async (event) => {
	event.preventDefault(); 

	const name = document.querySelector('#name').value.trim();
	const description = document.querySelector('#description').value.trim();
	const location = document.querySelector('#location').value.trim();
	const image = document.querySelector('#image').value.trim();
	const weight = preflightValidation(document.querySelector('#weight').value.trim());
	const height = preflightValidation(document.querySelector('#height').value.trim());
	const width = preflightValidation(document.querySelector('#width').value.trim());
	const depth = preflightValidation(document.querySelector('#depth').value.trim());
	const year = preflightValidation(document.querySelector('#year').value.trim());	
	const listing_id = document.querySelector('#listing_id').value.trim();
	


	try {
		if (name && description && location && image) {
			console.log("updating listing " + listing_id);
			// how do I get the listing ID here...???
			const listingUrl = '/api/listings/' + listing_id;
			const response = await fetch(listingUrl, {
				method: 'PUT',
				body: JSON.stringify({
					name,
					description,
					location,
					image,
					weight,
					height,
					width,
					depth,
					year
				}),
				headers: { 'Content-Type': 'application/json' },
			});

			if (response.ok) {
				// refresh this page....
				document.location.replace('/listing/' + listing_id);
			} else {
				console.log(response);
				alert('Failed to update listing');
			}
		}
	} catch (error) {
		console.log(error);
	}
	
};

const deleteListingHandler = async(event) => {
	event.preventDefault(); 
	const listing_id = document.querySelector('#listing_id').value.trim();
	// prompt to confirm
	// then 
	const response = await fetch('/api/listings/', {
		method: 'DELETE',
		body: JSON.stringify({
			listing_id
		}),
		headers: { 'Content-Type': 'application/json' }
	});
	console.log("Deleting listing " + listing_id);
	if(response.ok){
		document.location.replace('/');
	} else {
		alert('Failed to delete listing');
	}
};

document.querySelector('#update-form').addEventListener('submit', updateFormHandler);
document.querySelector('#delete-listing-btn').addEventListener('click', deleteListingHandler);

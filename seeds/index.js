const sequelize = require('../config/connection');
const { User, Listing, ListingType, Rating, Type, Image } = require('../models');

const userData = require('./userData.json');
const listingData = require('./listingData.json');
const listingTypesData = require('./listingTypesData.json');
const ratingData = require('./ratingData.json');
const typesData = require('./typesData.json');
const imagesData = require('./imagesData.json');

const seedDatabase = async () => {
	await sequelize.sync({ force: true });

	await User.bulkCreate(userData, {
		individualHooks: true,
		returning: true,
	});

	await Listing.bulkCreate(listingData);
	await Image.bulkCreate(imagesData);
	await Rating.bulkCreate(ratingData);
	await Type.bulkCreate(typesData);
	await ListingType.bulkCreate(listingTypesData);

	process.exit(0);
};

seedDatabase();
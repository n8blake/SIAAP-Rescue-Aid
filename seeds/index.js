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

	const users = await User.bulkCreate(userData, {
		individualHooks: true,
		returning: true,
	});

	await Listing.bulkCreate(listingData);
	await Image.bulkCreate(imagesData);
	await Rating.bulkCreate(ratingData);
	await Type.bulkCreate(typesData);
	await ListingType.bulkCreate(listingTypesData);
	// const articles = [];

	// for (const article of articleData) {
	// 	const _article = await Article.create({
	// 		...article,
	// 		user_id: users[Math.floor(Math.random() * users.length)].user_id,
	// 	});
	// 	articles.push(_article);
	// }

	// for (const comment of commentData){
	// 	await Comment.create({
	// 		...comment, 
	// 		user_id: users[Math.floor(Math.random() * users.length)].user_id,
	// 		article_id: articles[Math.floor(Math.random() * articles.length)].article_id,
	// 	});
	// }

	process.exit(0);
};

seedDatabase();
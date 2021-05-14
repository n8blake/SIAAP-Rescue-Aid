const User = require('./User');
const Listing = require('./Listing');
const ListingType = require('./ListingType');
const Rating = require('./Rating');
const Type = require('./Type');
const Image = require('./Image');

User.hasMany(Listing, {
	foreignKey: 'user_id',
	onDelete: 'CASCADE'
});

Image.belongsTo(Listing, {
	foreignKey: 'image_id',
	onDelete: 'CASCADE'
});

Listing.hasOne(Rating, {
	foreignKey: 'rating_id'
});

Listing.hasOne(Image, {
	foreignKey: 'image_id'
});

Listing.belongsTo(User, {
	foreignKey: 'user_id'
});

// Listing belongToMany Types (through ListingType)
Listing.belongsToMany(Type, {
	through: 'listing_type',
	foreignKey:'listing_id'
});

// Type belongToMany Listing (through ListingType)
Type.belongsToMany(Listing, {
	through: 'listing_type',
	foreignKey:'type_id'
});

Rating.belongsTo(Listing, {
	foreignKey: 'listing_id'
});

module.exports = { User, Listing, ListingType, Rating, Type, Image };

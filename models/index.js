const User = require('./User');
const Listing = require('./Listing');
const ListingType = require('./ListingType');
const Rating = require('./Rating');
const Type = require('./Type');
const Image = require('.Image');

User.hasMany(Article, {
	foreignKey: 'user_id',
	onDelete: 'CASCADE'
});

User.hasMany(Comment, {
	foreignKey: 'user_id',
	onDelete: 'CASCADE'
});

Article.belongsTo(User, {
	foreignKey: 'user_id'
});

Comment.belongsTo(Article, {
	foreignKey: 'article_id'
});

Comment.belongsTo(User, {
	foreignKey: 'user_id'
});

module.exports = { User, Article, Comment };

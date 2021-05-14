const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Listing extends Model {}

// height, width, depth in cm
// weight in grams

Listing.init(
	{
		listing_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		location: {
			type: DataTypes.STRING,
			allowNull: false
		},
		height: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		width: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		depth: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		weight: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		year: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		image_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
			reference: {
				model:'image',
				key:'image_id'
			}
		},
		rating_id: {
			type: DataTypes.INTEGER,
			reference: {
				model:'rating',
				key:'rating_id'
			}
		},
		user_id: {
			type: DataTypes.INTEGER,
			references: {
				model: 'user',
				key: 'user_id',
			},
			allowNull: false
		},
	},
	{
		sequelize,
		timestamps: true,
		freezeTableName: true,
		underscored: true,
		modelName: 'listing',
	}
);

module.exports = Listing;
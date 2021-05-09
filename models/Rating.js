const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Rating extends Model {}

Rating.init(
	{
		rating_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		listing_id: {
			type: DataTypes.INTEGER,
			references: {
				model: 'listing',
				key: 'listing_id',
			},
		},
		used_new: {
			type: DataType.DECIMAL,
			allowNull: false,
		},
		soft_firm: {
			type: DataType.DECIMAL,
			allowNull: false,
		},
		ugly_cute: {
			type: DataType.DECIMAL,
			allowNull: false,
		},
	},
	{
		sequelize,
		timestamps: false,
		freezeTableName: true,
		underscored: true,
		modelName: 'rating',
	}
);

module.exports = Rating;
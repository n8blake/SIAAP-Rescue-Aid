const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ListingType extends Model {}

ListingType.init(
	{
		listing_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'listing',
				key: 'listing_id'
			}
		},
		type_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'type',
				key: 'type_id'
			}
		},
	},
	{
		sequelize,
		timestamps: false,
		freezeTableName: true,
		underscored: true,
		modelName: 'listing_type',
	}
);

module.exports = ListingType;
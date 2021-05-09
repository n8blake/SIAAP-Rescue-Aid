const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Image extends Model {}

Image.init(
	{
		image_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: true
		},
		description: {
			type: DataTypes.STRING,
			allowNull: true
		},
		url: {
			type: DataTypes.STRING,
			allowNull: false
		},
	},
	{
		sequelize,
		timestamps: false,
		freezeTableName: true,
		underscored: true,
		modelName: 'image',
	}
);

module.exports = Image;
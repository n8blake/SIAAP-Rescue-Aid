const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Type extends Model {}

Type.init(
	{
		type_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		type: {
			type: DataTypes.STRING,
			allowNull: false
		}
	},
	{
		sequelize,
		timestamps: false,
		freezeTableName: true,
		underscored: true,
		modelName: 'type',
	}
);

module.exports = Type;
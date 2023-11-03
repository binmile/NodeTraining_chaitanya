const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");
const { Employee } = require("./models");

const Role = sequelize.define(
  "Role",
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    role_name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

Role.belongsTo(Employee, {
  foreignKey: 'user_id',
  as:'User'
});

module.exports = {Role}
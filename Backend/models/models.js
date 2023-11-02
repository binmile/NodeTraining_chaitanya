  const { DataTypes } = require("sequelize");
  const sequelize = require("../database/database");
  const Employee = sequelize.define(
    "Employee",
    {
      user: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      age: {
        type: DataTypes.INTEGER,
      },
      gender: {
        type: DataTypes.ENUM("male", "female"),
      },
      phone_number: {
        type: DataTypes.STRING,
      },
    },
    {
      freezeTableName: true,
    }
  );
  module.exports = {Employee};
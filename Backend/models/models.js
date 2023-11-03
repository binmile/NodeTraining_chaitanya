  const { DataTypes } = require("sequelize");
  const sequelize = require("../database/database");
  const Employee = sequelize.define(
    "Employee",
    {
      FirstName: {
        type: DataTypes.STRING,
      },
      LastName: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        unique: 'email'
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
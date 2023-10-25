const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const Employee = sequelize.define(
    "Employee",
    {
      EmployeeID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      FirstName: {
        type: DataTypes.STRING,
      },
      LastName: {
        type: DataTypes.STRING,
      },
      Department: {
        type: DataTypes.STRING,
      },
      Salary: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: false,
      tableName: "Employees",
    }
  ); 


module.exports = {Employee};
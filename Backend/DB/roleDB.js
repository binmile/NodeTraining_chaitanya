const { Op } = require("sequelize");
const { Employee } = require("../models/models");
const { Role } = require("../models/roleModel");

async function createRoleDb(data) {
  return await Role.create(data);
}

async function findUserDB(data) {
  return await Role.findAll({
    where: {
      role_name: data,
    },
    include: {
      model: Employee,
      as: "User",
      required: true,
    },
  });
}

// async function findUserDBleft(data){
//   return await Role.findAll({
//     include:{
//       model: Employee,
//       as: 'User',
//       where:{
//         '$Role.role_name$': { [Op.eq]: data }
//       },
//       required:false
//     }
//   })
// }

async function findUserDBInner(data) {
  const sql = `
  SELECT Role.*, Employee.*
  FROM Role
  JOIN Employee ON Role.user_id = Employee.id;
  `;
  return await sequelize.query(sql, {
    type: sequelize.QueryTypes.SELECT,
  });
}

async function findUserDBRight(data) {
  const sql = `
    SELECT Role.*, Employee.*
    FROM Role
    RIGHT JOIN Employee ON Role.user_id = Employee.id;
  `;

  return await sequelize.query(sql, {
    type: sequelize.QueryTypes.SELECT,
  });
}

async function findUserDBLeft(data) {
  const sql = `
  SELECT Role.*, Employee.*
  FROM Role
  LEFT JOIN Employee ON Role.user_id = Employee.id;
  `;

  return await sequelize.query(sql, {
    type: sequelize.QueryTypes.SELECT,
  });
}
const RoleDB = {
  createRoleDb,
  findUserDB,
  findUserDBLeft,
  findUserDBRight,
  findUserDBInner
};

module.exports = RoleDB;

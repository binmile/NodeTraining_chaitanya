const { Op } = require("sequelize");
const { Employee } = require("../models/models");
const {Role} = require("../models/roleModel");

async function createRoleDb(data){
    return await Role.create(data);
}

async function findUserDB(data) {
    return await Role.findAll({
        where: {
          '$Role.role_name$': { [Op.eq]: data }
        },
        include: {
          model: Employee,
          as: 'User',
          required: true
        }
      });
}


const RoleDB = {
    createRoleDb,
    findUserDB
}

module.exports = RoleDB
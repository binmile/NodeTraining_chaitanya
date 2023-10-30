const { Op } = require("sequelize");
const { Employee } = require("../models/models");

async function getAllEmployeesdb() {
  return await Employee.findAll();
}

async function filterGetAllEmployeesdb(order, search, filter) {
  const orderOption = [["createdAt", "ASC"]];

  if (order) {
    const [sort, orderBy] = order.split(":");
    if (orderBy === "asc" || orderBy === "desc") {
      orderOption[0][0] = sort;
      orderOption[0][1] = orderBy.toUpperCase();
    }
  }

  const emp = await Employee.findAll({
    where: filter,
    order: [orderOption],
  });

  if (search) {
    const filteredEmployees = emp.filter((employee) => {
      return (
        employee.firstName.includes(search) ||
        employee.lastName.includes(search) ||
        employee.email.includes(search)
      );
    });
    return filteredEmployees;
  } else {
    return emp;
  }
}

async function getUserByIDdb(id) {
  return await Employee.findByPk(id);
}

async function deleteUserdb(id) {
  return await Employee.destroy({
    where: {
      id: id,
    },
  });
}

async function createUserdb(data) {
  return Employee.create(data);
}
async function updateUserdb(id, filter) {
  return await Employee.update(filter, {
    where: { id: id },
  });
}

async function searchUserdb(search) {
  return await Employee.findAll({
    where: {
      firstName: {
        [Op.like]: `%${search}%`,
      },
    },
  });
}

module.exports = {
  createUserdb,
  deleteUserdb,
  getAllEmployeesdb,
  getUserByIDdb,
  updateUserdb,
  filterGetAllEmployeesdb,
  searchUserdb,
};

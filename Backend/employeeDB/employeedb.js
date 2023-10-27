const { Employee } = require("../models/models");

async function getAllEmployeesdb() {
  return await Employee.findAll();
}

async function filterGetAllEmployeesdb(req) {
  const { order, ...placeholder } = req.query;

  const orderOption = [["createdAt", "ASC"]];

  if (order) {
    const [sort, orderBy] = order.split(":");
    if (orderBy === "asc" || orderBy === "desc") {
      orderOption[0][0] = sort;
      orderOption[0][1] = orderBy.toUpperCase();
    }
  }

  return Employee.findAll({
    where: placeholder,
    order: [orderOption],
  });
}

async function getUserByIDdb(req) {
  const id = req.params.id;
  return await Employee.findByPk(id);
}

async function deleteUserdb(req) {
  const id = req.params.id;
  const result = await Employee.destroy({
    where: {
      id: id,
    },
  });
  return true;
}

async function createUserdb(req) {
  const data = req.body;
  return Employee.create(data);
}
async function updateUserdb(req) {
  id = req.params.id;
  placeholder = req.body;
  return await Employee.update(placeholder, {
    where: { id: id },
  });
}

module.exports = {
  createUserdb,
  deleteUserdb,
  getAllEmployeesdb,
  getUserByIDdb,
  updateUserdb,
  filterGetAllEmployeesdb,
};

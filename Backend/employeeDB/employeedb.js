const { Employee } = require("../models/models");

async function getAllEmployeesdb(req, res) {
  const employees = await Employee.findAll();
  return employees;
}

async function filterGetAllEmployeesdb(req, res) {
  const { order, ...placeholder } = req.query;

  const orderOption = [['createdAt', 'ASC']];
  

  if (order) {
    const [sort, orderBy] = order.split(':');
  if (orderBy === 'asc' || orderBy === 'desc') {
      orderOption[0][0] = sort;
      orderOption[0][1] = orderBy.toUpperCase();
    }
  }

  const employees = await Employee.findAll({
    where: placeholder,
    order: [orderOption]
  });

  return employees;
}


async function getUserByIDdb(req, res) {
  const id = req.params.id;
  try {
    const employee = await Employee.findByPk(id);
    if (employee) {
      const employeeData = employee.toJSON();
      return employeeData;
    } else {
      return null;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function deleteUserdb(req, res) {
  const id = req.params.id;
  try {
    const result = await Employee.destroy({
      where: {
        id: id,
      },
    });

    if (result === 1) {
      return true;
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
}

async function createUserdb(req, res) {
  const data = req.body;
  Employee.create(data);
  return true;
}
async function updateUserdb(req, res) {
  id = req.params.id;
  placeholder = req.body;
  console.log(placeholder);
  try {
    await Employee.update(placeholder, {
      where: { id: id },
    });
    return true;
  } catch (err) {
    return null;
  }
}

module.exports = {
  createUserdb,
  deleteUserdb,
  getAllEmployeesdb,
  getUserByIDdb,
  updateUserdb,
  filterGetAllEmployeesdb,
};

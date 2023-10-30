const { RESPONSE_CODES, RESPONSE_MESSAGES } = require("../common/constant");
const responseHandler = require("../common/responseHandler");
const {
  getAllEmployeesService,
  getUserByIDService,
  deleteUserService,
  createUserService,
  updateUserService,
  filterGetAllEmployeesService,
  searchUserService
} = require("../service/employee.service");
const {
  userSchema,
  updateUserSchema,
  idSchema,
  stringSchema,
} = require("../validationSchemas/user.validation");

async function getAllEmployees(req, res) {
  await getAllEmployeesService(req, res);
}

async function filterGetAllEmployees(req, res) {
  const { order,search, ...placeholder } = req.query;
  const { error } = updateUserSchema.validate(placeholder);
  if (error) {-
    responseHandler({
      statusCode: RESPONSE_CODES.FAILURE_BAD_REQUEST,
      error: error,
      res: res,
      message: RESPONSE_MESSAGES.VALIDATION_ERROR,
    });
  } else {
    await filterGetAllEmployeesService(req, res);
  }
}

async function getUserByIDController(req, res) {
  await getUserByIDService(req, res);
}
async function deleteUserController(req, res) {
  const id = req.params.id;
  const { error } = idSchema.validate(id);
  if (error) {
    responseHandler({
      statusCode: RESPONSE_CODES.FAILURE_BAD_REQUEST,
      error: error,
      res: res,
      message: RESPONSE_MESSAGES.VALIDATION_ERROR,
    });
  } else {
    await deleteUserService(req, res);
  }
}
async function createUserController(req, res) {
  const data = req.body;
  const { error } = userSchema.validate(data);
  if (error) {
    responseHandler({
      statusCode: RESPONSE_CODES.FAILURE_BAD_REQUEST,
      error: error,
      res: res,
      message: RESPONSE_MESSAGES.VALIDATION_ERROR,
    });
  } else {
    await createUserService(req, res);
  }
}

async function updateUserController(req, res) {
  const id = req.params.id;
  const data = req.body;
  const { error } = updateUserSchema.validate(data) || idSchema(id);
  if (error) {
    responseHandler({
      statusCode: RESPONSE_CODES.FAILURE_BAD_REQUEST,
      error: error,
      res: res,
      message: RESPONSE_MESSAGES.VALIDATION_ERROR,
    });
  } else {
    await updateUserService(req, res);
  }
}

async function searchUserController(req, res) {
  const key = req.query.key
  const { error } = stringSchema.validate(key);
  if (error) {
    responseHandler({
      statusCode: RESPONSE_CODES.FAILURE_BAD_REQUEST,
      error: error,
      res: res,
      message: RESPONSE_MESSAGES.VALIDATION_ERROR,
    });
  } else {
    await searchUserService(req, res);
  }
}
module.exports = {
  getAllEmployees,
  getUserByIDController,
  deleteUserController,
  createUserController,
  updateUserController,
  filterGetAllEmployees,
  searchUserController,
};

const responseHandler = require("../common/responseHandler");
const { RESPONSE_CODES, RESPONSE_MESSAGES } = require("../common/constant");

const {
  createUserdb,
  getAllEmployeesdb,
  deleteUserdb,
  updateUserdb,
  getUserByIDdb,
  filterGetAllEmployeesdb,
  searchUserdb
} = require("../employeeDB/employeedb");

const to = require("await-to-js").default;

async function filterGetAllEmployeesService(req, res) {
  const { order,search, ...placeholder } = req.query;
  const [err, data] = await to(filterGetAllEmployeesdb(order,search,placeholder));
  if (data != null) {
    responseHandler({
      statusCode: RESPONSE_CODES.SUCCESS_OK,
      data: data,
      res: res,
      message: RESPONSE_MESSAGES.FETCHED,
    });
  } else {
    responseHandler({
      statusCode: RESPONSE_CODES.FAILURE_NOT_FOUND,
      error: err,
      res: res,
      message: RESPONSE_MESSAGES.FETCHED_NOT_FOUND,
    });
  }
}

async function getAllEmployeesService(req, res) {
  const [err, data] = await to(getAllEmployeesdb());
  page = req.query.page || 1;
  const limit = req.query.limit || 100;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  if (data != null) {
    const Data = data.slice(startIndex, endIndex);
    responseHandler({
      statusCode: RESPONSE_CODES.SUCCESS_OK,
      data: Data,
      res: res,
      message: RESPONSE_MESSAGES.FETCHED,
    });
  } else {
    responseHandler({
      statusCode: RESPONSE_CODES.FAILURE_NOT_FOUND,
      error: err,
      res: res,
      message: RESPONSE_MESSAGES.FETCHED_NOT_FOUND,
    });
  }
}

async function getUserByIDService(req, res) {
  const [err,data] = await to(getUserByIDdb(req.params.id));
  console.log(data)
  if (data != null) {
    responseHandler({
      statusCode: RESPONSE_CODES.SUCCESS_OK,
      data: data,
      res: res,
      message: RESPONSE_MESSAGES.FETCHED,
    });
  } else {
    responseHandler({
      statusCode: RESPONSE_CODES.FAILURE_NOT_FOUND,
      error: err,
      res: res,
      message: RESPONSE_MESSAGES.FETCHED_NOT_FOUND,
    });
  }
}

async function deleteUserService(req, res) {
  const [err,data] = await to(deleteUserdb(req.params.id));
  if (!err) {
    responseHandler({
      statusCode: RESPONSE_CODES.SUCCESS_OK,
      data: data,
      res: res,
      message: RESPONSE_MESSAGES.DELETE_SUCCESS,
    });
  } else {
    responseHandler({
      statusCode: RESPONSE_CODES.FAILURE_NOT_FOUND,
      error: true,
      res: res,
      message: RESPONSE_MESSAGES.FETCHED_NOT_FOUND,
    });
  }
}

async function createUserService(req, res) {
  const [err,data] = await to(createUserdb(req.body));
  if (!err) {
    responseHandler({
      statusCode: RESPONSE_CODES.SUCCESS_CREATED,
      data: data,
      res: res, 
      message: RESPONSE_MESSAGES.INSERT_SUCCESS,
    });
  } else {
    responseHandler({
      statusCode: RESPONSE_CODES.FAILURE_SERVICE_UNAVAILABLE,
      error: true,
      res: res,
      message: RESPONSE_MESSAGES.VALIDATION_ERROR,
    });
  }
}

async function updateUserService(req, res) {
  const [err,data] = await to(updateUserdb(req.params.id,req.body));
  if (!err) {
    responseHandler({
      statusCode: RESPONSE_CODES.SUCCESS_CREATED,
      data: data,
      res: res,
      message: RESPONSE_MESSAGES.UPDATE_SUCCESS,
    });
  } else {
    responseHandler({
      statusCode: RESPONSE_CODES.FAILURE_SERVICE_UNAVAILABLE,
      error: true,
      res: res,
      message: RESPONSE_MESSAGES.VALIDATION_ERROR,
    });
  }
}

async function searchUserService(req, res) {
  const [err,data] = await to(searchUserdb(req.query.key));
  if (!err) {
    responseHandler({
      statusCode: RESPONSE_CODES.SUCCESS_OK,
      data: data,
      res: res,
      message: RESPONSE_MESSAGES.FETCHED,
    });
  } else {
    responseHandler({
      statusCode: RESPONSE_CODES.FAILURE_NOT_FOUND,
      error: true,
      res: res,
      message: RESPONSE_MESSAGES.FETCHED_NOT_FOUND,
    });
  }
}

module.exports = {
  getAllEmployeesService,
  getUserByIDService,
  deleteUserService,
  createUserService,
  updateUserService,
  filterGetAllEmployeesService,
  searchUserService
};

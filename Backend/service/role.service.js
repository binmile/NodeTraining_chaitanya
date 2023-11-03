const { getUserByIDdb } = require("../DB/employeedb");
const RoleDB = require("../DB/roleDB");
const { RESPONSE_CODES, RESPONSE_MESSAGES } = require("../common/constant");
const responseHandler = require("../common/responseHandler");

const to = require("await-to-js").default;

async function checkUserService(id) {
  const [err, data] = await to(getUserByIDdb(id));
  if (!data) {
    return false;
  } else {
    return true;
  }
}

async function createRoleService(req, res) {
  const dataInfo = req.body;
  const [err, data] = await to(RoleDB.createRoleDb(dataInfo));
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
      message: err,
    });
  }
}

async function findUserDetails(req, res) {
  const role = req.body.role_name;
  const [err, data] = await to(RoleDB.findUserDB(role));
  console.log(err,'___________________',data)
  if (!err) {
    responseHandler({
      statusCode: RESPONSE_CODES.SUCCESS_OK,
      data: data,
      res: res,
      message: RESPONSE_MESSAGES.FETCHED,
    });
  } else {
    responseHandler({
      statusCode: RESPONSE_CODES.FAILURE_SERVICE_UNAVAILABLE,
      error: err,
      res: res,
      message: RESPONSE_MESSAGES.FETCHED_NOT_FOUND,
    });
  }
}

async function findUserDetailsRight(req, res) {
  const role = req.body.role_name;
  const [err, data] = await to(RoleDB.findUserDBRight(role));
  if (!err) {
    responseHandler({
      statusCode: RESPONSE_CODES.SUCCESS_OK,
      data: data,
      res: res,
      message: RESPONSE_MESSAGES.FETCHED,
    });
  } else {
    responseHandler({
      statusCode: RESPONSE_CODES.FAILURE_SERVICE_UNAVAILABLE,
      error: err,
      res: res,
      message: err,
    });
  }
}

async function findUserDetailsLeft(req_, res) {
  const [err, data] = await to(RoleDB.findUserDBLeft(role));
  if (!err) {
    responseHandler({
      statusCode: RESPONSE_CODES.SUCCESS_OK,
      data: data,
      res: res,
      message: RESPONSE_MESSAGES.FETCHED,
    });
  } else {
    responseHandler({
      statusCode: RESPONSE_CODES.FAILURE_SERVICE_UNAVAILABLE,
      error: err,
      res: res,
      message: err,
    });
  }
}


const RoleService = {
  checkUserService,
  createRoleService,
  findUserDetails,
  findUserDetailsLeft,
  findUserDetailsRight
};

module.exports = RoleService;

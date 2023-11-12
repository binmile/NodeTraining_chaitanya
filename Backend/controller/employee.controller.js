const { RESPONSE_CODES, RESPONSE_MESSAGES } = require("../common/constant");
const responseHandler = require("../common/responseHandler");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

require("dotenv").config();

const secretKey = process.env.SECRET_KEY;

const {
  getAllEmployeesService,
  getUserByIDService,
  deleteUserService,
  createUserService,
  updateUserService,
  filterGetAllEmployeesService,
  searchUserService,
  createTokenService,
  sendMailService,
} = require("../service/employee.service");
const {
  userSchema,
  updateUserSchema,
  idSchema,
  stringSchema,
} = require("../validationSchemas/user.validation");

async function filterGetAllEmployees(req, res) {
  const { order, search, page, limit, ...placeholder } = req.query;
  const { error } = updateUserSchema.validate(placeholder);
  if (error) {
    -responseHandler({
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
  const error = null // updateUserSchema.validate(data) || idSchema.validate(id);
  if (error) {
    console.log(error)
    responseHandler({
      statusCode: RESPONSE_CODES.FAILURE_BAD_REQUEST,
      error: error,
      res: res,
      message: RESPONSE_MESSAGES.VALIDATION_ERROR,
    });
  } else {
    if (data.password) {
      responseHandler({
        statusCode: RESPONSE_CODES.FAILURE_FORBIDDEN_ACCESS,
        error: error,
        res: res,
        message: RESPONSE_MESSAGES.FAILURE_FORBIDDEN_ACCESS,
      });
    } else {
      await updateUserService(req, res);
    }
  }
}

async function sendMailController(req, res) {
  try {
    sendMailService(req,res)
  } catch (error) {
    responseHandler({
      statusCode: RESPONSE_CODES.FAILURE_BAD_REQUEST,
      error: error,
      res: res,
      message: RESPONSE_MESSAGES.VALIDATION_ERROR,
    });
  }
}

async function createToken(req, res) {
  const user = req.body.user;
  const pass = req.body.password;
  const token = await createTokenService(req, user, pass);
  res.json({
    token: token,
  });
}

async function verifyToken(req, res) {
  const user = jwt.decode(req.token).user;
  const key = user + `${secretKey}`;
  jwt.verify(req.token, key, (err, authData) => {
    if (err) {
      res.send({ result: "invalid token" });
    } else {
      res.json({
        message: "token verified successfully",
        authData,
      });
    }
  });
}

module.exports = {
  getUserByIDController,
  deleteUserController,
  createUserController,
  updateUserController,
  filterGetAllEmployees,
  createToken,
  verifyToken,
  sendMailController
};

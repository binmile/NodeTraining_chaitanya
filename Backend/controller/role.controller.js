const { RESPONSE_CODES, RESPONSE_MESSAGES } = require("../common/constant");
const responseHandler = require("../common/responseHandler");
const RoleService = require("../service/role.service");
const { idSchema } = require("../validationSchemas/user.validation");

async function createRoleController(req, res) {
    await RoleService.createRoleService(req,res);
}

async function validateRoleController(req, res) {
  const id = req.body.user_id;
  const { error } = idSchema.validate(id);
  if (error) {
    responseHandler({
      statusCode: RESPONSE_CODES.FAILURE_BAD_REQUEST,
      error: error,
      res: res,
      message: RESPONSE_MESSAGES.VALIDATION_ERROR,
    });
  }
  const available = await RoleService.checkUserService(id);
  if (available) {
    createRoleController(req, res);
  } else {
    responseHandler({
      statusCode: RESPONSE_CODES.VALIDATION_ERROR,
      error: error,
      res: res,
      message: RESPONSE_MESSAGES.FETCHED_NOT_FOUND,
    });
  }
}

async function findUserController(req,res){
     RoleService.findUserDetails(req,res)
}

async function findUserControllerRight(req,res){
  RoleService.findUserDetailsRight(req,res)
}

async function findUserControllerLeft(req,res){
  RoleService.findUserDetailsLeft(req,res)
}


const roleController = {
  validateRoleController,
  findUserController,
  findUserControllerRight,
  findUserControllerLeft
};

module.exports = roleController;

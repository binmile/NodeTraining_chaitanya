const responseHandler = require("../common/responseHandler");
const cron = require('node-cron');
const { RESPONSE_CODES, RESPONSE_MESSAGES } = require("../common/constant");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();
const secretKey = process.env.SECRET_KEY;

const {
  createUserdb,
  deleteUserdb,
  updateUserdb,
  getUserByIDdb,
  filterGetAllEmployeesdb,
  findbyUser,
} = require("../DB/employeedb");
const { Employee } = require("../models/models");

const to = require("await-to-js").default;

async function filterGetAllEmployeesService(req, res) {
  const { order, search, page, limit, ...placeholder } = req.query;

  const offset = parseInt((page - 1) * limit) || 1;
  const lim = parseInt(limit) || 100;
  const [err, data] = await to(
    filterGetAllEmployeesdb(order, search, offset, lim, placeholder)
  );
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

async function getUserByIDService(req, res) {
  const [err, data] = await to(getUserByIDdb(req.params.id));
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
  const [err, data] = await to(deleteUserdb(req.params.id));
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
  pass = req.body.password;
  await bcrypt.hash(pass, saltRounds).then(function (hash) {
    req.body.password = hash;
  });
  const [err, data] = await to(createUserdb(req.body));
  const user = req.body.FirstName;
  const Data = await findbyUser(user);
  const key = `${Data.user}${secretKey}`;
  const token = jwt.sign(Data.toJSON(), key, { expiresIn: "400s" });
  if (!err) {
    responseHandler({
      statusCode: RESPONSE_CODES.SUCCESS_CREATED,
      data: {
        'auth-token': token,
        'user-data':data
      },
      res: res,
      message: RESPONSE_MESSAGES.INSERT_SUCCESS,
    });
  } else {
    responseHandler({
      statusCode: RESPONSE_CODES.FAILURE_SERVICE_UNAVAILABLE,
      error: err,
      res: res,
      message: RESPONSE_MESSAGES.VALIDATION_ERROR,
    });
  }
}

async function updateUserService(req, res) {
  const [err, data] = await to(updateUserdb(req.params.id, req.body));
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
      error: err,
      res: res,
      message: RESPONSE_MESSAGES.VALIDATION_ERROR,
    });
  }
}

async function mailer(email,res) {
  const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      auth: {
        user: "chaitanyamailer@gmail.com",
        pass: "lvwi mjcl jauy oyek",
      },
    });
try{
const info = await transporter.sendMail({
  from: '"chaitanya 👻" <chaitanmailer@gmail.com>',
  to: email,
  subject: "happy womens day",
  text: "happy womens day to all females you know i.e. null",
  html: "<b>happy womens day to all females you know i.e. null</b>",
});
responseHandler({
  statusCode: RESPONSE_CODES.SUCCESS_CREATED,
  data:` ${info.messageId}`,
  res: res,
  message: 'mail sent',
});
}catch (error) {
  res.status(500).send("Error sending the email: " + error.message);
}
}

async function sendMailService(req, res){
try{
  cron.schedule('* * * * *', async () => {
    
     const women =  await Employee.findAll({where:{
      gender:'female'
    }})
    const womenArray =[]
    women.map((women)=>womenArray.push(women.email))
    console.log(womenArray)
    mailer(womenArray,res)

});


}catch(error){
  responseHandler({
    statusCode: RESPONSE_CODES.FAILURE_SERVICE_UNAVAILABLE,
    error: err,
    res: res,
    message: RESPONSE_MESSAGES.VALIDATION_ERROR,
  });
}
}

async function createTokenService(req, user, pass) {
  const data = await findbyUser(user);
  const password = data.password;
  const key = `${data.user}${secretKey}`;

  const result = await bcrypt.compare(pass, password);
  if (result == true) {
    const token = jwt.sign(data.toJSON(), key, { expiresIn: "400s" });
    return token;
  }
  throw new Error({ message: "wrong password" });
}

module.exports = {
  getUserByIDService,
  deleteUserService,
  createUserService,
  updateUserService,
  filterGetAllEmployeesService,
  createTokenService,
  sendMailService
};

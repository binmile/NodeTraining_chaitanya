const responseHandler = ({
  statusCode,
  message = "",
  error = false,
  res,
  data = [],
}) => {
  res.json({
    error: error,
    statusCode: statusCode,
    message: message,
    data: data,
  });
};
module.exports = responseHandler;

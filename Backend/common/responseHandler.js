const responseHandler = ({
  statusCode,
  message = "",
  error = false,
  res,
  data = [],
}) => {
  res.json({
    statusCode: statusCode,
    message: message,
    error: error,
    data: data,
  });
};
module.exports = responseHandler;

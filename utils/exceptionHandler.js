const { logError } = require('./logger');

module.exports = (err, req, res, next) => {

  logError("Error", err)
  const errorMessage = err.msg || err.message || "Something went wrong";
  const statusCode = err.code || err.statusCode || 500;

  console.log("err ==> ", new Date().getUTCDate(), "<===>", err);

  winston.error(errorMessage, err);
  return JsonResponse(res, statusCode, errorMessage);
}
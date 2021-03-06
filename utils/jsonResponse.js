exports.jsonResponse = (status, msg, data = null) => {
  const body = {
    msg: "",
    data: null
  };
  if (data) {
    body.data = data;
  }
  body.msg = msg;
  body.status = status || 200;

  return body;
}
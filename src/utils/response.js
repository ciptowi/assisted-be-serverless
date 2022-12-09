exports.build = (res, code, success, msg, data, err) => {
  return res.status(code).json({
    success: success,
    message: msg,
    data: data,
    error: err
  });
};

exports.success = (res, data) => {
  return res.status(200).json({
    success: true,
    message: 'Success',
    data: data
  });
};

exports.created = (res, data) => {
  return res.status(201).json({
    success: true,
    message: 'Created Successfully',
    data: data
  });
};

exports.authFailed = (res, msg) => {
  return res.status(200).json({
    success: false,
    message: msg
  });
};

exports.error500 = (res, err) => {
  return res.status(500).json({
    success: false,
    message: 'Internal Server Error !',
    error: err
  });
};

exports.unauthorized = (res) => {
  return res.status(401).json({
    success: false,
    message: 'Unauthorized !'
  });
};

exports.tokenLess = (res) => {
  return res.status(403).json({
    success: false,
    message: 'No token provided !'
  });
};
const router = require("express").Router();

module.exports = app => {
  router.get("/test", (req, res) => {
    res.status(200).json({ message: "Hello Serverless" })
  });

  // API prefix
  app.use("", router);
};

const router = require("express").Router();
const validate = require("./verifyToken");

router.get("/", validate, (req, res) => {
  res.send({ message: "This is very secreate messager [wollsofiadf]" });
});

module.exports = router;

const router = require("express").Router();

router.get("/register", (req, res) => {
  console.log(req);
  res.send("Router working");
});
router.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  res.send({ name, email, password });
});

module.exports = router;

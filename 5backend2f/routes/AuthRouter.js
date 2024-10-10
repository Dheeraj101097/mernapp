const {
  signupvalidation,
  loginvalidation,
} = require("../middlewares/authvalidation.js");
const { signup, login } = require("../controllers/authSignup.js");

const router = require("express").Router();

router.post("/login", loginvalidation, login);
router.post("/signup", signupvalidation, signup);

module.exports = router;

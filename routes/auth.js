const express = require("express");
const {
  registerUser,
  loginUser,
  getUser,
} = require("../controllers/authController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/user", auth, getUser);

module.exports = router;

const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth-controller");

router.post("/signin", authControllers.signIn);
router.post("/signup", authControllers.signUp);

module.exports = router;

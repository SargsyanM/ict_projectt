const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');

const UserController = require('../controllers/user');

router.post("/", UserController.user_signup);

router.post("/login", UserController.user_login);

router.get("/:_id", UserController.user_get);

module.exports = router;

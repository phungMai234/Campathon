const express = require('express');
const router = express.Router();

const controllerUser = require("../controllers/userController");

router.post('/register', controllerUser.register);
router.post('/login', controllerUser.login);
router.post('/password', controllerUser.changePassword)


module.exports = router;
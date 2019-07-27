const express = require('express');
const router = express.Router();
const verify = require("../middleware/verify_access_token");

const controllerUser = require("../controllers/userController");

router.post('/register', controllerUser.register);
router.post('/login', controllerUser.login);
router.post('/password', verify, controllerUser.changePassword);
router.get('/profile',verify, controllerUser.getProfile);

module.exports = router;
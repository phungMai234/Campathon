const express = require('express');
const router = express.Router();
const middleware = require("../middleware/verify_access_token")

const controllerComment= require("../controllers/commentController");

router.post('/create', controllerComment.createComment);



module.exports = router;
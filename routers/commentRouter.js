const express = require('express');
const router = express.Router();
const middleware = require("../middleware/verify_access_token")
const verify = require("../middleware/verify_access_token")

const controllerComment= require("../controllers/commentController");

router.post('/:id/create',verify, controllerComment.createComment);
router.get('/:id', controllerComment.listComment)


module.exports = router;
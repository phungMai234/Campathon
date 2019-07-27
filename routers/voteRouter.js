const express = require('express');
const router = express.Router();
const verify = require("../middleware/verify_access_token");

const controllerVote = require("../controllers/voteController");

router.post('/create', controllerVote.createVote);
module.exports = router;
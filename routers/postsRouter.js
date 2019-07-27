const express = require('express');
const router = express.Router();
const verify = require("../middleware/verify_access_token")

const controllerPosts= require("../controllers/postsController");

router.get('/', controllerPosts.listTitle);
router.get('/:id', controllerPosts.getTitleByID);
router.post('/create', controllerPosts.createPost);
router.post('/search', verify, controllerPosts.searchPost);



module.exports = router;
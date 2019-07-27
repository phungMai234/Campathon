const express = require('express');
const router = express.Router();

const controllerPosts= require("../controllers/postsController");

router.get('/', controllerPosts.listTitle);
router.post('/create', controllerPosts.createPost);
router.post('/search', controllerPosts.searchPost);



module.exports = router;
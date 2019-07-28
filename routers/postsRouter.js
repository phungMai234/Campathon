const express = require('express');
const router = express.Router();
const verify = require("../middleware/verify_access_token");

const controllerPosts= require("../controllers/postsController");

router.get('/', controllerPosts.listTitle);
router.get('/:id', controllerPosts.getTitleByID);
router.get('/:id/like',verify, controllerPosts.pressLike);
router.post('/create', controllerPosts.createPost);
router.post('/search', controllerPosts.searchPost);
router.get('/search/dogs', controllerPosts.searchDog);
router.get('/search/cats', controllerPosts.searchCat);

module.exports = router;
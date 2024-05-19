// api 전송용 라우터
const express = require('express');
const router = express.Router();
const postController = require('./post');

router.get('/getPost', postController.getPost);
router.get('/post/:num', postController.getPostById);

module.exports = router;

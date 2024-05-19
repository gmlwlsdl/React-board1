const express = require('express');
const router = express.Router();
const userController = require('./user');

router.post('/signIn', (req, res) => {
  console.log(req.body); // 전송된 데이터 확인
  userController.signIn(req, res);
});

router.post('/loginCheck', (req, res) => {
  console.log(req.body); // 전송된 데이터 확인
  userController.loginCheck(req, res);
});

module.exports = router;

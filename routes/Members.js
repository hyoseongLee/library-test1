// Express 모듈셋팅
const express = require("express");
const router = express.Router();
const mariadb = require("../database/mariadb");
const {
    join,
    login,
    PassWordResetrequest,
    passwordReset
} = require ('../controller/MembersController')

router.use(express.json());

// 회원가입
router
  .post('/join',join)

  // 로그인
  router
  .post("/login",login)

  // 비밀번호 초기화 요청
  router
  .post("/reset",PassWordResetrequest)

  // 비밀번호 초기화
  router
  .put("/reset",passwordReset);

module.exports = router;

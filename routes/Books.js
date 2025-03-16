// Express 모듈셋팅
const express = require("express");
const router = express.Router();
const mariadb = require('../database/mariadb');
const { allBooks, BooksDetail } = require("../controller/BooksController");

router.use(express.json())
 
router
.get('/',allBooks) //전체 도서 조회

router
.get('/:id',BooksDetail) //개별 도서 조회

module.exports = router;
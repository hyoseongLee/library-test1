// Express 모듈셋팅
const express = require("express");
const router = express.Router();
const mariadb = require('../database/mariadb');
const { order,getOrders, getOrderDetail } = require("../controller/orderController");

router.use(express.json())

//주문하기
router.post('/',order)

//주문 목록 조회
router.get('/',getOrders)

//주문 상세 상품 조회
router.get('/:id',getOrderDetail)

module.exports = router;    
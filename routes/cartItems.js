// Express 모듈셋팅
const express = require("express");
const router = express.Router();
const mariadb = require('../database/mariadb');
const {addToCart ,getCartItem ,removeCartitem
} = require("../controller/cartItemController")

router.use(express.json())
 
//장바구니 담기
router.post('/',addToCart)

// 장바구니 조회/선택된 아이템 목록 조회(예상)
router.get('/',getCartItem)

//장바구니 도서 삭제
router.delete ('/:id',removeCartitem)

module.exports = router;
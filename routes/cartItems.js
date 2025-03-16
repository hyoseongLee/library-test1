// Express 모듈셋팅
const express = require("express");
const router = express.Router();
const mariadb = require('../database/mariadb');
 
router.use(express.json())
 
router
.route('/cartItems')
//장바구니 담기
router
.post('/cartItems',(req,res)=> {
    const {bookId,count} = req.body;
    const query = "insert into carts (bookId,count) value (?,?)"
    mariadb.query(query,[bookId,count],(err,Result)=> {
    })
    res ({
        msg : "성공하셔쓰다"
    })
})

// 장바구니 조회
router
.get('/cartItems',(req,res)=> {
    const {bookId,title,summary,count,price} = req.body;  
    const query = "select * from carts"
    mariadb.query(query,[bookId,title,summary,count,price],(err,Result)=> {
    })
})

//장바구니 도서 삭제
router
.delete ('/carts/:id',(req,res)=> {
    
})

module.exports = router;
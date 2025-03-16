// Express 모듈셋팅
const express = require("express");
const router = express.Router();
const mariadb = require('../database/mariadb');

router.use(express.json())
 
router
.route('/orders')

//주문하기
router
.post('/orders',(req,res)=> {
    
})

//주문 목록 조회
router.get('orders',(req,res)=> {
    const query = "select * from orders";
    mariadb.query(query,[cartItemId,bookId,title,summary,count,price,],(err,result)=>{
        
    } )
})


//주문 상세 상품 조회
router
.get('/orders/:id',(req,res)=> {
    
})

module.exports = router;
// Express 모듈셋팅
const express = require("express");
const router = express.Router();
const mariadb = require('./database/mariadb');

router.use(express.json())
 
router
.route('/orders')

.get('orders',(req,res)=> {
    const query = "select * from orders";
    mariadb.query(query,[cartItemId,bookId,title,summary,count,price,],(err,result)=>{
        
    } )
})


module.exports = router;
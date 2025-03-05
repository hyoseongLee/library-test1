// Express 모듈셋팅
const express = require("express");
const router = express.Router();
const mariadb = require('./database/mariadb');
const { Result } = require("express-validator");

router.use(express.json())
 
router
.route('/carts')

.post('/carts',(req,res)=> {
    const {bookId,count} = req.body;
    const query = "insert into carts (bookId,count) value (?,?)"
    mariadb.query(query,[bookId,count],(err,Result)=> {
        
    })
    res ({
        msg : "성공하셔쓰다"
    })
})

.get('/carts',(req,res)=> {
    const {bookId,title,summary,count,price} = req.body;  
    const query = "select * from carts"
    mariadb.query(query,[bookId,title,summary,count,price],(err,Result)=> {
    })
})

.delete ('/carts/{bookId}',(req,res)=> {
    
})



module.exports = router;
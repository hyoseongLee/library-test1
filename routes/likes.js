// Express 모듈셋팅
const express = require("express");
const router = express.Router();
const mariadb = require('./database/mariadb');

router.use(express.json())

router
.route('/likes')
.put ('/likes/{bookId}',(req,res)=> {
      
})

.put ('/likes/{bookId}',(req,res)=> {
      
})




module.exports = router;
// Express 모듈셋팅
const express = require("express");
const router = express.Router();
const mariadb = require('./database/mariadb');

router.use(express.json())
 
router
.route('/registerMembers')

.post((req,res)=> {
    const {email, password} = req.body;
    const query = "insert into registerMembers (email,password) values (?,?)" 
    mariadb.query(query,[email,password],(err,result)=> {
        
    })
    res({
msg : "성공하였습니다."
    })
})

.post('/login',(req,res)=> {
    const {email, password} = req.body;
    const query = "insert into registerMembers (email,password) values (?,?)" 
    mariadb.query(query,[email,password],(err,result)=> {
        
    })
    res({
msg : "성공하였습니다."
    })
})

// 비밀번호 초기화
.post('/reset',(req,res)=> {
    const {email} = req.body;
    const query = "insert into registerMembers (email) values (?)" 
    mariadb.query(query,[email],(err,result)=> {
        
    })
    res({
msg : "성공하였습니다."
    })
})

.put('/reset',(req,res)=> {
    const {password} = req.body;
    const query = "insert into registerMembers (password) values (?)" 
    mariadb.query(query,[password],(err,result)=> {
        
    })
    res({
msg : "성공하였습니다."
    })
})


module.exports = router;
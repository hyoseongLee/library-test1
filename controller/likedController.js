const ensuerAuthorization = require('../auth') // 인증 모듈듈
const jwt = require ("jsonwebtoken")
const mariadb = require("../database/mariadb");
const { StatusCodes } = require("http-status-codes");


//좋아요 추가
const addLike = (req,res)=>{
    const book_id = req.params.id;
    // const {Member_id} = req.body;

let authorization= ensuerAuthorization(req,res);

 if (authorization instanceof jwt.TokenExpiredError){
    return res.status(StatusCodes.UNAUTHORIZED).json({
      "message" : "로그인 세션이 만료되었습니다. 다시 로그인 해주세요!"
    })
  }else if(authorization instanceof jwt.JsonWebTokenError){
    return res.status(StatusCodes.BAD_REQUEST).json({
      "message" : "잘못된 토큰입니다! 다시 로그인 해주세요!"
    })
  }else {
    let sql = 'INSERT INTO likes (Member_id, liked_book_id) VALUES (?,?)';
    let values = [authorization.id,book_id]
 mariadb.query(sql,values,
    (err,results)=> {
    if(err) {
        console.log(err)
        return res.status(StatusCodes.BAD_REQUEST).end()
    }
    return res.status(StatusCodes.OK).json(results)
})
  }
}

//좋아요 삭제
const removeLike = (req,res)=>{
    const book_id = req.params.id;
    let authorization= ensuerAuthorization(req);

if (authorization instanceof jwt.TokenExpiredError){
    return res.status(StatusCodes.UNAUTHORIZED).json({
      "message" : "로그인 세션이 만료되었습니다. 다시 로그인 해주세요!"
    })
  }else if(authorization instanceof jwt.JsonWebTokenError){
    return res.status(StatusCodes.BAD_REQUEST).json({
      "message" : "잘못된 토큰입니다! 다시 로그인 해주세요!"
    })
  } else {
     let sql = 'DELETE FROM likes WHERE Member_id = ? AND liked_book_id = ?';
    let values = [authorization.id,book_id]
 mariadb.query(sql,values,
    (err,results)=> {
    if(err) { 
        console.log(err)
        return res.status(StatusCodes.BAD_REQUEST).end()
    }
    return res.status(StatusCodes.OK).json(results)
})
  }
   
}

module.exports = { 
    addLike,
    removeLike
 };
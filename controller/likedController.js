const mariadb = require("../database/mariadb");
const { StatusCodes } = require("http-status-codes");

//좋아요 추가
const addLike = (req,res)=>{
    const {id} = req.params;
    const {Member_id} = req.body;

    let sql = 'INSERT INTO likes (Member_id, liked_book_id) VALUES (?,?)';
    let values = [Member_id,id]
 mariadb.query(sql,values,
    (err,results)=> {
    if(err) {
        console.log(err)
        return res.status(StatusCodes.BAD_REQUEST).end()
    }
    return res.status(StatusCodes.OK).json(results)
})
}

//좋아요 삭제
const removeLike = (req,res)=>{
    const {id} = req.params;
    const {Member_id} = req.body;

    let sql = 'DELETE FROM likes WHERE Member_id = ? AND liked_book_id = ?';
    let values = [Member_id,id]
 mariadb.query(sql,values,
    (err,results)=> {
    if(err) {
        console.log(err)
        return res.status(StatusCodes.BAD_REQUEST).end()
    }
    return res.status(StatusCodes.OK).json(results)
})
}

module.exports = { 
    addLike,
    removeLike
 };
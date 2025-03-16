const mariadb = require("../database/mariadb");
const { StatusCodes } = require("http-status-codes");
const crypto = require('crypto'); // 암호화
const jwt = require('jsonwebtoken'); //토큰 인증서
const dotenv = require('dotenv') // env 모듈
dotenv.config()

const allBooks = (req,res) => {
    let {category_id, news,limit,currentPage } = req.query;
    let offset = limit * (currentPage-1);
    let sql = "SELECT * FROM Books";
    let values = [];
    if(category_id && news) {
          sql += " WHERE category_id=? AND pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()";
          values = [category_id];
    }else if(category_id){
        sql +=" WHERE category_id=? ";
        values = [category_id];
    }else if(news) {
        sql += " WHERE pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()";
    }

sql += " LIMIT ? OFFSET ?"
values.push(parseInt(limit), offset);

mariadb.query(sql,values,(err,results)=> {
    if(err) {
        console.log(err)
        return res.status(StatusCodes.BAD_REQUEST).end()
    }
    if(results.length){
        return res.status(StatusCodes.OK).json(results)
    }
        return res.status(StatusCodes.NOT_FOUND).end()
})
    }


const BooksDetail = (req,res) => {
    let {id} = req.params;
    
    let sql = `SELECT * FROM Books LEFT
Join category On Books.category_id = category_id where Books.id = ?;`;
    mariadb.query(sql,id,(err,results)=> {
        if(err) {
            console.log(err)
            return res.status(StatusCodes.BAD_REQUEST).end()
        }
        if(results[0]){
            return res.status(StatusCodes.OK).json(results[0])
        }else {
            return res.status(StatusCodes.NOT_FOUND).end()
        }
    })
 }


module.exports = {
  allBooks,
  BooksDetail,
};

// Express 모듈셋팅
const express = require("express");
const router = express.Router();
const mariadb = require('./database/mariadb');

router.use(express.json())
 
router
.route('/books')

// 도서 전체 조회
.get((req,res)=> {
    const { title, summary, author,price,likes} = req.body
    const query = "select * from mainBooks";
    mariadb.query(query,[title,summary,author,price,likes],(err,result)=>{
        title = mainBooks.title,
        summary = mainBooks.summary,
        author = mainBooks.author,
        price = mainBooks.price,
        likes = mainBooks.likes
    })
 res ({
    msg: "성공하셨습다."
 })
})

//개별 도서 조회
.get('/books/{bookId}',(req,res)=> {
    const query = "select * from mainBooks where bookId"
    mariadb.query(query,
        [id,title,category,format,isbn,summary,description,author,pages,index,price,likes,liked]
        ,(err,result)=>{
        id = mainBooks.id,
        title = mainBooks.title,
        category = mainBooks.category,
        format = mainBooks.format,
        isbn = mainBooks.isbn,
        summary = mainBooks.summary,
        description = mainBooks.description,
        author = mainBooks.author,
        pages = mainBooks.pages,
        index = mainBooks.index,
        price = mainBooks.price,
        likes = mainBooks.likes,
        liked = mainBooks.liked
    })
 res ({
    msg: "성공하셨습다."
 })
})
// 카테고리 별 도서 목록 조회
.get('/books?categoryId={categoryId}&new=(boolean)',(req,res)=> {
    const query = "select * from mainBooks where categoryId"
    mariadb.query(query,[id,title,summary,author,price,likes,pubDate],(err,result)=>{
        id = mainBooks.id,
        title = mainBooks.title,
        summary = mainBooks.summary,
        author = mainBooks.author,
        price = mainBooks.price,
        likes = mainBooks.likes
        pubDate = mainBooks.pubDate
    })
 res ({
    msg: "성공하셨습다."
 })
})


module.exports = router;
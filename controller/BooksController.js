const mariadb = require("../database/mariadb");
const { StatusCodes } = require("http-status-codes");
const ensuerAuthorization = require("../auth"); // 인증 모듈듈
const jwt = require("jsonwebtoken");

const allBooks = (req, res) => {
  let allBooksRes = {};

  let { category_id, news, limit, currentPage } = req.query;
  let offset = limit * (currentPage - 1);
  let sql =
`SELECT SQL_CALC_FOUND_ROWS *, 
(SELECT count(*) FROM likes WHERE Books.id = liked_book_id)AS likes FROM Books`  
    let values = [];
  if (category_id && news) {
    sql +=
      " WHERE category_id=? AND pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()";
    values = [category_id];
  } else if (category_id) {
    sql += " WHERE category_id=? ";
    values = [category_id];
  } else if (news) {
    sql +=
      " WHERE pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()";
  }

  sql += " LIMIT ? OFFSET ?";
  values.push(parseInt(limit), offset);

  mariadb.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
     }
    console.log(results);
    if (results.length){
        results.map(function(result){
            result.pubDate = result.pub_date
            delete result.pub_date;
        })
         allBooksRes.books = results;
        }else{ 
    return res.status(StatusCodes.NOT_FOUND).end()
}
  });

  sql = " SELECT found_rows()";
  mariadb.query(sql, 
    (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    
    let pagenation = {};
    pagenation.currentPage = parseInt(currentPage);
    pagenation.totalCount = results[0]["found_rows()"];

    allBooksRes.pagenation = pagenation;
    return res.status(StatusCodes.OK).json(allBooksRes);
  });
};

const BooksDetail = (req, res) => {
  // 로그인 상태가 아니면 => liked빼고 보내주면 되고
  // 로그인 상태면 => liked 추가
  let authorization = ensuerAuthorization(req, res);

  if (authorization instanceof jwt.TokenExpiredError) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "로그인 세션이 만료되었습니다. 다시 로그인 해주세요!",
    });
  } else if (authorization instanceof jwt.JsonWebTokenError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "잘못된 토큰입니다! 다시 로그인 해주세요!",
    });
  } else if (authorization instanceof ReferenceError) {
    let Book_id = req.params.id;
    let sql = `SELECT *,
        (SELECT count(*) FROM likes WHERE liked_book_id=Books.id) AS likes
     FROM Books LEFT
Join category ON Books.category_id = category.category_id where Books.id = ?;`;
    let values = [Book_id];

    mariadb.query(sql, values, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      }
      if (results[0]) {
        return res.status(StatusCodes.OK).json(results[0]);
      } else {
        return res.status(StatusCodes.NOT_FOUND).end();
      }
    });
}
//    else {
//     //     let sql = `SELECT *,
//     //         (SELECT count(*) FROM likes WHERE liked_book_id=Books.id) AS likes,
//     //         (SELECT EXISTS (SELECT * FROM likes WHERE Member_id=? AND liked_book_id=?)) AS likes
//     //     FROM Books LEFT
//     // Join category ON Books.category_id = category.category_id where Books.id = ?;`;
//     // let values = [authorization.id,Book_id,Book_id]
//     //     mariadb.query(sql,values,
//     //         (err,results)=> {
//     //         if(err) {
//     //             console.log(err)
//     //             return res.status(StatusCodes.BAD_REQUEST).end()
//     //         }
//     //         if(results[0]){
//     //             return res.status(StatusCodes.OK).json(results[0])
//     //         }else {
//     //             return res.status(StatusCodes.NOT_FOUND).end()
//     //         }
//     //     })
//   }
};

module.exports = {
  allBooks,
  BooksDetail,
};

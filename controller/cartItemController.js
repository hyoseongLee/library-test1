const ensuerAuthorization = require("../auth")
const jwt = require ("jsonwebtoken")
const mariadb = require("../database/mariadb");
const { StatusCodes } = require("http-status-codes");


//장바구니 담기
const addToCart = (req, res) => {
  const { book_id, quantity} = req.body;

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
      let sql =
    " INSERT INTO cartItems (book_id, quantity,Member_id) VALUES (?, ?, ?)";
  let values = [book_id, quantity, authorization.id];
  mariadb.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    return res.status(StatusCodes.OK).json(results);
  });
};
  }



//장바구니 아이템 목록 조회
const getCartItem = (req, res) => {
  const { selected } = req.body;
  let authorization= ensuerAuthorization(req,res);

  if (authorization instanceof jwt.TokenExpiredError){
    return res.status(StatusCodes.UNAUTHORIZED).json({
      "message" : "로그인 세션이 만료되었습니다. 다시 로그인 해주세요!"
    })
  }else if(authorization instanceof jwt.JsonWebTokenError){
    return res.status(StatusCodes.BAD_REQUEST).json({
      "message" : "잘못된 토큰입니다! 다시 로그인 해주세요!"
    })
  }
  else { 
    let sql =
`SELECT cartItems.id, book_id, title, summary, quantity, price FROM
 cartItems LEFT JOIN Books ON
  cartItems.book_id = Books.id
  WHERE Member_id = ?`;
  let values = [authorization.id,selected];

    if(selected){ //주문서 작성 시 '선택한 장바구니 목록 조회'
sql += `AND cartItemId.IN (?)`;
      valeus.push(selected)
    }
  
  mariadb.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    return res.status(StatusCodes.OK).json(results);
  });
};
  }

//장바구니 도서 삭제
const removeCartitem = (req, res) => {
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
  const cartItemId = req.params.id;

  let sql = "DELETE FROM cartItems WHERE Member_id = ?  ";
  mariadb.query(sql,cartItemId,
     (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    return res.status(StatusCodes.OK).json(results);
  });
  }

};

module.exports = {
  addToCart,
  getCartItem,
  removeCartitem,
};

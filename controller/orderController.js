const ensuerAuthorization = require('../auth') // 인증 모듈듈
const jwt = require ("jsonwebtoken")
const mariadb = require("mysql2/promise");
const { StatusCodes } = require("http-status-codes");

const order = async (req, res) => {
  const connection = await mariadb.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "root",
    database: "library",
    dateStrings: true,
  });

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
  const {
    items,
    delivery,
    totalQuantity,
    totalPrice,
    firstBookTitle,
  } = req.body;

  //delivery 테이블 삽입
  let sql ="INSERT INTO delivery (address, receiver, contact) VALUES (?, ?, ?);"
  let values = [delivery.address, delivery.receiver, delivery.contact];

  let [results] = await connection.execute(sql, values);
  let delivery_id = results.insertId;

  // orders 테이블 삽입
  sql = `INSERT INTO orders (book_title, total_quantity,total_price,Member_id,delivery_id)
    VALUES(?,?,?,?,?);`
  values = [firstBookTitle, totalQuantity, totalPrice, authorization.id, delivery_id];
  [results] = await connection.execute(sql, values);
  let order_id = results.insertId;

  //Items를 가지고 장바구니에서 Book_id와 quantity 조회
  sql = "SELECT book_id, quantity FROM cartItems WHERE id IN (?);"
  let [orderItems, fields] = await connection.query(sql, [items]);
  //orderedBook 테이블 삽입
  sql =  `INSERT INTO orderedBook (ordered_id, book_id, quantity) VALUES ?;`
  // items.. 배열 : 요소들을 하나씩 꺼내서 (forEach문을 돌려서) >
  values = [];
  orderItems.forEach((item) => {
    values.push([order_id, item.book_id, item.quantity]);
  });

  results = await connection.query(sql, [values]);

  let result = await deleteCartItems(connection, items);

  return res.status(StatusCodes.OK).json(result);
};
  }


const deleteCartItems = async (connection, items) => {
  
  let sql = "DELETE FROM cartItems WHERE id IN (?);"

  let result = await connection.query(sql, [items]);
  return result;
};

const getOrders = async (req, res) => {
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
  const connection = await mariadb.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "root",
    database: "library",
    dateStrings: true,
  });
let sql=  `SELECT orders.id,created_at,address,receiver,contact,book_title,total_quantity,total_price
FROM  orders LEFT JOIN delivery
ON orders.delivery_id = delivery_id;`
let [rows, fields] = await connection.query(sql)
return res.status(StatusCodes.OK).json(rows)
};
  }

const getOrderDetail = async (req, res) => {
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
  const orderId  =req.params.id;

  const connection = await mariadb.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "root",
    database: "library",
    dateStrings: true,
  });
let sql=  `SELECT  book_id,title,author,price,quantity
FROM  orderedBook LEFT JOIN Books
ON orderedBook.book_id = Book_id
WHERE ordered_id = ?`
let [rows, fields] = await connection.query(sql,[orderId])
return res.status(StatusCodes.OK).json(rows)
};
  }


module.exports = { order, getOrders, getOrderDetail };

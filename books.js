// Express 모듈셋팅
const express = require("express");
const app = express();
app.listen(1234);

// 데이터 셋팅
let book1 = {
  bookTitle: "미움받을 용기",
  price: 39900,
  stock: 14,
};

let book2 = {
  bookTitle: "화성에서 온 남자 금성에서 온 여자",
  price: 49900,
  stock: 5,
};

let book3 = {
  bookTitle: "걷는 사람 하정우",
  price: 1499,
  stock: 3,
};

let db = new Map();
var id = 1;
db.set(id++, book1);
db.set(id++, book2);
db.set(id++, book3);

// Rest API 설계

app.get("/book/:id", (req, res) => {
  let { id } = req.params;
  id = parseInt(id);

  const book = db.get(id);
  if (book == undefined) {
    res.status(404).json({
      message: "찾을 수 없는 정보입니다.",
    });
  } else {
    res.json(book);
  }
});

app.get("/books", (req, res) => {
  console.log("책방입니다.");
  res.json(Array.from(db.values())); 
});

app.use(express.json());
app.post('/books', (req, res) => {
  db.set(id++, req.body);
  res.status(201).json({
    message: `${req.body.bookTitle} 책을 고르셨군요. 독서를 응원합니다!`
  });
});

app.delete('/books/:id', (req, res) => {
  let { id } = req.params;
  id = parseInt(id);

  const bookToDelete = db.get(id);

  if (bookToDelete === undefined) {
    return res.status(400).json({
      message: `요청하신 ${id}번 책은 존재하지 않습니다.`
    });
  }

  db.delete(id);

  res.json({
    message: `${bookToDelete.bookTitle}님 책은 선택받지 못하였습니다.`
  });
});

var msg =""


app.delete('/books', (req, res) => {
  if (db.size >= 1) {
    db.clear();
    res.json({
      msg: "모든 정보가 삭제되었습니다."
    });
  } else {
    res.json({
      msg: "삭제할 정보가 없습니다."
    });
  }
});

app.put('/books/:id', (req, res) => {
  let id = req.params.id;
  id = parseInt(id);

  var book = db.get(id);
  if (book == undefined) {
    res.status(400).json({
      message: "책을 찾을 수 없습니다."
    });
  } else {
    var oldBook = book.bookTitle;
    var newBook = req.body.bookTitle;
    book.bookTitle = newBook;
    db.set(id, book);

    res.json({
      message: `${oldBook} 책이 ${newBook}으로 변경되었습니다.`
    });
  }
});

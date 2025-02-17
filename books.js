//Express 모듈셋팅
const express = require("express");
const app = express();
app.listen(1234);

//데이터 셋팅
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

//Rest Api 설계

app.get("/book/:id", (req, res) => {
  let { id } = req.params;
  id = parseInt(id);

  const book = db.get(id);
  if (book == undefined) {
    res.json({
      message: "찾을 수 없는 정보입니다.",
    });
  } else {
    res.json(book);
  }
});

app.get("/books",(req,res)=> {
    console.log("책방입니다.")
})

app.use(express.json());
app.post('/book',(req,res)=> {
    db.set(id++,req.body)
    res.json({
        message : `${db.get(id-1).bookTitle}책을 고르셨군요. 독서를 응원합니다!`
    })
})
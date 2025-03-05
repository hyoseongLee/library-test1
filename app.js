const express = require("express");
const app = express();
const mainBooksRouter = require("./routes/mainBooks");
const MembersRouter = require("./routes/registerMembers");
const likesRouter = require("./routes/likes");
const ordersRouter = require('./routes/orders');
const cartsRouter = require('./routes/carts');

app.listen(1234);


app.use("/mainBooks", mainBooksRouter);
app.use("/registerMembers", MembersRouter);
app.use("/likes", likesRouter);
app.use("/orders", ordersRouter);
app.use("/carts", cartsRouter);
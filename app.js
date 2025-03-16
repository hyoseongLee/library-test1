const express = require("express");
const app = express();
const BooksRouter = require("./routes/Books");
const CategoryRouter = require("./routes/Category");
const MembersRouter = require("./routes/Members");
const likesRouter = require("./routes/likes");
const ordersRouter = require('./routes/orders');
const cartsRouter = require('./routes/cartItems');
const dotenv = require('dotenv');
dotenv.config();

app.listen(process.env.PORT);

app.use("/Books", BooksRouter);
app.use("/Category",CategoryRouter)
app.use("/Members", MembersRouter);
app.use("/likes", likesRouter);
app.use("/orders", ordersRouter);
app.use("/cartItems", cartsRouter);

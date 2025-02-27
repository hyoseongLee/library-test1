const express = require ('express')
const app = express()

app.listen(1234)

const booksRouter = require('./routes/books')
const login_demoRouter = require('./routes/login-demo')

app.use("/books",booksRouter)
app.use("/login_demoRouter",login_demoRouter)
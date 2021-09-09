require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cookieParser = require("cookie-parser");
const cors = require("cors");

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())
app.use(cookieParser())
app.use(cors())

const userRouter = require('./routers/userRouter')
app.use('/userRouter', userRouter)

const adminRouter = require('./routers/adminRouter')
app.use('/adminRouter',adminRouter)

const adminAction = require('./routers/adminAction')
app.use('/adminAction',adminAction)

const transactionRouter = require('./routers/transactionRouter')
app.use('/transactionRouter', transactionRouter)

app.get("/",(req, res) => res.status(200).send("Server is running"))
app.listen(8080, () => console.log('Server Started'))

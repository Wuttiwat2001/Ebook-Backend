const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const { authenMiddleware, authorizeMiddleware } = require('./helpers/auth')
const { ROLE } = require('./constant')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const authRouter = require('./routes/auth')
const booksRouter = require('./routes/books')

mongoose.set('strictQuery', false)
dotenv.config()
mongoose.connect('mongodb://localhost:27017/Project_intern')
const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', authenMiddleware, authorizeMiddleware([ROLE.ADMIN, ROLE.LOCAL_ADMIN, ROLE.USER]), usersRouter)
app.use('/auth', authRouter)
app.use('/books', booksRouter)

module.exports = app

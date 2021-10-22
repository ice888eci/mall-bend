const createError = require('http-errors')
const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

// const ShopRouter = require('./routes/shop')

const UserRouter = require('./routes/user')
const CartRouter = require('./routes/cart')
const CategoryRouter = require('./routes/categories')
const AddressRouter = require('./routes/address')
const OrderRouter = require('./routes/order')

const app = express()

app.all('*', function (req, res, next) {
  // 允许所有源
  res.header('Access-Control-Allow-Origin', '*')
  // 设置接收的头
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type,token,Content-Length, Authorization, Accept,X-Requested-With'
  )
  // 返回给前端token
  res.header('Access-Control-Expose-Headers', 'token')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  if (req.method == 'OPTIONS') res.sendStatus(200)
  else next()
})

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// app.use('/api/json/shop/', ShopRouter) //待完善

app.use('/api/json/user/', UserRouter)
app.use('/api/json/cart/', CartRouter)
app.use('/api/json/order/', OrderRouter)
app.use('/api/json/category/', CategoryRouter)
app.use('/api/json/address/', AddressRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  // render the error page
  res.status(err.status || 500)
  // res.render('error')
})

module.exports = app

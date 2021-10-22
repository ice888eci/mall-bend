const _ = require('../../')
const utils = require('../../utils')
// const alipaySdk = require('../../utils/alipaySdk')
/**
 * @POST  生成订单
 * @uid   用户的id
 * @cids  购物车商品ids
 * http://127.0.0.1:3000/api/json/order/orderList
 */

_.router.post(
  '/orderList',
  _.middleware.verify,
  async function (req, res, next) {
    const { uid } = req.body,
      cids = req.body.cids.split('-'),
      result = { products: [], address: {} },
      sql = _.config.dev.sql.order.orderProduct,
      orderAddress = _.config.dev.sql.order.orderAddress

    let state = null
    // 循环遍历返回数据
    for (const cid of cids) {
      const { status, data } = await _.db.query(sql, [cid, uid])
      result.products.push(data[0])
      state = status
    }
    // 地址数据
    const { data } = await _.db.query(orderAddress, [uid])
    result.address = data[0]
    res.json({ status: state, data: result })
  }
)

/**
 * @POST 创建订单
 * @uid 用户的id
 * @pids  下订单的商品列表
 * _.middleware.verify,
 * http://127.0.0.1:3000/api/json/order/orderCreate
 */
_.router.post(
  '/orderCreate',
  _.middleware.verify,
  async function (req, res, next) {
    const { uid, aid } = req.body,
      cids = req.body.cids.split('-'),
      createTime = new Date().getTime(),
      sql = _.config.dev.sql.order.orderCreate,
      payOrderInfoSql = _.config.dev.sql.order.payOrderInfo,
      orders = []

    for (const cid of cids) {
      const orderNumber = utils.orderCode(uid)
      await _.db.query(sql, [uid, cid, aid, createTime, orderNumber])
      const { data } = await _.db.query(payOrderInfoSql, [orderNumber])
      let { number, quantity, price, name, tel } = data[0]
      name = name.replace(/(.{1}).+?(.{1})/, '$1*$2')
      tel = tel.replace(/^(\d{3})\d*(\d{4})$/, '$1****$2')
      orders.push({ number, quantity, price, name, tel })
      _.cache.Set(orderNumber + '', ' ', 60 * 30) // 订单持续三十分钟倒计时
    }
    res.json({ status: 200, data: orders })
  }
)

/**
 * @POST 创建订单
 * @uid 用户的id
 * @numbers  订单号列表 join('-') 分割 必须是字符串
 * @totalPrice 总价钱
 * _.middleware.verify,
 * http://127.0.0.1:3000/api/json/order/payment
 */
_.router.post(
  '/payment',
  _.middleware.verify,
  _.middleware.checkPay,
  async function (req, res, next) {
    const { totalPrice, uid, payPwd, numbers } = req.body,
      planTime = new Date().getTime(),
      updateMoney = _.config.dev.sql.pay.updateMoney,
      updateSql = _.config.dev.sql.pay.update,
      checkGoods = _.config.dev.sql.pay.checkGoods

    // 更新用户金额 上面已经过滤了所有不许再判断
    await _.db.query(updateMoney, [totalPrice, uid, payPwd])
    // 分割转换成数组遍历
    for (const number of numbers.split('-')) {
      const { status } = await _.db.query(checkGoods, [number])
      if (status == 200) {
        // 更新订单/商品/购物车
        await _.db.query(updateSql, [planTime, number])
      } else {
        res.json({ status, data: { msg: '库存不足', status: 0 } })
        return
      }
    }
    res.json({ status: 200, data: { msg: '付款成功', status: 1 } })
  }
)

// _.router.post('/checkPayment', async function (req, res, next) {
//   const { out_trade_no, trade_no } = req.body,
//     result = await alipaySdk.FormDataQuery({ out_trade_no, trade_no })
//   res.send({ status: 200, data: result })
// })

/**
 * @POST 查看所有订单
 * @uid 用户的id
 * @type 0为全部 1查找状态为未支付，2付款发货，3订单关闭，
 * http://127.0.0.1:3000/api/json/order/orderAll
 */
_.router.post(
  '/orderAll',
  _.middleware.verify,
  async function (req, res, next) {
    const { uid, type } = req.body,
      allSql = _.config.dev.sql.order.orderAll,
      orderStatus = _.config.dev.sql.order.orderStatus

    console.log(type, 111111111111111)
    if (type == 0) {
      const { status, data } = await _.db.query(allSql, [uid])
      res.json({ status, data })
    } else if (type == 1) {
      const { status, data } = await _.db.query(orderStatus, [
        uid,
        type * 1 - 1,
      ])
      res.json({ status, data })
    } else if (type == 2) {
      const { status, data } = await _.db.query(orderStatus, [
        uid,
        type * 1 - 1,
      ])
      res.json({ status, data })
    } else if (type == 3) {
      const { status, data } = await _.db.query(orderStatus, [uid, type])
      res.json({ status, data })
    }
  }
)

/**
 * @POST 删除订单记录
 * @oid 订单的id
 * @uid 用户的id
 * http://127.0.0.1:3000/api/json/order/delOrders
 */
_.router.post(
  '/delOrders',
  _.middleware.verify,
  async function (req, res, next) {
    const { oid, uid } = req.body,
      sql = _.config.dev.sql.order.delOrder
    const { status } = await _.db.query(sql, [oid, uid])
    if (status == 200)
      res.json({ status, data: { status: 1, msg: '删除成功' } })
  }
)

module.exports = _.router

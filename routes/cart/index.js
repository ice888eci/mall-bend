const _ = require('../..')

/**
 * @POST 用户购物车的所以商品
 * @uid  用户的id
 * http://127.0.0.1:3000/api/json/cart/allGoods?uid=
 */
_.router.post(
  '/allGoods',
  _.middleware.verify,
  async function (req, res, next) {
    const { uid } = req.body
    const sql = _.config.dev.sql.cart.allGoods
    const result = await _.db.query(sql, [uid])
    res.json({ status: result.status, data: result.data })
  }
)

/**
 * @PUT 商品插入到用户购物车
 * @type <true|false> 真则更新数据,假则插入数据
 * @uid  用户id
 * @gid  商品id
 * @quantity 商品数量
 * http://127.0.0.1:3000/api/json/cart/addGoods
 */
_.router.put(
  '/addGoods',
  _.middleware.verify,
  _.middleware.checkGoods,
  async function (req, res, next) {
    const { type, quantity, uid, gid } = req.body
    // console.log(type, 1111111111111111111)
    const sql = type
      ? _.config.dev.sql.cart.updateGoods
      : _.config.dev.sql.cart.addGoods
    const result = await _.db.query(sql, [quantity * 1, uid, gid])
    res.json({ status: result.status, data: result.data })
  }
)

/**
 * @PUT 商品插入到用户购物车
 * @type <true|false> 真则更新数据,假则插入数据
 * @uid  用户id
 * @gid  商品id
 * @quantity 商品数量
 * http://127.0.0.1:3000/api/json/cart/addGoods
 */
_.router.put(
  '/addGoods',
  _.middleware.verify,
  _.middleware.checkGoods,
  async function (req, res, next) {
    const { type, quantity, uid, gid } = req.body
    const sql = type
      ? _.config.dev.sql.cart.increment
      : _.config.dev.sql.cart.addGoods
    const result = await _.db.query(sql, [quantity * 1, uid, gid])
    res.json({ status: result.status, data: result.data })
  }
)

/**
 * @PUT 更新商品的数量
 * @type <true|false> 真表示插入,加表示删除
 * @uid  用户id
 * @gid  商品id
 * @quantity 商品数量
 * http://127.0.0.1:3000/api/json/cart/updateGoods
 */
_.router.put(
  '/updateGoods',
  _.middleware.verify,
  async function (req, res, next) {
    const { type, quantity, uid, gid } = req.body
    const sql = type
      ? _.config.dev.sql.cart.increment
      : _.config.dev.sql.cart.decrement
    const result = await _.db.query(sql, [quantity * 1, uid, gid])
    res.json({ status: result.status, data: result.data })
  }
)

/**
 * @post 删除用户购物车的单间商品
 * @type <true|false> 真则查询到了数据,假则没有数据
 * @uid  用户id
 * @gid  商品id
 * http://127.0.0.1:3000/api/json/cart/delGoods
 */
_.router.post(
  '/delGoods',
  _.middleware.verify,
  _.middleware.checkGoods,
  async function (req, res, next) {
    const { type, uid, gid } = req.body
    if (!type) res.json({ status: 404, data: ['没有找到数据'] })
    else {
      const sql = _.config.dev.sql.cart.delGoods
      const result = await _.db.query(sql, [uid, gid])
      res.json({ status: result.status, data: result.data })
    }
  }
)

module.exports = _.router

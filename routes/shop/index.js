const _ = require('../')

// <params->:id | query->get | body->post>

/**
 * @GET 进入商品的详情页面
 * @id  商品的id
 * http://127.0.0.1:3000/api/json/shop/info
 */
_.router.get('/info', _.auth.intercept, async function (req, res, next) {
  const sql = _.config.dev.sql.shop.info
  const { id } = req.query
  const result = await _.db.query(sql, [id])
  if (result.status == 200) _.cache.Set(req.cacheKey, result.data)
  res.json({ status: result.status, data: result.data })
})

/**
 * @GET  获取主页面数据
 * @page 页面的页数
 * http://127.0.0.1:3000/api/json/shop/home
 */
_.router.get('/home', _.auth.intercept, async function (req, res, next) {
  const sql = _.config.dev.sql.shop.home
  const page = req.query.hasOwnProperty('page') ? req.query.page : 0
  const nums = 14
  const start = page * nums
  const result = await _.db.query(sql, [start, nums])
  if (result.status == 200) _.cache.Set(req.cacheKey, result.data)
  res.json({ status: result.status, data: result.data })
})

/**
 * @GET   进入商品的详情页面
 * @brand 商品的分类(品牌)
 * http://127.0.0.1:3000/api/json/shop/category
 */
_.router.get('/category', _.auth.intercept, async function (req, res, next) {
  const sql = _.config.dev.sql.shop.category
  const { brand } = req.query
  const result = await _.db.query(sql, [brand])
  if (result.status == 200) _.cache.Set(req.cacheKey, result.data)
  res.json({ status: result.status, data: result.data })
})

module.exports = _.router

const _ = require('../..')
/**
 * @GET 首页和分类的导航接口
 * http://127.0.0.1:3000/api/json/category/nav
 */
_.router.get('/nav', async function (req, res, next) {
  const sql = _.config.dev.sql.category.public.nav
  const result = await _.db.query(sql)
  // if (result.status == 200) _.cache.Set(cacheKey, result.data)
  res.json({ status: result.status, data: result.data })
})

/**
 * @GET 首页特色分类接口
 * http://127.0.0.1:3000/api/json/category/specialArea
 */
_.router.get('/specialArea', async function (req, res, next) {
  const sql = _.config.dev.sql.category.home.specialArea
  const result = await _.db.query(sql)
  // if (result.status == 200) _.cache.Set(cacheKey, result.data)
  res.json({ status: result.status, data: result.data })
})

/**
 * 首页Tabs全部的接口
 * @cacheKey URL地址缓存键
 * @page 页数
 * @num 条数
 * http://127.0.0.1:3000/api/json/category/tabsAllItem?page=0
 */
_.router.get(
  '/tabsAllItem',
  _.middleware.reidsCache,
  async function (req, res, next) {
    const { cacheKey } = req.query
    const page = req.query.hasOwnProperty('page') ? req.query.page : 0
    const nums = 20
    const sql = _.config.dev.sql.category.home.tabsAllItem
    const result = await _.db.query(sql, [page * nums, nums])
    if (result.status == 200) _.cache.Set(cacheKey, result.data)
    res.json({ status: result.status, data: result.data })
  }
)

/**
 * 首页晚上吃什么的接口
 * @cacheKey URL地址缓存键
 * http://127.0.0.1:3000/api/json/category/tabsDinnerItem?page=0
 */
_.router.get(
  '/tabsDinnerItem',
  _.middleware.reidsCache,
  async function (req, res, next) {
    const { cacheKey } = req.query
    const page = req.query.hasOwnProperty('page') ? req.query.page : 0
    const nums = 20
    const sql = _.config.dev.sql.category.home.tabsDinnerItem
    const result = await _.db.query(sql, [page * nums, nums])
    if (result.status == 200) _.cache.Set(cacheKey, result.data)
    res.json({ status: result.status, data: result.data })
  }
)

/**
 * 首页心选的接口
 * @cacheKey URL地址缓存键
 * http://127.0.0.1:3000/api/json/category/tabsQualityItem?page=0
 */
_.router.get(
  '/tabsQualityItem',
  _.middleware.reidsCache,
  async function (req, res, next) {
    const { cacheKey } = req.query
    const page = req.query.hasOwnProperty('page') ? req.query.page : 0
    const nums = 20
    const sql = _.config.dev.sql.category.home.tabsQualityItem
    const result = await _.db.query(sql, [page * nums, nums])
    if (result.status == 200) _.cache.Set(cacheKey, result.data)
    res.json({ status: result.status, data: result.data })
  }
)

/**
 * 首页畅销的接口
 * @cacheKey URL地址缓存键
 * http://127.0.0.1:3000/api/json/category/tabspopularItem?page=0
 */
_.router.get(
  '/tabspopularItem',
  _.middleware.reidsCache,
  async function (req, res, next) {
    const { cacheKey } = req.query
    const page = req.query.hasOwnProperty('page') ? req.query.page : 0
    const nums = 20
    const sql = _.config.dev.sql.category.home.tabspopularItem
    const result = await _.db.query(sql, [page * nums, nums])
    if (result.status == 200) _.cache.Set(cacheKey, result.data)
    res.json({ status: result.status, data: result.data })
  }
)

/**
 * 分类页面的数据
 * @cacheKey URL地址缓存键
 * http://127.0.0.1:3000/api/json/category/categoryList
 */
_.router.get(
  '/categoryList',
  _.middleware.reidsCache,
  async function (req, res, next) {
    const { cacheKey } = req.query
    const sql = _.config.dev.sql.category.category.categoryList
    const result = await _.db.query(sql)
    if (result.status == 200) _.cache.Set(cacheKey, result.data)
    res.json({ status: result.status, data: result.data })
  }
)

/**
 * 公共猜你喜欢
 * @cacheKey URL地址缓存键
 * http://127.0.0.1:3000/api/json/category/likeList
 */
_.router.get(
  '/likeList',
  _.middleware.reidsCache,
  async function (req, res, next) {
    const { cacheKey } = req.query
    const sql = _.config.dev.sql.category.public.likeList
    const result = await _.db.query(sql)
    if (result.status == 200) _.cache.Set(cacheKey, result.data)
    res.json({ status: result.status, data: result.data })
  }
)

/**
 * 获取分类列表点击后的数据
 * @cacheKey URL地址缓存键
 * @tag 分类列表的类型
 * http://127.0.0.1:3000/api/json/category/categoryListItem?tag=
 */
_.router.get(
  '/categoryListItem',
  _.middleware.reidsCache,
  async function (req, res, next) {
    const { cacheKey, tag } = req.query
    const sql = _.config.dev.sql.category.category.categoryListItem
    const result = await _.db.query(sql, [`%${tag}%`])
    if (result.status == 200) _.cache.Set(cacheKey, result.data)
    res.json({ status: result.status, data: result.data })
  }
)

/**
 * 获取分类列表点击后的数据
 * @cacheKey URL地址缓存键
 * @name 模糊匹配产品的的名称
 * http://127.0.0.1:3000/api/json/category/searchList?name=蔬菜
 */
_.router.get(
  '/searchList',
  _.middleware.reidsCache,
  async function (req, res, next) {
    const { cacheKey, name } = req.query
    const sql = _.config.dev.sql.category.public.searchList
    const result = await _.db.query(sql, [`%${name}%`])
    if (result.status == 200) _.cache.Set(cacheKey, result.data)
    res.json({ status: result.status, data: result.data })
  }
)

/**
 * 获取分类列表点击后的数据
 * @cacheKey URL地址缓存键
 * @name 模糊匹配产品的的名称
 * http://127.0.0.1:3000/api/json/category/searchRecommend
 */
_.router.get(
  '/searchRecommend',
  _.middleware.reidsCache,
  async function (req, res, next) {
    const { cacheKey } = req.query
    const sql = _.config.dev.sql.category.public.searchRecommend
    const result = await _.db.query(sql)
    if (result.status == 200) _.cache.Set(cacheKey, result.data)
    res.json({ status: result.status, data: result.data })
  }
)

module.exports = _.router

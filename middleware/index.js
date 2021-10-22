const config = require('../config')
const db = require('../db')
const cache = require('../redis')
const jwt = require('../utils/jwt')

class Middleware {
  async isRegister(req, res, next) {
    const isRegisterSql = config.dev.sql.user.isRegister
    req['rs'] = await db.query(isRegisterSql, [req.body.user])
    next()
  }

  async verify(req, res, next) {
    if (req.headers.hasOwnProperty('token')) {
      const token = req.headers.token
      console.log(token, 11111 + 'token')
      // 获取redis中缓存的token值
      const userId = await cache.getToken(token)
      if (userId) {
        // 判断该用户是否需要重新缓存
        const needRetime = await cache.cacheTokenRetime(token)
        if (needRetime) {
          // 删除旧的token
          await cache.delToken(token)
          const newToken = await jwt.createToken(
            { userId },
            config.dev.jwt.secret,
            {
              expiresIn: config.dev.jwt.timeout,
            }
          )
          cache.cacheToken(newToken, userId, config.dev.jwt.timeout)
          res.setHeader('token', newToken)
        }
        next()
      } else {
        res.json({ status: 403, data: ['无效的TOKEN'] })
      }
    } else {
      res.json({ status: 401, data: ['缺少TOKEN'] })
    }
  }

  async reidsCache(req, res, next) {
    const url = req.url
    const dataInCache = await cache.Get(url)
    if (dataInCache) {
      res.json({ status: 200, data: dataInCache, cache: true })
    } else {
      req.query.cacheKey = url
      next()
    }
  }

  // 检测购物车商品是否存在
  async checkGoods(req, res, next) {
    const { uid, gid } = req.body
    const sql = config.dev.sql.cart.checkGoods
    const result = await db.query(sql, [uid, gid])
    result.status == 200 ? (req.body.type = true) : (req.body.type = false)
    next()
  }

  async checkPay(req, res, next) {
    const { totalPrice, uid, payPwd } = req.body,
      moneySql = config.dev.sql.pay.checkMoney,
      checkPwdSql = config.dev.sql.pay.checkPwd
    const { status } = await db.query(checkPwdSql, [uid, payPwd])
    if (status == 200) {
      const { status } = await db.query(moneySql, [uid, totalPrice, payPwd])
      if (status == 200) {
        next()
      } else {
        res.json({ status, data: { msg: '余额不足', status: 0 } })
      }
    } else {
      res.json({ status, data: { msg: '密码错误', status: 0 } })
    }
  }
}
module.exports = new Middleware()

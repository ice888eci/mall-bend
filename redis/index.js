const _ = require('../')
const redis = require('redis')
const db = require('../db')
const config = require('../config')

class Cache {
  constructor() {
    this.client = redis.createClient(
      config.dev.redis.port,
      config.dev.redis.host,
      { db: 3 }
    )
    this.client.on('error', function (error) {
      console.error(error)
    })

    this.client.send_command(
      'config',
      ['set', 'notify-keyspace-events', 'Ex'],
      (e, r) => {
        new Sub().subscribe()
      }
    )
  }

  Set(key, val, timeout = 0) {
    this.client.set(key, JSON.stringify(val), redis.print)
    if (timeout > 0) {
      this.client.expire(key, timeout)
    }
  }

  /**
   * 是异步操作所以需要返回promise拿到里面的值
   * @param {String} key 缓存的键key
   * @expire 过期时间
   * @returns
   */
  Get(key) {
    return new Promise((res, rej) => {
      // 每次调用时重新计时倒计时
      this.client.expire(key, config.dev.redis.timeout)
      this.client.get(key, (err, reply) => {
        if (err) rej(err)
        res(JSON.parse(reply))
      })
    })
  }
  /**
   * 判断是否重新设置token的刷新时间
   * @param {*} token token
   * @param {*} duration 持续时间
   * @returns true需要重新设置,false不需要重新设置
   */
  //
  cacheTokenRetime(token, timeout = config.dev.jwt.timeout) {
    return new Promise((res, rej) => {
      this.client.ttl(token, function (err, reply) {
        if (err) res(err)
        const isRetime = timeout / 2 > reply ? true : false
        res(isRetime)
      })
    })
  }

  /**
   * 缓存token到redis方便拦截判断
   * @param {*} token 用户的token
   * @param {*} timeout 缓存的时间 要和设置token过期时间一致
   * @param {*} val  空值
   */
  cacheToken(token, val = '', timeout = config.dev.jwt.timeout) {
    this.client.set(token, val, redis.print)
    this.client.expire(token, timeout)
  }

  /**
   * 用户获取token
   * @param {*} token
   * @returns token值或者null
   */
  getToken(token) {
    return new Promise((res, rej) => {
      this.client.get(token, (err, reply) => {
        if (err) rej(err)
        res(reply)
      })
    })
  }

  /**
   * 删除快快失效的token
   * @param {*} token
   * @returns 删除成功返回1
   */
  delToken(token) {
    return new Promise((res) => {
      this.client.del(token, function (err, reply) {
        if (err) res(err)
        res(reply)
      })
    })
  }
}

class Sub {
  expired_subKey = '__keyevent@' + 3 + '__:expired'
  constructor() {
    this.sub = redis.createClient(
      config.dev.redis.port,
      config.dev.redis.host,
      { db: 3 }
    )
  }

  subscribe() {
    this.sub.subscribe(this.expired_subKey, () => {
      this.sub.on('message', (chan, key) => {
        this.message(key)
      })
    })
  }

  async message(key) {
    // 如果是订单号 纯数字
    if (/^[0-9]+.?[0-9]*/.test(key)) {
      const checkSql = config.dev.sql.order.checkOrderStatus
      const { status, data } = await db.query(checkSql, [key])
      if (status == 404) return
      if (data[0].status == 0) {
        const closeStatus = config.dev.sql.order.closeStatus
        await db.query(closeStatus, [key])
      }
    }
  }
}

module.exports = new Cache()

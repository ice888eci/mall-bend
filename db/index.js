const mysql = require('mysql')
const config = require('../config')
class DB {
  constructor() {
    this.db = mysql.createConnection(config.dev.mysql)
    this.db.connect()
  }
  /**
   * @param {String} sql sql语句
   * @param {Array} par sql语句参数
   * @returns callback
   */
  query(sql, par) {
    return new Promise((resolve, reject) => {
      this.db.query(sql, par, function (error, results, fields) {
        if (error) reject(error)
        console.log(results)
        results.length !== 0
          ? resolve({
              status: config.dev.api.success,
              data: results,
            })
          : resolve({
              status: config.dev.api.error,
              data: ['没有查询到数据'],
            })
      })
    })
  }
  insert(sql, par) {
    return new Promise((resolve, reject) => {
      this.db.query(sql, par, function (error, results, fields) {
        if (error) reject(error)
        results.affectedRows
          ? resolve({
              status: config.dev.api.success,
              data: [],
            })
          : resolve({
              status: config.dev.api.error,
              data: [],
            })
      })
    })
  }
}
module.exports = new DB()

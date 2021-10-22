const jwt = require('jsonwebtoken')
class Jwt {
  /**
   * 生成token
   * @param {*} payload  基本信息
   * @param {*} secret  密钥
   * @param {*} options 时效 { expiresIn: 1 }
   * @returns
   */
  createToken(payload, secret, options) {
    const token = jwt.sign(payload, secret, options)
    return Promise.resolve(token)
  }

  /**
   * 验证token是否正确
   * @param {*} token token
   * @param {*} secret 公钥
   * @returns
   */
  verifyToken(token, secret) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, function (err, decoded) {
        if (err) reject(err.message)
        resolve(decoded)
      })
    })
  }
}

module.exports = new Jwt()

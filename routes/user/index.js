const _ = require('../..')
const bcrypt = require('bcrypt')
/**
 * 用户注册页眉
 * @user 用户名
 * @pwd 用户密码
 * http://127.0.0.1:3000/api/json/user/register
 */
_.router.post(
  '/register',
  _.middleware.isRegister,
  async function (req, res, next) {
    const sql = _.config.dev.sql.user.register,
      { user, pwd } = req.body,
      { rs } = req

    // 判断是否注册
    if (rs.status == 200) {
      res.json({ status: 404, data: ['你已注册过'] })
    } else {
      const result = await _.db.insert(sql, [user, bcrypt.hashSync(pwd, 10)])
      if (result.status == 200) {
        result.data.push('注册成功')
      } else {
        result.data.push('注册失败')
      }
      res.json({ status: result.status, data: result.data })
    }
  }
)

/**
 * 登陆页面登陆成功返回一个访问token给前端
 * @user 用户名
 * @pwd 用户密码
 * http://127.0.0.1:3000/api/json/user/login
 */
_.router.post(
  '/login',
  _.middleware.isRegister,
  async function (req, res, next) {
    const { pwd } = req.body,
      { rs } = req,
      { u_name, u_nicname, u_icons, u_money, u_truename } = rs.data[0]
    // 查询到200表明已注册

    if (rs.status == 200) {
      const isPass = bcrypt.compareSync(pwd, rs.data[0].u_pwd)
      if (isPass) {
        // 登陆成功后返回一个5分钟的访问访问
        const token = await _.jwt.createToken(
          { id: rs.data[0].id + '' },
          _.config.dev.jwt.secret,
          {
            expiresIn: 300,
          }
        )
        _.cache.cacheToken(token, rs.data[0].id + '', 300)
        res.setHeader('token', token)
        // console.log(rs.data, 1111111111111111)
        res.json({
          status: rs.status,
          data: {
            msg: `登录成功`,
            uid: rs.data[0].id,
            token,
            info: {
              name: u_name,
              nicname: u_nicname,
              icons: u_icons,
              money: u_money,
              truename: u_truename ? u_truename : u_name,
            },
          },
        })
      } else {
        res.json({
          status: 404,
          data: { msg: `密码错误`, uid: null, token: null },
        })
      }
    } else {
      res.json({
        status: 404,
        data: { msg: `您还没注册`, uid: null, token: null },
      })
    }
  }
)

module.exports = _.router

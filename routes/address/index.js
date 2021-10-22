const _ = require('../..')

/**
 * @POST 用户收获所有的地址
 * 收货地址的信息参数
 * @uid 用户的id
 * http://127.0.0.1:3000/api/json/address/allAddress
 */
_.router.post(
  '/allAddress',
  _.middleware.verify,
  async function (req, res, next) {
    const { uid } = req.body
    const sql = _.config.dev.sql.address.all
    const result = await _.db.query(sql, [uid])
    if (result.status == 200) {
      res.json({ status: result.status, data: result.data })
    }
  }
)

/**
 * @put 用户收获地址添加
 * 收货地址的信息参数
 * @uid 用户的id
 * @name @phone @province @city @county @address @isDefault @addressDetail @areaCode
 * http://127.0.0.1:3000/api/json/address/addAddress
 */
_.router.put(
  '/addAddress',
  _.middleware.verify,
  async function (req, res, next) {
    let {
        uid,
        name,
        tel,
        province,
        city,
        county,
        addressDetail,
        isDefault,
        areaCode,
      } = req.body,
      address = province + city + county + addressDetail

    const sql = _.config.dev.sql.address.add
    // 判断是否需要重置默认地址给
    if (isDefault) await _.db.query(_.config.dev.sql.address.resetDefault, uid)
    const result = await _.db.query(sql, [
      uid,
      name,
      tel,
      province,
      city,
      county,
      address,
      isDefault,
      addressDetail,
      areaCode,
    ])
    if (result.status == 200) {
      res.json({ status: result.status, data: { status: 1, msg: '插入成功' } })
    } else {
      res.json({ status: result.status, data: { status: 0, msg: '插入失败' } })
    }
  }
)

/**
 * @put 用户收获地址添加
 * 收货地址的信息参数
 * @id 收获地址信息的id
 * @name @tel @province @city @county @address @isDefault
 * http://127.0.0.1:3000/api/json/address/editAddress
 */
_.router.put(
  '/editAddress',
  _.middleware.verify,
  async function (req, res, next) {
    let {
        id,
        name,
        tel,
        province,
        city,
        county,
        addressDetail,
        isDefault,
        areaCode,
        u_id,
      } = req.body,
      address = province + city + county + addressDetail
    const sql = _.config.dev.sql.address.edit
    if (isDefault) await _.db.query(_.config.dev.sql.address.resetDefault, u_id)
    const result = await _.db.query(sql, [
      name,
      tel,
      province,
      city,
      county,
      address,
      isDefault,
      addressDetail,
      areaCode,
      id,
    ])
    if (result.status == 200) {
      res.json({ status: result.status, data: { status: 1, msg: '修改成功' } })
    } else {
      res.json({ status: result.status, data: { status: 0, msg: '修改失败' } })
    }
  }
)

/**
 * @POST 用户收获所有的地址
 * 收货地址的信息参数
 * @uid 用户的id
 * http://127.0.0.1:3000/api/json/address/delAddress
 */
_.router.post(
  '/delAddress',
  _.middleware.verify,
  async function (req, res, next) {
    const { u_id, id } = req.body
    const sql = _.config.dev.sql.address.del
    const result = await _.db.query(sql, [u_id, id])
    if (result.status == 200) {
      res.json({ status: result.status, data: { status: 1, msg: '删除成功' } })
    } else {
      res.json({ status: result.status, data: { status: 0, msg: '删除失败' } })
    }
  }
)

module.exports = _.router

class Utils {
  orderCode(uid) {
    var orderCode = ''
    for (var i = 0; i < 6; i++) {
      //6位随机数，用以加在时间戳后面。
      orderCode += Math.floor(Math.random() * 10)
    }
    return new Date().getTime() + orderCode + '0' + uid //时间戳+6位随机数+uid
  }
}

module.exports = new Utils()

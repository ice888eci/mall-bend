const config = require('../config')
const alipaySdk = require('alipay-sdk').default
const AlipayFormData = require('alipay-sdk/lib/form').default

class AlipaySdk {
  constructor() {
    this.alipay = new alipaySdk({
      appId: config.dev.alipaySdk.appId,
      signType: config.dev.alipaySdk.signType,
      gateway: config.dev.alipaySdk.gateway,
      alipayPublicKey: config.dev.alipaySdk.publicKey,
      privateKey: config.dev.alipaySdk.privateKey,
    })
  }
  async FormDataPay(data) {
    const formData = new AlipayFormData()
    formData.setMethod('get')
    formData.addField('returnUrl', 'http://localhost:8080/#/order/PaySuccess') //支付成功之后跳转的页面
    formData.addField('quitUrl', 'http://localhost:8080/#/cart') //退出支付后跳转的页面
    formData.addField('bizContent', {
      outTradeNo: data.alipayId,
      productCode: 'FAST_INSTANT_TRADE_PAY',
      totalAmount: data.price,
      subject: '商品',
      body: '商品详情',
    })
    return await this.alipay.exec(
      'alipay.trade.wap.pay',
      {},
      { formData: formData }
    )
  }
  async FormDataQuery({ out_trade_no, trade_no }) {
    const formData = new AlipayFormData()
    formData.setMethod('get')
    formData.addField('bizContent', { out_trade_no, trade_no })
    return await this.alipay.exec(
      'alipay.trade.query',
      {},
      { formData: formData }
    )
  }
}

module.exports = new AlipaySdk()

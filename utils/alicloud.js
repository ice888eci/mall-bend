const config = require('../config')
const Core = require('@alicloud/pop-core')

class Alicloud {
  constructor() {
    this.client = new Core({
      accessKeyId: config.dev.alicloud.accessKeyId,
      accessKeySecret: config.dev.alicloud.accessKeySecret,
      endpoint: config.dev.alicloud.endpoint,
      apiVersion: config.dev.alicloud.apiVersion,
    })
  }

  async sendSms(params = {}, requestOption = { method: 'POST' }) {
    try {
      const result = this.client.request('SendSms', params, requestOption)
      console.log(JSON.stringify(result))
    } catch (error) {
      console.log(ex)
    }
  }
}

module.exports = new Alicloud()

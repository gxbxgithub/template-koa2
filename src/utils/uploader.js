const OSS = require('ali-oss')

class AliOSS {
  constructor() {
    this.client = null
  }
  
  put(namePath, localFilePath) {
    if (this.client) {
      return this.client.put(namePath, localFilePath)
    }
    if (appSettings && appSettings.oss) {
      this.client = new OSS(appSettings.oss)
      return this.client.put(namePath, localFilePath)
    }
  }
}

module.exports = new AliOSS()
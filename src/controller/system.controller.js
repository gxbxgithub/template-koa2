const fs = require('fs')
const path = require('path')
const reqResult = require('../utils/reqResult')
const dayjs = require('dayjs')
const uuid = require('node-uuid')
const uploader = require('../utils/uploader')
const { ALI_OSS_UPLOAD_PATH } = require('../config/config.default')

class SystemController {
  async upload(ctx) {
    try {
      const img = ctx.request.files ? ctx.request.files.file : null
      if (!img) {
        return ctx.body = reqResult.error('选择资源异常')
      }
      const pathWithMonth = `${ALI_OSS_UPLOAD_PATH}/${dayjs().format('YYYY-MM-DD')}/`,
        extname = path.extname(img.name || '*.png'),
        imgName = uuid.v4() + extname,
        pathForOss = pathWithMonth + imgName;
      const readable = fs.createReadStream(img.path)
      const result = await uploader.put(pathForOss, readable)
      if (!result) return ctx.body = reqResult.error('图片上传失败')
      const imgOnlineUrl = `http://****.com/${result.name}`
      ctx.body = reqResult.success('图片上传成功', imgOnlineUrl)
    } catch (error) {
      console.log(error);
      ctx.app.emit('error', reqResult.error('图片上传错误'), ctx)
    }
  }
}

module.exports = new SystemController()
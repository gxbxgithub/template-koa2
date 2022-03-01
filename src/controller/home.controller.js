const reqResult = require('../utils/reqResult')

class ArticleController {
  async loaddata(ctx) {
    const result = { name: 'xxx', age: 17 }
    try {
      ctx.body = reqResult.success('数据加载成功', result)
    } catch (error) {
      ctx.app.emit('error', reqResult.error('数据加载错误'), ctx)
    }
  }
}

module.exports = new ArticleController()
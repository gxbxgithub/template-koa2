const reqResult = require('../utils/reqResult')

/** 文章 */
const articleValidator = async (ctx, next) => {
  // 合法性
  let { title, type, content } = ctx.request.body
  let msg = ''
  if (!title) msg += '标题、'
  if (!type) msg += '分类、'
  if (!content) msg += '内容、'
  if (msg) {
    msg = msg.slice(0, -1)
    return ctx.app.emit('error', reqResult.params(`请将 ${msg} 填写完整`), ctx)
  }
  await next()
}

/** 菜单 */
const menuValidator = async (ctx, next) => {
  // 合法性
  let { name, path } = ctx.request.body
  let msg = ''
  if (!name) msg += '名称、'
  if (!path) msg += '路径、'
  if (msg) {
    msg = msg.slice(0, -1)
    return ctx.app.emit('error', reqResult.params(`请将 ${msg} 填写完整`), ctx)
  }
  await next()
}

module.exports = {
  articleValidator,
  menuValidator
}
const jwt = require('jsonwebtoken')
const reqResult = require('../utils/reqResult')
const { JWT_SECRET } = require('../config/config.default')

const auth = async (ctx, next) => {
  const { authorization } = ctx.request.header
  const token = authorization && authorization.replace('Bearer ', '')
  try {
    const userInfo = jwt.verify(token, JWT_SECRET)
    ctx.state.user = userInfo
  } catch (error) {
    console.log(error)
    return ctx.app.emit('error', reqResult.token(), ctx)
  }

  await next()
}

module.exports = {
  auth
}
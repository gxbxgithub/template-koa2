const bcrypt = require('bcryptjs')
const reqResult = require('../utils/reqResult')
const userModel = require('../models/user')

const userValidator = async (ctx, next) => {
  const { username, password } = ctx.request.body
  // 合法性
  if (!username || !password) {
    return ctx.app.emit('error', reqResult.params('用户名或密码为空'), ctx)
  }
  await next()
}

const verifyUser = async (ctx, next) => {
  const { username } = ctx.request.body
  // 合理性
  try {
    const userInfo = await userModel.getUserInfo({ username })
    if (userInfo) {
      return ctx.app.emit('error', reqResult.fail('用户已经存在'), ctx)
    }
  } catch (error) {
    return ctx.app.emit('error', reqResult.error('用户注册错误'), ctx)
  }

  await next()
}

const passValidator = async (ctx, next) => {
  const { _id } = ctx.state.user
  let {oldpass, newpass, surepass} = ctx.request.body
  if (!oldpass || !newpass || !surepass) {
    return ctx.app.emit('error', reqResult.params('缺少参数'), ctx)
  }
  if (newpass != surepass) {
    return ctx.app.emit('error', reqResult.params('两次输入的新密码不一致'), ctx)
  }
  try {
    const userInfo = await userModel.getUserInfo({ _id })
    if (!userInfo) return ctx.app.emit('error', reqResult.token('该用户不存在'), ctx)
    if (!bcrypt.compareSync(oldpass, userInfo.password)) return ctx.app.emit('error', reqResult.fail('旧密码不匹配'), ctx)
  } catch (error) {
    return ctx.app.emit('error', reqResult.error('修改密码错误'), ctx)
  }
  ctx.request.body.password = newpass
  await next()
}

const cryptPassword = async (ctx, next) => {
  const { password } = ctx.request.body
  const salt = bcrypt.genSaltSync(10) // 加盐
  const hash = bcrypt.hashSync(password, salt) // 加密
  ctx.request.body.password = hash
  await next()
}

const verifyLogin = async (ctx, next) => {
  const { username, password } = ctx.request.body
  try {
    const userInfo = await userModel.getUserInfo({ username })
    if (!userInfo) {
      return ctx.app.emit('error', reqResult.fail('用户不存在'), ctx)
    }
    if (!bcrypt.compareSync(password, userInfo.password)) {
      return ctx.app.emit('error', reqResult.fail('密码不匹配'), ctx)
    }
  } catch (error) {
    console.log(error);
    return ctx.app.emit('error', reqResult.error('用户登录错误'), ctx)
  }

  await next()
}

const verifyAuthUser = async (ctx, next) => {
  const { _id } = ctx.state.user
  // 合理性
  try {
    const userInfo = await userModel.getUserInfo({ _id })
    if (!userInfo) {
      return ctx.app.emit('error', reqResult.fail('用户不存在'), ctx)
    }
  } catch (error) {
    return ctx.app.emit('error', reqResult.error('用户信息修改失败'), ctx)
  }

  await next()
}

module.exports = {
  userValidator,
  verifyUser,
  passValidator,
  cryptPassword,
  verifyLogin,
  verifyAuthUser
}
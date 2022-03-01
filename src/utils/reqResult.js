const CODE = {
  SUCCESS: 0,                 //成功
  FAIL: 10001,                //请求失败
  TIMEOUT: 10002,             //请求超时
  PARAM_ILLEGAL: 10003,       //参数不合法
  AUTH: 10004,                //暂无权限
  TOKEN: 10005,               //Token无效
  ERROR: 10006,               //请求异常
}
const MSG = {
  SUCCESS: "请求成功",
  FAIL: "请求失败",
  TIMEOUT: "请求超时",
  PARAM_ILLEGAL: "参数不合法",
  AUTH: "暂无权限",
  TOKEN: "无效的token",
  ERROR: "请求异常",
}
const MOOD = {
  OKEY: "^o^",
  NOTCARE: "~_~",
  BAD: "ˇoˇ"
}

module.exports = {
  success: (message, data = '') => {
    message = message || MSG.SUCCESS
    message += MOOD.OKEY
    return { code: CODE.SUCCESS, message, data }
  },
  fail: (message, data = '') => {
    message = message || MSG.FAIL
    message += MOOD.NOTCARE
    return { code: CODE.FAIL, message, data }
  },
  timeout: (message, data = '') => {
    message = message || MSG.TIMEOUT
    message += MOOD.NOTCARE
    return { code: CODE.TIMEOUT, message, data }
  },
  params: (message, data = '') => {
    message = message || MSG.PARAM_ILLEGAL
    message += MOOD.NOTCARE
    return { code: CODE.PARAM_ILLEGAL, message, data }
  },
  auth: (message, data = '') => {
    message = message || MSG.AUTH
    message += MOOD.NOTCARE
    return { code: CODE.AUTH, message, data }
  },
  token: (message, data = '') => {
    message = message || MSG.TOKEN
    message += MOOD.NOTCARE
    return { code: CODE.TOKEN, message, data }
  },
  error: (message, data = '') => {
    message = message || MSG.ERROR
    message += MOOD.BAD
    return { code: CODE.ERROR, message, data }
  },
}
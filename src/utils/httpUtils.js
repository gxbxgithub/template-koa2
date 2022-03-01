const axios = require('axios')
const TIMEOUT = 30000

/**
 * GET请求
 * @param {*} url 
 * @param {*} params 
 * @returns {Promise}
 */
const get = async (url, params, timeout = TIMEOUT) => {
  return new Promise((resolve, reject) => {
    axios.get(url, { params, timeout }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * POST请求
 * @param {*} url 
 * @param {*} params 
 * @returns {Promise}
 */
const post = async (url, params, config = {}, timeout = TIMEOUT) => {
  return new Promise((resolve, reject) => {
    axios.post(url, params, { timeout, ...config }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * 拼接对象参数
 * @param {*} url 
 * @param {*} params 
 * @returns 
 */
function parseGetParams(url, params) {
  if (!params) return url
  let hasQM = url.indexOf('?') > -1
  for (let key in params) {
    url += (hasQM ? '&' : '?') + `${key}=${params[key]}`
    hasQM = true
  }
  return url;
}

module.exports = {
  get,
  post
}
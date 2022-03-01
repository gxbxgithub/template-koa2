const Router = require('koa-router')
const router = new Router({ prefix: '/system' })
const systemController = require('../controller/system.controller')
const { auth } = require('../middleware/auth.middleware')

// 文件图片
router.post('/upload', auth, systemController.upload)

module.exports = router
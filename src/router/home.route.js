const Router = require('koa-router')
const router = new Router()
const homeController = require('../controller/home.controller')

router.get('/', homeController.loaddata)

module.exports = router
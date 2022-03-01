const fs = require('fs')
const Router = require('koa-router')
const router = new Router({ prefix: '/' })

fs.readdirSync(__dirname).forEach(file => {
  if (file != 'index.js') {
    let rt = require('./' + file)
    router.use(rt.routes())
  }
})

module.exports = router
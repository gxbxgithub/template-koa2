const mongoose = require('mongoose')

const pools = {}, models = {}

const pool = async (dbName) => {
  if (pools[dbName]) {
    return pools[dbName]
  }
  const db = mongoose.createConnection(appSettings.mongodb[dbName], {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    auto_reconnect: true,
    poolSize: 2
  })
  pools[dbName] = db
  db.on('error', function (err) {
    console.log('Mongoose connection error: ' + err);
  })
  return db
}
const model = async (database, table, schema) => {
  let table_name = database + "_" + table
  if (models[table_name]) {
    return models[table_name]
  }
  let pl = await pool(database)
  let model = pl.model(table, schema, table);
  models[table_name] = model
  return model
}
const find = async (model, query, fields = null, options = null) => {
  return new Promise((resolve, reject) => {
    model.find(query, fields, options, (err, docs) => {
      if (err) reject(err)
      else resolve(docs)
    })
  })
}
const findOne = async (model, query) => {
  return new Promise((resolve, reject) => {
    model.findOne(query, (err, item) => {
      if (err) reject(err)
      else resolve(item)
    })
  })
}
const count = async (model, query) => {
  return new Promise((resolve, reject) => {
    model.countDocuments(query, (err, count) => {
      if (err) reject(err)
      else resolve(count)
    })
  })
}
const insert = async (model, object) => {
  return new Promise((resolve, reject) => {
    if (typeof object != 'object') reject(new Error('传入了错误的参数~'))
    if (!Array.isArray(object)) {
      object = [object]
    }
    model.insertMany(object, (err, docs) => {
      if (err) reject(err)
      else resolve(docs)
    })
  })
}
const update = async (model, query, data, options = { multi: false }) => {
  return new Promise((resolve, reject) => {
    if (options.multi) {
      model.updateMany(query, { $set: data }, options, function (err, res) {
        if (err) reject(err)
        else resolve(res);
      })
    } else {
      model.updateOne(query, { $set: data }, options, function (err, res) {
        if (err) reject(err)
        else resolve(res);
      })
    }
  })
}
const remove = async (model, query) => {
  return new Promise((resolve, reject) => {
    model.deleteMany(query, function (err, res) {
      if (err) reject(err)
      else resolve(res);
    })
  })
}
const aggregate = async (model, aggregation) => {
  return new Promise((resolve, reject) => {
    model.aggregate(aggregation, (err, res) => {
      if (err) reject(err)
      else resolve(res)
    })
  })
}

module.exports = {
  pool,
  model,
  find,
  findOne,
  count,
  insert,
  update,
  remove,
  aggregate
}



/**
  1. model:
  insert: 主键不存在则正常插入；主键已存在，抛出 DuplicateKeyException 异常。
  save: 主键不存在则正常插入；主键已存在则更新。
  insertMany：批量插入，等同于批量执行 insert。
  create：批量保存，等同于循环执行 save。

  2. aggregate:
  * $match // 条件匹配。只满足条件的文档才能进入下一阶段
  * $project // 增加、删除、重命名字段{_id: 0, isAdmin: 1}
  $limit // 限制结果的数量
  $skip	// 跳过文档的数量
  $sort	// 条件排序
  $group // 条件组合结果 统计
  * $lookup	// 用以引入其它集合的数据（表关联查询）
 */
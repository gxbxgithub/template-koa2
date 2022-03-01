const { Schema } = require('mongoose')
const dbHelper = require('../utils/dbHelper')

const articleSchema = new Schema({
  title: String,
  createAt: {
    type: Date,
    default: Date.now
  }
})

const DATABASE_NAME = "***"
const TABLE_NAME = "test"
const getModel = async () => {
  return await dbHelper.model(DATABASE_NAME, TABLE_NAME, articleSchema)
}

module.exports = {
  async add(params) {
    const model = await getModel()
    return await dbHelper.insert(model, params)
  },
  async detail(query) {
    const model = await getModel()
    return await dbHelper.findOne(model, query)
  },
  async list(query, fields, options) {
    const model = await getModel()
    let list = await dbHelper.find(model, query, fields, options)
    let total = await dbHelper.count(model, query);
    return { list, total }
  },
  async listByQuery(query, fields, options) {
    const model = await getModel()
    let list = await dbHelper.find(model, query, fields, options)
    return list
  },
  async count(query) {
    const model = await getModel()
    let total = await dbHelper.count(model, query)
    return total
  },
  async update({ _id, ...newData }) {
    const model = await getModel()
    return await dbHelper.update(model, { _id }, newData)
  },
  async updateMany(query, data) {
    const model = await getModel()
    return await dbHelper.update(model, query, data, { multi: true })
  },
  async delete({ _id }) {
    const model = await getModel()
    return await dbHelper.remove(model, { _id })
  }
}
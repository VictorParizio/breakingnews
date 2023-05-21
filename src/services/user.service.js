const User = require('../models/User')

const createService = (body) => User.create(body)
const findAllService = () => User.find()

module.exports = {
    createService,
    findAllService
}
const Router = require('express').Router();

const controller = require('./../controllers/userController')
Router.post('/v1/users', controller.manage)

module.exports = Router;
const express = require("express");
const routes = express.Router();
const userController = require('../controllers/user');
routes.post('/login', userController.logIn);
module.exports = routes;
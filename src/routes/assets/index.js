'use strict'

const express = require('express')
const assetsController = require('../../controllers/assets.controller')
const router = express.Router()
const { asyncHandle } = require('../../auth/checkAuth')
// sign up
router.post('/shop/signup', asyncHandle(assetsController.signUp))
router.post('/shop/login', asyncHandle(assetsController.login))
module.exports = router 
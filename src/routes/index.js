'use strict'

const express = require('express')
const router = express.Router()
const { apiKey, permission } = require('../auth/checkAuth')
// check api key
router.use(apiKey)
router.use(permission('0000'))


router.use('/v1/api', require('./assets'))

module.exports = router 
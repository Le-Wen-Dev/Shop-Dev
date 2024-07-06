'use strict'

const { findById } = require('../services/apikey.service')

const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'authorization'
}
const apiKey = async (req, res, next) => {
    try {
        const key = req.headers[HEADER.API_KEY]?.toString()
        if (!key) {
            return res.status(403).json({
                message: 'forbidden error row 14 check auth'
            })
        }
        // check objkey service
        const objKey = await findById(key)
        if (!objKey) {
            return res.status(403).json({
                message: 'forbidden error objkey row 21 checkauth'
            })
        }
        req.objKey = objKey
        return next()
    } catch (error) {
        return res.status(500).json({
            message: 'Lỗi hàm apikey dòng 28'
        })
    }
}
const permission = (permission) => {
    // ha, close sure tra ve 1 ham co the su dung cac bien cua ham cha
    return (req, res, next) => {
        if (!req.objKey.permissions) {
            return res.status(403).json({
                message: 'forbidden error permission denied row 35 checkauth'
            })
        }
        console.log(`permission::`, req.objKey.permissions);
        const validPermission = req.objKey.permissions.includes(permission)
        if (!validPermission) {
            return res.status(403).json({
                message: 'forbidden error permission denied row 42 checkauth'
            })
        }
        return next()
    }
}
const asyncHandle = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(next)
    }
}
module.exports = { apiKey, permission, asyncHandle }
'use strict'

const AssetsService = require("../services/assets.service");
const { OK, CREATED, SuccessResponse } = require('../core/success.response')

class AssetsController {
    login = async (req, res, next) => {
        new SuccessResponse({
            metadata: await AssetsService.login(req.body)
        }).send(res)
    }
    signUp = async (req, res, next) => {
        const { name, email, password } = req.body; // Extract fields from req.body
        console.log(`[P]:::signUp`, { name, email, password }); // Ensure data is extracted correctly

        const result = await AssetsService.signUp(name, email, password); // Pass extracted fields to signUp method

        return new CREATED({
            message: 'Registered OK',
            metadata: result
        }).send(res);

    }
}


module.exports = new AssetsController()
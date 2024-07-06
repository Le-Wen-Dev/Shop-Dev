'use strict'

const AssetsService = require("../services/assets.service");
const { OK, CREATED } = require('../core/success.response')
// class AssetsController {
//     signUp = async (req, res, next) => {
//         const { name, email, password } = req.body; // Trích xuất các trường name, email, password từ req.body
//         console.log(`[P]:::signUp`, { name, email, password }); // Đảm bảo rằng dữ liệu được trích xuất đúng
//         return res.status(200).json(await AssetsService.signUp(name, email, password)); // Truyền các trường đã trích xuất vào hàm signUp

//     }
// }
class AssetsController {
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
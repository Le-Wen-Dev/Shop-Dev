'use strict';

const keytokenModel = require("../models/keytoken.model");

class KeyTokenService {
    static createKeyToken = async ({ userId, publicKey, privateKey, refreshToken }) => {
        try {
            const filter = { user: userId };
            const update = {
                publicKey,
                privateKey,
                refreshTokenUsed: [],
                refreshToken
            };
            const options = { upsert: true, new: true }; // Lựa chọn upsert và trả về bản ghi sau khi cập nhật

            // Thực hiện cập nhật và đợi kết quả
            const token = await keytokenModel.findOneAndUpdate(filter, update, options);

            // Kiểm tra và trả về kết quả
            if (token) {
                return token;
            } else {
                throw new Error('Failed to create or update key token');
            }
        } catch (error) {
            console.error(`Error in createKeyToken:`, error);
            throw new Error('Failed to create key token'); // Ném ra lỗi để xử lý ở layer cao hơn
        }
    }
}

module.exports = KeyTokenService;

'use strict';

const keytokenModel = require("../models/keytoken.model");

class KeyTokenService {
    static createKeyToken = async ({ userId, publicKey, privateKey }) => {
        try {
            const tokens = await keytokenModel.create({
                user: userId,
                publicKey,
                privateKey
            });
            return tokens; // Nếu thành công, trả về publicKeyString
        } catch (error) {
            console.error(`Error in createKeyToken:`, error);
            throw new Error('Failed to create key token'); // Ném ra lỗi để xử lý ở layer cao hơn
        }
    }
}

module.exports = KeyTokenService;

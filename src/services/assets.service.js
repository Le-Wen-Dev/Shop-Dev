'use strict';
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const shopModel = require('../models/shop.model');
const KeyTokenService = require('./keyToken.service');
const { createTokenPair } = require('../auth/authUtils');
const { getInfoData } = require('../utils');
const { BadRequestError, AuthFailureError } = require('../core/error.response');
const { StatusCodes } = require('../utils/httpStatusCode');
const { findByEmail } = require('./shop.service');

const RoleShop = {
    SHOP: 'SHOP',
    WRITE: 'customer',
    EDITOR: 'editor',
    ADMIN: 'ADMIN'
};

class AssetsService {
    // 1.check email
    // 2. match pass
    // 3. create AT vs RT and save
    // 4. generate token
    // 5. get data return login
    static login = async ({ email, password, refreshToken = null }) => {
        //1
        const foundShop = await findByEmail({ email })
        // if (!foundShop) throw new BadRequestError('Shop not registered!', StatusCodes.BAD_REQUEST);
        if (!foundShop) {
            return {
                status: 404,
                message: "éo thấy"
            }
        }
        //2
        const match = bcrypt.compare(password, foundShop.password)
        // if (!match) throw new AuthFailureError('Authentication error', StatusCodes.UNAUTHORIZED);
        if (!match) {
            return {
                status: 404,
                message: "éo khớp mật khẩu"
            }
        }
        // 3 create private , public
        const privateKey = crypto.randomBytes(64).toString('hex');
        const publicKey = crypto.randomBytes(64).toString('hex');
        // 4 create token
        const { _id: userId } = foundShop
        const tokens = await createTokenPair({ userId, email }, publicKey, privateKey);

        await KeyTokenService.createKeyToken({
            refreshToken: tokens.refreshToken,
            privateKey, publicKey,
            userId
        })
        return {
            metadata: {
                shop: getInfoData({ fields: ['id', 'name', 'email'], object: foundShop }),
                tokens
            }
        };

    }
    static signUp = async (name, email, password) => {
        try {
            const foundShop = await shopModel.findOne({ email }).lean();
            if (foundShop) {
                throw new BadRequestError('Error: Shop already registered');
            }

            const passwordHash = await bcrypt.hash(password, 10);
            const newShop = await shopModel.create({
                name,
                email,
                password: passwordHash,
                roles: [RoleShop.SHOP]
            });

            if (newShop) {
                const privateKey = crypto.randomBytes(64).toString('hex');
                const publicKey = crypto.randomBytes(64).toString('hex');

                const keyStore = await KeyTokenService.createKeyToken({
                    userId: newShop._id,
                    publicKey,
                    privateKey
                });

                if (!keyStore) {
                    throw new Error('Key store creation failed');
                }

                const tokens = await createTokenPair({ userId: newShop._id, email }, publicKey, privateKey);

                return {
                    code: 201,
                    metadata: {
                        shop: getInfoData({ fields: ['id', 'name', 'email'], object: newShop }),
                        tokens
                    }
                };
            }

            return {
                code: 200,
                metadata: null
            };
        } catch (error) {
            if (error instanceof BadRequestError) {
                throw error;
            }
            console.error(error);
            throw new Error('Error accessing service lỗi catch  hàm đăng ký ');
        }
    }
}

module.exports = AssetsService;

'use strict';
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const shopModel = require('../models/shop.model');
const KeyTokenService = require('./keyToken.service');
const { createTokenPair } = require('../auth/authUtils');
const { getInfoData } = require('../utils');
const { BadRequestError } = require('../core/error.response');

const RoleShop = {
    SHOP: 'SHOP',
    WRITE: 'customer',
    EDITOR: 'editor',
    ADMIN: 'ADMIN'
};

class AssetsService {
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
            throw new Error('Error accessing service');
        }
    }
}

module.exports = AssetsService;

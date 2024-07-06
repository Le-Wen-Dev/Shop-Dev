const mongoose = require('mongoose');

const { Schema, model } = require('mongoose'); // Erase if already required
const DOCUMENT_NAME = 'Key'
const COLLECTION_NAME = 'Keys'
// Declare the Schema of the Mongo model
var keyTokenSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "shop"
    },
    publicKey: {
        type: String,
        required: true,
        unique: true,
    },
    privateKey: {
        type: String,
        required: true,
        unique: true,
    },
    refreshTokensUsed: {
        type: Array, default: [] // nhung refresh token da duoc su dung

    }, refreshToken: { type: String, require: true }
}, {
    collection: COLLECTION_NAME,
    timestamps: true
});

//Export the model
module.exports = model(DOCUMENT_NAME, keyTokenSchema);
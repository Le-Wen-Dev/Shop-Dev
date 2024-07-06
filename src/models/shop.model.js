const mongoose = require('mongoose');
const DOCUMENT_NAME = 'shop'
const COLLECTION_NAME = 'shops'
var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,

        index: true,
    },
    email: {
        type: String,
        required: true,

    },

    password: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    verify: {  // Fix typo: Changed 'verfify' to 'verify'
        type: Boolean,  // Fix: Changed 'Schema.Types.Boolean' to 'Boolean'
        default: false
    },
    roles: {
        type: Array,
        default: []
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

module.exports = mongoose.model(DOCUMENT_NAME, userSchema);

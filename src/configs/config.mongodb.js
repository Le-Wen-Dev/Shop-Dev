'use strict';

// Cấu hình cho môi trường phát triển (development)
const dev = {
    app: {
        port: process.env.DEV_APP_PORT || 3052
    },
    db: {
        host: process.env.DEV_APP_HOST || 'localhost',
        port: process.env.DEV_APP_PORT || '27017',
        name: process.env.DEV_APP_NAME || 'shopDEV'
    }
};

// Cấu hình cho môi trường sản phẩm (production)
const pro = {
    app: {
        port: process.env.PRO_APP_PORT || 3000
    },
    db: {
        host: process.env.DEV_APP_HOST || 'localhost',
        port: process.env.DEV_APP_PORT || '27017',
        name: process.env.DEV_APP_NAME || 'shopPRO'
    }
};

// Đối tượng chứa các cấu hình cho môi trường phát triển và môi trường sản phẩm
const config = { dev, pro };

// Lấy cấu hình cho môi trường hiện tại (dev hoặc pro)
const env = process.env.NODE_ENV || 'dev';
const currentConfig = config[env];

console.log('Environment:', env);
module.exports = currentConfig;

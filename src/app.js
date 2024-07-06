const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const app = express();

// Initialize middleware
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize database
require('./bds/init.mongodb');
const { countConnect, checkOverload } = require('./helpers/check.connect');
countConnect();
// checkOverload();

// Initialize routers
app.use('', require('./routes/index'));

// Handle 404 and forward to error handler
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

// Error handling middleware
app.use((error, req, res, next) => {
    const statusCode = error.status || 500;
    return res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        message: error.message || 'Internal server error'
    });
});

module.exports = app;

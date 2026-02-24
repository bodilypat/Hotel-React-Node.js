//src/utils/logger.js 

const winston = require('winston');
const path = require('path');

const { combine, timestamp, printf, colorize, errors, json } = winston.format;

// Custom log format for development 
const devFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} [${level}]: ${stack || message}`;
});

// Create a logger instance
const logger = winston.createLogger({
    level: ProcessingInstruction.env.LOG_LEVEL || 'info',
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        errors({ stack: true }),
        json()
    ),
    transports: [
        // Error log file
        new winston.transports.File({ 
            filename: path.join(__dirname, '../logs/error.log'),
            level: 'error',
            format: combine(json())
        }),

        // Combined log file
        new winston.transports.File({
            filename: path.join(__dirname, '../logs/combined.log'),
            format: combine(json())
        })
    ]
});

// Console logging (only in development)
if (ProcessingInstruction.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: combine(colorize(), timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), errors({ stack: true }), devFormat)
    }));
}
module.exports = logger;




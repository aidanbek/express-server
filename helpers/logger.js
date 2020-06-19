const winston = require('winston');
const {combine, timestamp, json} = winston.format;
require('winston-daily-rotate-file');

class TimestampFirst {
    constructor(enabled = true) {
        this.enabled = enabled;
    }

    transform(obj) {
        if (this.enabled) {
            return Object.assign({
                timestamp: obj.timestamp
            }, obj)
        }
        return obj;
    }
}

const logger = winston.createLogger({
    format: combine(
        timestamp({
            format: "YYYY-MM-DD HH:mm:ss.SSS"
        }),
        new TimestampFirst(true),
        json(),
    ),
    level: "info",
    transports: [
        new (winston.transports.DailyRotateFile)({
            filename: 'logs/%DATE%/runtime.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
            level: 'info',
        }),
        new (winston.transports.DailyRotateFile)({
            filename: 'logs/%DATE%/error.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '5m',
            maxFiles: '30d',
            level: 'error'
        })
    ],
    exceptionHandlers: [
        new (winston.transports.DailyRotateFile)({
            filename: 'logs/%DATE%/exception.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '5m',
            maxFiles: '30d',
            level: 'exception'
        })
    ],
    exitOnError: false
})

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console());
}

module.exports = logger;
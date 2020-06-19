const logger = require('./logger');

module.exports = function (req, res, next) {
    logger.info({
        message:'request',
        url: req.url,
        body: req.body,
        ip: req.ip
    });
    next();
}
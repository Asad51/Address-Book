const env = process.env.NODE_ENV;
let config = null;

if (env == 'development') {
    config = require('./env/development.config.json');
} else if (env == 'production') {
    config = require('./env/production.config.json');
} else if (env == 'test') {
    config = require('./env/test.config.json');
} else {
    config = require('./env/default.config.json');
}

module.exports = config;
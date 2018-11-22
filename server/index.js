let http = require('http');
let https = require('https');
let debug = require('debug')('mean-app:server');
let mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

/****************  User Modules  ******************/
/**************************************************/
let app = require('./config/app.config');

let envConfig = require('./config/env.config');
let dbUrl = `mongodb://${envConfig.db.user}:${envConfig.db.password}@${envConfig.db.host}:${envConfig.db.port}/${envConfig.db.db_name}`;
//let dbUrl = envConfig.db.db_url;
let httpPort = envConfig.app.httpPort;

/************* Request Handling ****************/
let errors = require('./routes/error.routes');
let index = require('./routes/index.routes');

app.use('/', index);
app.use(errors);

/********** Server Connection Handling ************/
let httpServer = http.createServer(app);
httpServer.listen(httpPort);
httpServer.on('error', onError);
httpServer.on('listening', onListening);
httpServer.on('close', onClose);

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    let bind = typeof httpPort === 'string' ?
        'Pipe ' + httpPort :
        'Port ' + httpPort;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    let addr = httpServer.address();
    let bind = typeof addr === 'string' ?
        'pipe ' + addr :
        'port ' + addr.port;
    debug('Listening on ' + bind);
    mongoose.connect(dbUrl, onConnect);
    console.log(dbUrl);
    console.log("httpServer running at " + bind);
}

function onClose(error) {
    if (error) {
        console.log(error);
    } else {
        console.log("httpServer Closed");
    }
    mongoose.disconnect(onDisconnect);
}

/************ Database Error Handling **************/
let onConnect = function(err) {
    if (err) {
        console.log("Can't connect database");
    } else {
        console.log("Database connected");
    }
};

let onDisconnect = function(err) {
    if (err) {
        console.log("Can't disconnect database");
    } else {
        console.log("Database disconnected");
    }
};
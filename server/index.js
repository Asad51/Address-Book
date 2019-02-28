let http = require('http');
let path = require('path');
let debug = require('debug')('mean-app:server');
let mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
let express = require('express');

/****************  User Modules  ******************/
/**************************************************/
let app = require('./config/app.config');

let envConfig = require('./config/env.config');
let dbUrl = `mongodb://${envConfig.db.user}:${envConfig.db.password}@${envConfig.db.host}:${envConfig.db.port}/${envConfig.db.db_name}`;
let httpPort = envConfig.app.httpPort;

if (process.env.NODE_ENV == 'production') {
  app.use(express.static(path.join(__dirname, 'public')));
}

/************* Request Handling ****************/
let user = require('./routes/user.routes');
let contacts = require('./routes/contacts.routes');
let errors = require('./routes/error.routes');

app.use('/user', user);
app.use('/user/contacts', contacts);

if (process.env.NODE_ENV == 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  });
}

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
let onConnect = function (err) {
  if (err) {
    console.log("Can't connect database");
  } else {
    console.log("Database connected");
  }
};

let onDisconnect = function (err) {
  if (err) {
    console.log("Can't disconnect database");
  } else {
    console.log("Database disconnected");
  }
};

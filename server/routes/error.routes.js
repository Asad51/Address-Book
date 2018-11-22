var app = require('express')();

// catch 404 error handler
app.use(function(req, res, next) {
    res.status(404).send({ "error_msg": "Page Not Found" });
});

// server error handler
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.send('Server  Error');
    console.log(err);
});

module.exports = app;
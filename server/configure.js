var routes = require('./routes'),
    bodyParser = require('body-parser');
    path = require('path'),
    express = require('express');

module.exports = function(app) {
    app.use(bodyParser());
    app.use('/public/', express.static(path.join(__dirname, '../public')));
    routes(app);

    return app;
}
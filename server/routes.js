var express = require('express'),
    router = express.Router(),
    zones = require('../controllers/zones');

module.exports = function(app) {
    router.get('/zones/getZones', zones.getZones);
    router.get('/zones/saveZones', zones.saveZones);
    app.use(router);
}
    

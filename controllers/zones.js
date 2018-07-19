const poolPromise = require('../server/database').poolPromise;

module.exports = {
    getZones: function(req, res) {
        //  Trae de la base de datos todas las zonas. 
        var queryZones = async function() {
            
            try {
                const pool = await poolPromise
                const result = await pool.request().query("SELECT 'POLYGON' type,id ,COLOR fillColor,ZONA tag,'\'+JSON_ZONA+'\' geometry  FROM ZONAS")
                
                res.send(result.recordset)
            } catch (err) {
                res.status(500)
                res.send(err.message)
            }
        };
        queryZones();
    },
    //  Actualiza las zonas en la base de datos, dando de alta, de baja o modificando segun corresponda.
    saveZones: function(req, res) {
        var crudZones = function() {
            res.send('Function saveZones');
        };
        crudZones();
    }
};
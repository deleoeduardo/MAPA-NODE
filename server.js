var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var sql = require('mssql');
var setUp={
    server:'ARBA-81M\\DEV',
    database:'prgpz',
    user:'prgpz',
    password:'2Ethachu'
}

var urlencodedParser = bodyParser.urlencoded({ extended: false })
express.static.mime.default_type = "text/html";
app.use(express.static(path.join(__dirname,'/public')));
(async () => {
    try {
        const pool = await sql.connect(setUp);
    }catch(err){
        console.dir(err);
    }
})();
    

app.use(bodyParser());
app.get('/', function (req, res) {
   console.log(__dirname);
   console.log(path.join(__dirname,'/public'));
   res.sendFile( __dirname + "/" + "map.html" );
})

var executeStatement= function(sqlString){     
    try {                        
        new sql.Request()
        .query(sqlString)
        .then(function (){
            console.log('BIEN');
        })            
    }catch(err){
        console.dir(err);
    }    
}

var executeQuery =  function (sqlString,res){    
    new sql.Request()
        .query(sqlString, function(err,recordset){
            return recordset;
        })                                
}    

app.get('/mostrarZonas', function(req,res){    
    new sql.Request()        
        .query("SELECT 'POLYGON' type,id ,COLOR fillColor,ZONA tag,'\'+JSON_ZONA+'\' geometry  FROM ZONAS")
        .then( function (dbData){
            if(dbData==null || dbData.length===0)
                return;
            for (var i in dbData.re){
                i.geometry=[i.geometry]
            }
            //dbData.recordset[0].geometry=[dbData.recordset[0].geometry];
            res.send(dbData.recordset);
        }) 
})

app.post('/guardarZonas', function(req,res){    
    var zonas = JSON.parse(req.body.zonas);
    console.log(zonas);    
    var query="INSERT INTO ZONAS (ZONA,JSON_ZONA,COLOR,ANEXO,BAJA) VALUES ('"+zonas[0].tag+"','"+ zonas[0].geometry +"','"+ zonas[0].fillColor +"',null,0)";
    executeStatement(query);
    res.send("OK");            
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})



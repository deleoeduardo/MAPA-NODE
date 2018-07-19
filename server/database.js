const sql = require('mssql')
const config = {
    server:'ARBA-81M\\DEV',
    database:'prgpz',
    user:'prgpz',
    password:'2Ethachu'
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to MSSQL')
    return pool
  })
  .catch(err => console.log('Database Connection Failed! Bad Config: ', err))

module.exports = {
  sql, poolPromise
}
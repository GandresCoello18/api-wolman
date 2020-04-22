var mysql = require('mysql');
const { config } = require('./config/index.ts');

  var connection = mysql.createConnection({
    host: config.dbHost,
    user: config.dbUser,
    password: '',
    database: config.dbName,
  });

  connection.connect( (err: any) => {
    if(err){
      console.error(new Error(err));
      setTimeout(connection, 2000);
    }else{
      console.log('conectado con exito');
    }
  });

  connection.on('err', (err: any) => {
    if(err) console.log(err);
  })


module.exports = connection;
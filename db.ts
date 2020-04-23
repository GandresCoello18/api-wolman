import mysql from 'mysql';
const { config } = require('./config/index.ts');


class Mysql {

  constructor(){
    this.conectar();
  }

  conectar(){
    var connection = mysql.createConnection({
      host: config.dbHost,
      user: config.dbUser,
      password: '',
      database: config.dbName,
    });

    connection.connect( (err: any) => {
      if(err){
        console.error(new Error(err));
      }else{
        console.log('conectado con exito');
      }
    });
  
    connection.on('err', (err: any) => {
      if(err) console.log(err);
    });

    return connection;
  }

}

let dataBase = new Mysql();
export default dataBase.conectar();
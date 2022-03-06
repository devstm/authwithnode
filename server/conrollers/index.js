const connection = require('../database/connection');

const storeUser = (name ,  password) =>{
   return connection.query(`insert into users (name , password) values ('${name}' , '${password}')`);
}

const selectUser = (name) =>{
    return connection.query(`select * from users where name = '${name}'`)
}
const selectUserById = (id) =>{
    return connection.query(`select * from users where id = '${id}'`)
}
module.exports = {storeUser, selectUser , selectUserById};
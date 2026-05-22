const pgp = require('pg-promise')()

const db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'UserDB',
    user: 'dba',
    password: 'dba'
})

function deleteUserByEmail(email) {
    //.none é uma função do ps-promise, que serve para realizar uma consulta SQL 
    return db.none('delete from public."User" where email = $1 ', [email])
}

module.exports = {
    deleteUserByEmail
}
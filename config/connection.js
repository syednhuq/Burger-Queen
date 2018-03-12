// require mysql
var mysql = require("mysql");
// configuration for local instances
var dbConfig = {
    host: "localhost",
    user: "root",
    password: process.env.PASSWORD || "",
    database: "burgers_db"
};

// setup the connection
// DATABASE_URL env is set up for heroku
// using pooling to stop app from crashing
var connection = mysql.createPool(process.env.DATABASE_URL || dbConfig);

// export the connection
module.exports = connection
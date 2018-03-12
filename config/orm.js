// require the database connection
var connection = require('./connection.js');

module.exports = {
    selectAll    : selectAll,
    selectScoped : selectScoped,
    selectOne    : selectOne,
    insertOne    : insertOne,
    updateOne    : updateOne
};

function selectAll(table, callback) {
    var query = 'SELECT * FROM ' + table;
    connection.query(query, function(error, data) {
        if (error) throw error;
        callback(date);
    });
}

function selectScoped(table, column, value, callback) {
    var query = 'SELECT * FROM ' + table + ' WHERE ' + column + ' = ' + value;
    connection.query(query, function(error, data) {
        if (error) throw error;
        callback(data);
    });
}

function selectOne(table, id, callback) {
    var query = 'SELECT * FROM ' + table + ' WHERE id = ?';
    connection.query(query, [id], function(error, data) {
        if (error) throw error;
        callback(data);
    });
}

function insertOne(table, columns, values, callback) {
    var query = 'INSERT INTO ' + table + ' (' + columns + ') VALUES (?)';
    connection.query(query, [values], function(error, data) {
        if (error) throw error;
        callback();
    });
}

function updateOne(table, column, value, id, callback) {
    var query = 'UPDATE ' + table + ' SET ' + column + ' = ? WHERE id = ?';
    connection.query(query, [value, id], function(error, data) {
        if (error) throw error;
        callback();
    });
}
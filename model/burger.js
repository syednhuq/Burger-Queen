// require orm
var orm = require('../config/orm.js');

// export model
module.exports = {
    allBurgers   : burgers,
    create       : create,
    singleBurger : singleBurger,
    update       : update
};

// callback function
function burgers(callBack) {
    var object = {};
    uneatenBurgers(function(data) {
        object.uneaten = data;
        eatenBurgers(function(data) {
            object.eaten = data;
            callBack(object);
        });
    });
}

// query uneaten burgers
function uneatenBurgers(callBack) {
    orm.selectScoped('burgers', 'devoured', 'false', function(data) {
        callBack(data);
    });
}

// query eaten burgers
function eatenBurgers(callBack) {
    orm.selectScoped('burgers', 'devoured', 'true', function(data) {
        callBack(data);
    });
}

// query single burger
function singleBurger(burger, callBack) {
    orm.selectOne('burgers', burger, function(data) {
        callBack(data);
    });
}

// query create burger
function create(burger, callBack) {
    orm.insertOne('burgers', 'burger_name', burger, function() {
        callBack();
    });
}

// query update burger
function update(burger, callBack) {
    orm.updateOne('burgers', 'devoured', true, burger, function() {
        callBack();
    });
}
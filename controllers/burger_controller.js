// require models
var express = require('express');
var burgers = require('../models/burger.js');

// export routes
module.exports = function(app) {
    // get the root route
    app.get('/', function(request, response) {
        burgers.allBurgers(function(data) {
            response.render('index', {
                uneatenBurgers: data.uneaten,
                eatenBurgers: data.eaten
            });
        });
    });

    // get api/burgers route
    app.get('/api/burgers', function(request, response) {
        burgers.allBurgers(function(data) {
            response.json(data);
        });
    });

    // define post for creating a burger
    app.post('/', function(request, response) {
        var newBurger = request.body.burger;
        // if no burger is defined just return
        if (newBurger === '') {
            response.redirect('/');
            return;
        }
        // create that burger
        burgers.create(newBurger, function() {
            response.redirect('/');
        });
    });

    // define get api/burgers
    app.get('/api/burgers/:id', function(request, response) {
        burgers.singleBurger(request.params.id, function(data) {
            response.json(data);
        });
    });

    // define put for updating
    app.put('/:id', function(request, response) {
        burgers.update(request.params.id, function() {
            response.redirect('/');
        });
    });
};
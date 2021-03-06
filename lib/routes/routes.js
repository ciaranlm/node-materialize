"use strict";

var herokuAPI = require('../controllers/heroku.js');
var force = require('../controllers/force.js');


module.exports = function(app) {

    app.get('/', function(req, res) {

        res.render('index.handlebars', {
            name: res
        }); // load the login.ejs file
    });

    app.get('/totalHerokuApps', function(req, res) {

        herokuAPI.totalApplications()
            .then(function(data) {

                res.send(data);
            })
            .catch(function(e) {
                res.status(500, {
                    error: e
                });
            });

    });



    app.get('/totalHerokuAddOns', function(req, res) {
        herokuAPI.totalHerokuAddOns()
            .then(function(data) {
                res.send(data);
            })
            .catch(function(e) {
                res.status(500, {
                    error: e
                });
            });

    });

    app.post('/forceQuery', function(req, res) {
        force.forceQuery(req.body)
            .then(function(data) {
                res.send(data);
            })
            .catch(function(e) {
                res.status(500, {
                    error: e
                });
            });

    });

    app.get('/application', function(req, res) {
        res.render('herokuApplications.handlebars', {
            name: res
        }); // load the login.ejs file
    });

    app.get('/application/:application', function(req, res) {
        var application = req.params.application;
        herokuAPI.getAppDetails(application)
            .then(function(data) {
              herokuAPI.addOnInApp(data)
              .then(function(data) {
              console.log("In the route:" + data);
                res.render('application.handlebars', {
                    application: application,
                    createdDate: data.createdDate,
                    lastUpdated: data.lastUpdated,
                    lastPersonUpdated: data.lastPersonUpdated,
                    herokuURL: data.herokuURL,
                    gitURL: data.gitURL,
                    addOns: data.addOns,
                    buildpack: data.buildpack
                }); // load the login.ejs file
            })
            .catch(function(e) {
                res.status(500, {
                    error: e
                });
            });
            });
    });

    app.get('/addon', function(req, res) {
        res.render('herokuAddOns.handlebars', {
            name: res
        }); // load the login.ejs file
    });

    app.get('/addon/:addon', function(req, res) {
        var addOn = req.params.addon;
        res.render('herokuAddOns.handlebars', {
            name: res
        }); // load the login.ejs file
    });



};

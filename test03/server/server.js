/// <reference path="typings/index.d.ts"/>
"use strict";
var express = require("express");
var path = require("path");
// express app
var app = express();
// routes
app.use('/', express.static(path.resolve(__dirname, '../client')));
// get index
app.get('/*', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../client/index.html'));
});
// server
var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Listening on port ' + port);
});

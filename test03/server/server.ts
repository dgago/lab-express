/// <reference path="typings/index.d.ts"/>

import express = require("express");
import path = require("path");

// express app
var app = express();

// routes
app.use('/', express.static(path.resolve(__dirname, '../client')));

// get index
app.get('/*', (req: express.Request, res: express.Response) => {
	res.sendFile(path.resolve(__dirname, '../client/index.html'));
});

// server
let port: number = process.env.PORT || 3000;
var server = app.listen(port, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Listening on port ' + port);
});
/// <reference path="../typings/index.d.ts" />

import express = require('express');
import path = require('path');

// express app
let app = express();

// logging
let logger = function (req, res, next) {
	console.log('Request received. ' + req.path);
	next();
}
app.use(logger);

// routing
app.get('/jobs', function (req:express.Request, res:express.Response) {
	res.send('GET jobs.');
});
app.get('/jobs/:id', function (req:express.Request, res:express.Response) {
	res.send('GET one job: ' + req.params.id);
});

// server
let port: number = process.env.PORT || 3000;
let server = app.listen(port, function () {
	let host = server.address().address;
	let port = server.address().port;

	console.log('Listening on port ' + port);
});
/// <reference path="../typings/index.d.ts" />

import express = require('express');
import routes = require('./routes');

const parser = require('body-parser');

// express app
let app = express();

// logging
let logger = function (req, res, next) {
	console.log('Request received. ' + req.path);
	next();
}
app.use(logger);

// body parser
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

// routes
routes.default(app);

// redirect unmatched
app.use(function (req, res) {
	console.log('Unmatched path: ' + req.path);
	res.status(400).send({ error: 'Unmatched path: ' + req.path });
});

// exceptions
app.use(function (err: express.ErrorRequestHandler, req: express.Request, res: express.Response, next: express.NextFunction) {
	console.log('error', err);
	res.status(400).send(err);
});

// server
let port: number = process.env.PORT || 3000;
let server = app.listen(port, function () {
	let host = server.address().address;
	let port = server.address().port;

	console.log('Listening on port ' + port);
});
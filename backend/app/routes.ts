import passport = require('passport')
import express = require('express');
import jwt = require('jsonwebtoken');

import auth = require('./auth');
import {Config} from './config';

import {User, UserManager} from './users';

let requireAuth = passport.authenticate('jwt', Config.jwt.session);

export default function (app: express.Application) {
	let umgr: UserManager = new UserManager();

	// passport
	app.use(passport.initialize());
	auth.default(passport);

	// app routes
	let api = express.Router();
	api.get('/jobs', function (req: express.Request, res: express.Response) {
		res.send('GET jobs.');
	});
	api.get('/jobs/:id', requireAuth, function (req: express.Request, res: express.Response) {
		res.send('GET one job: ' + req.params.id);
	});
	app.use('/api', api);

	let authapi = express.Router();
	// auth routes
	// Authenticate the user and get a JSON Web Token to include in the header of future requests.
	authapi.post('/token', function (req, res) {
		console.log(req.body.username);
		let user = umgr.findOne(req.body.username);
		if (!user) {
			res.status(401).json({
				success: false,
				message: 'Authentication failed. User not found.'
			});
		} else {
			// Create token if the password matched and no error was thrown
			const token = jwt.sign(user, Config.jwt.secret, {
				expiresIn: 10080 // in seconds
			});
			res.status(200).json({
				success: true,
				token: 'JWT ' + token
			});

			/*
						// Check if password matches
						user.comparePassword(req.body.password, function (err, isMatch) {
							if (isMatch && !err) {
								// Create token if the password matched and no error was thrown
								const token = jwt.sign(user, config.secret, {
									expiresIn: 10080 // in seconds
								});
								res.status(200).json({ success: true, token: 'JWT ' + token });
							} else {
								res.status(401).json({ success: false, message: 'Authentication failed. Passwords did not match.' });
							}
						});
			*/
		}
	});
	app.use('/auth', authapi);
}
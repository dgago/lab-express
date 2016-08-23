import passport = require('passport');
import jwt = require('passport-jwt');

import {User, UserManager} from './users';
import {Config} from './config';

export default function (passport: passport.Passport): void {
	let umgr: UserManager = new UserManager();

	let opts: jwt.StrategyOptions = {
		jwtFromRequest: jwt.ExtractJwt.fromAuthHeader(),
		secretOrKey: Config.jwt.secret
	};
	let strategy = new jwt.Strategy(opts, function (payload: any, done: jwt.VerifiedCallback) {
		let user = umgr.findOne(payload.username);
		if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
	});

	passport.use(strategy);
}
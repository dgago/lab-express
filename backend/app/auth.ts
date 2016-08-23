import passport = require('passport');
import passportJwt = require('passport-jwt');

import {User, UserManager} from './users';
import {Config} from './config';

// app config
let cfg = new Config();

// passport setup
let ExtractJwt = passportJwt.ExtractJwt;
let passOptions: passportJwt.StrategyOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeader(),
	secretOrKey: cfg.jwt.secret
};

export class Auth {
	private umgr: UserManager = new UserManager();
	private ppt = passport;

	private strategy = ()=>(passOptions, function (payload, done) {
		let user = this.umgr.find(payload.username);
		if (user) {
			return done(null, { id: user.id });
		} else {
			return done(new Error("User not found"), null);
		}
	});

	public initialize() {
		let st :passport.Strategy;

		this.ppt.use(st);
		return this.ppt.initialize();
	}

}


module.exports = function () {
	passport.use(strategy);
	return {
		initialize: function () {
			return passport.initialize();
		},
		authenticate: function () {
			return passport.authenticate("jwt", cfg.jwtSession);
		}
	};
};
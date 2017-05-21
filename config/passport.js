var passport = require('passport')
    , FacebookStrategy = require('passport-facebook').Strategy;


var verifyHandler = function(token, tokenSecret, profile, done) {
	process.nextTick(function() {
		User.findOne({uid: profile.id}, function(err, user) {
			if (user) {
				return done(null, user);
			} else {
				var data = {};
				data = {
					name : profile.displayName,
					uid : profile.id
				};
				User.create(data, function(err, user) {
				  return done(err, user);
				});
			}
		});
	});
};

passport.serializeUser(function(user, done) {
  done(null, user.uid);
});

passport.deserializeUser(function(uid, done) {
	User.findOne({uid: uid}, function(err, user) {
		done(err, user);
	});
});

module.exports.http = {
	customMiddleware: function(app) {
		passport.use(new FacebookStrategy({
		  clientID: "214850892355745",
		  clientSecret: "f5015d2d5ef50e775b66406e54c9cb11",
		  callbackURL: "http://localhost:1337/auth/facebook/callback"
		}, verifyHandler));
		app.use(passport.initialize());
		app.use(passport.session());
	}
}

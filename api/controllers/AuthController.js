/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');

module.exports = {
	facebook: function(req, res) {
		passport.authenticate('facebook', { failureRedirect: '/login', scope: ['email']  }, function(err, user) {
		  req.logIn(user, function(err) {
			  if (err) {
				  console.log(err);
				  res.view('500');
				  return;
			  }
				  res.ok({user : user});
			  });
		})(req, res);
	}
};


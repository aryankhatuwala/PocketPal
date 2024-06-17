require('dotenv').config();

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user.model');

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET;

module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        console.log('JWT payload:', jwt_payload); // Log JWT payload

        try {
            User.findOne({ username: jwt_payload.username }).then(user => {
                if (user) {
                    console.log("User authenticated"); // Log successful authentication
                    return done(null, user);
                }
                console.log("User not authenticated"); // Log failed authentication
                return done(null, false);
            });
        } catch (err) {
            console.log("Authentication error:", err); // Log errors
        }
    }));
};
    
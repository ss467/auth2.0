const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;


passport.use(new GoogleStrategy({
  clientID: "946033376166-dr0g7dllnki5ehghophjnvng4n82m32q.apps.googleusercontent.com",
  clientSecret: "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",
  callbackURL: "http://localhost:5000/google/callback",
  passReqToCallback: true,
},
function(request, accessToken, refreshToken, profile, done) {
  return done(null, profile);
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

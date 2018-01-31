const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20');
const db = require('../ControllersDB/mainController.js')

passport.serializeUser((user, done) => {
  // takes user id and makes it a cookie
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  // retrieve id from cookie
  // and use it to access user in database
    db.user.getUser(id).then((user) => {
      done(null, user)
    })
})

passport.use(
  new GoogleStrategy({
    // oprtions for the google strat
    callbackURL: '/auth/google/redirect',
    clientID: '958835359621-ar0pkshcuaba693ki10vaq1cc1j6qtk8.apps.googleusercontent.com',
    clientSecret: '4qDzcSsqkWieHEABXAf1XMpH'
  }, (accessToken, refreshToken, profile, done) => {
    const body = {
      google_id: profile.id,
      name: profile.displayName,
      img: profile.photos[0].value,
      etag:profile._json.etag
    }
    
    db.user.findOrCreateUser(body)
           .then(user => {
             done(null, user)
           })
  })
)
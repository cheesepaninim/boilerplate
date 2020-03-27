const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user)
  })
  passport.deserializeUser((user, done) => {
    done(null, user)
  })

  passport.use(new LocalStrategy({
      usernameField: 'id',
      passwordField: 'pw',
      session: true,
      passReqToCallback: true
    }
    , (req, id, pwd, done) => {

      /* user 검증 */ // 아래는 mongodb
      Users.findOne({ id: id }, (findError, user) => {
        if (findError) return done(findError)
        if (!user) return done(null, false, { message: 'id X' })
        return user.comparePassword(password, (passError, isMatch) => {
          if (isMatch) {
            return done(null, user)
          }
          return done(null, false, { message: 'wrong pwd' })
        });
      });
      /* user 검증 */

    }
  ))
}

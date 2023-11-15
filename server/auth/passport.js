const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const models = require("../models");

function configurePassport(passport) {
  // Set up Passport.js for local authentication
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await models.User.findone({
          where: { username },
        });
        if (!user) {
          return done(null, false, {
            message: "Incorrect username or password",
          });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return done(null, false, {
            message: "Incorrect username / password",
          });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await models.User.findByPk(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
}

module.exports = { configurePassport };

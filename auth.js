const Person = require("./models/person.js");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(async (Username, pwd, done) => {
    try {
      const user = await Person.findOne({ username: Username });
      if (!user) {
        return done(null, false, { message: "No matched username" });
      }
      const job = user.work;
      if (job != "Owner") {
        console.log('Unauthorized person is trying to investigate the data');
        return done(null, false, {
          message:
            "You have not the priority to see the details of all members",
        });
      }
      const Compare_result=await user.comparePassword(pwd);
      if (Compare_result) {
        return done(null, user);
      } else {
        console.log('Unauthorized person is trying to investigate the data');
        return done(null, false, { message: "Incorrect password" });
      }
    } catch (err) {
      return done(err);
    }
  })
);

module.exports = passport;

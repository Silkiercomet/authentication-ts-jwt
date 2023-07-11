import { PassportStatic } from "passport";
import passportLocal from "passport-local";
import User, { IUser } from "../models/User";
import { verifyPassword } from "./hashPassword";

declare global {
  namespace Express {
    interface User extends IUser {
      _id?: number;
    }
  }
}

const LocalStrategy = passportLocal.Strategy;

const strategyPassport = async (passport: PassportStatic) => {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (!user) {
          return done(null, false, { message: "user doesnt exist" });
        }
        const isValid = await verifyPassword(password, user.salt, user.hash);
        if (!isValid) {
          return done(null, false, { message: "incorrect password" });
        }
        done(null, user);
      } catch (err) {
        console.log(err);
      }
    })
  );
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser<any, any>(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};

export default strategyPassport;

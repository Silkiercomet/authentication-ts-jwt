import express from "express";
import passport from "passport";
import { signUp, isAuthenticated } from "../controllers/auth";
const router = express.Router();

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login-failure",
    successRedirect: "login-success",
  }),
  (req, res) => {
    try {
      return res.status(200).json("authorized user");
    } catch (err) {
      console.log(err);
    }
  }
);
router.post("/signup", signUp);
router.post("/logout", (req, res) => {
  res.status(200).send("<h1>hello world</h1>");
});
router.get("/protected-route", isAuthenticated, (req, res) => {
  res.status(200).send("<h1>hello world</h1>");
});

export default router;

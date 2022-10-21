import { Router } from "express";
import passport from "passport";
import logger from "../middlewares/logger.winston.js";
import moment from "moment";

const router = Router();

router.post(
  "/register",
  passport.authenticate("register", {
    failureRedirect: "/api/sessions/registerfail",
    failureMessage: true,
  }),
  async (req, res) => {
    try {
      // I pass the name of my custonm strategy to "authenticate".
      // The big objective of passport is to return a req.user.
      console.log(req.user);
      res.send({ status: "success", payload: req.user._id });
    } catch (error) {
      console.log("Entro en el catch del register");
      logger.log(
        "warn",
        `${new moment().format("DD/MM/YYYY HH:mm:ss")} => Error: ${error}`
      );
    }
  }
);

router.get("/registerfail", (req, res) => {
  res
    .status(500)
    .send({ status: "error", error: "Error ocurred while registering a user" });
});

router.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/api/sessions/loginfail",
  }),
  async (req, res) => {
    req.session.user = {
      // We built the user session without the sensible details.
      name: req.user.name,
      email: req.user.email,
      id: req.user._id,
    };
    res.redirect("/");
  }
);

router.get("/loginfail", (req, res) => {
  res.status(500).send({ status: "error", error: "Error in login" });
});

router.get(
  "/github",
  passport.authenticate("github", { scope: [] }),
  (res, req) => {
    // This is the enpoint that takes me to the github authenticator.
  }
);

router.get("/githubcallback", passport.authenticate("github"), (req, res) => {
  req.session.user = {
    name: req.user.name,
    email: req.user.email,
    id: req.user._id,
  };
  res.redirect("/current");
});

router.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error)
      return res.status(500).send({
        status: "error",
        message: "Could not logout, please try again!",
      });
  });
  res.redirect("/login");
});

export default router;

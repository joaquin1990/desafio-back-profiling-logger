import dotenv from "dotenv";
import __dirname from "../utils.js";

const mode = process.argv.slice(2)[0];
dotenv.config({
  path: mode === "PROD" ? "./.env.prod" : "./.env.dev",
});

export default {
  app: {
    MODE: process.env.MODE || "PROD",
    PORT: process.env.PORT || 3000,
    DEBUG: process.env.DEBUG || false,
  },
  mongo: {
    MONGO_URL: process.env.MONGO_URL || "ANY",
  },
};

import express from "express";
import cors from "cors";
import dataRouter from "./routers/dataRouter.js";
import oauthRouter from "./routers/oauthRouter.js";

const api = express();

api.use(cors());

// Define your Express.js API routes and handlers here
api.get("", (req, res) => {
  // Handle your API request here
  res.json({ message: "home" });
});
api.use("/data", dataRouter);
api.use("/oauth", oauthRouter)

export default api;

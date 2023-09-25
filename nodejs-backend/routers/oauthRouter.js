import express from "express";
const oauthRouter = express.Router();

// Define your route handler
oauthRouter.get("/oauth/callback", (req, res) => {
  // Handle the /data route logic here
  res.json({ message: "API data" });
});

export default oauthRouter;

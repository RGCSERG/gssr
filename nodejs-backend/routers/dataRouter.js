import express from "express";
const dataRouter = express.Router();

// Define your route handler
dataRouter.get("/", (req, res) => {
  // Handle the /data route logic here
  res.json({ message: "API data" });
});

export default dataRouter;

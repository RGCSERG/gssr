import express from "express";
import cors from "cors";
import dataRouter from "./routers/dataRouter.js";

const api = express();

api.use(cors());

// Define your Express.js API routes and handlers here
api.get("", (req, res) => {
  // Handle your API request here
  res.json({ message: "home" });
});
api.use("/api/data", dataRouter);

export default api;

import express from "express";
import axios from "axios";
import { GITHUB_URL, GITHUB_GET_TOKEN_URL } from "./API_URLS.js";

const oauthRouter = express.Router();
const {GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET} = process.env 

oauthRouter.use(express.json());

oauthRouter.get("/callback", async (req, res) => {
  const { code } = req.query; // Retrieve the code from query parameters

  if (!code) {
    // Handle the case where no code is provided
    return res.status(400).json({ error: "Authorization code missing" });
  }

  const data = {
    client_id: GITHUB_CLIENT_ID,
    client_secret: GITHUB_CLIENT_SECRET,
    code: code,
  };

  try {
    const response = await axios.get('https://github.com/login/oauth/access_token', data, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    const accessToken = response.data.access_token;

    console.log(accessToken);

    res.json({ accessToken: accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "OAuth token exchange failed" });
  }
});



export default oauthRouter;

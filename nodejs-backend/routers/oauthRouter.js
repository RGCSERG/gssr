import express from "express";
const oauthRouter = express.Router();

app.use(bodyParser.json());

oauthRouter.get("/oauth/callback", async (req, res) => {
  const { code } = req.body;
  const data = {
    client_id: GITHUB_CLIENT_ID,
    client_secret: GITHUB_CLIENT_SECRET,
    code,
  };

  try {
    const response = await axios.post(GITHUB_URL + GITHUB_GET_TOKEN_URL, data);
    const accessToken = response.data.access_token;

    console.log(accessToken);

    res.json({ accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "OAuth token exchange failed" });
  }
});

export default oauthRouter;

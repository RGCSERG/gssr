import axios from "axios";
import { GITHUB_GET_TOKEN_URL, GITHUB_URL } from "./API__URLS";
import { OauthResponse } from "../interfaces/Oauth/OauthResponse";
import { GetAccessToken } from "../interfaces/Oauth/GetAccessToken";

const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = import.meta.env.VITE_GITHUB_CLIENT_SECRET;

export const getUserDataRequests = async (
  setUser: React.Dispatch<React.SetStateAction<string>>,
  code: string
): Promise<any> => {
  const maxRetryCount = 3; // Maximum number of retry attempts
  let retryCount = 0;

  const attemptRequest = async (): Promise<any> => {
    const data: GetAccessToken = {
      client_id: GITHUB_CLIENT_ID,
      client_secret: GITHUB_CLIENT_SECRET,
      code: code,
    };
    try {
      const response = await axios.post<OauthResponse>(
        GITHUB_URL + GITHUB_GET_TOKEN_URL,
        data
      );
      console.log(response);
      setUser(response.data.access_token);

      return undefined;
    } catch (err) {
      console.log(err);

      if (retryCount < maxRetryCount) {
        retryCount++;
        console.log(`Retrying request (attempt ${retryCount})...`);

        return attemptRequest(); // Retry the request
      } else {
        return console.log(err);
      } // Max retry attempts reached, handle the error
    }
  };
  return attemptRequest();
};

import axios from "axios";
import { OauthResponse } from "../interfaces/Oauth/OauthResponse";

export const getUserDataRequests = async (
  setUser: React.Dispatch<React.SetStateAction<string>>,
  code: string
): Promise<any> => {
  const maxRetryCount = 3; // Maximum number of retry attempts
  let retryCount = 0;

  const attemptRequest = async (): Promise<any> => {
    try {
      const response = await axios.get<OauthResponse>(
        `http://localhost:5174/api/oauth/callback?code=${code}`
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

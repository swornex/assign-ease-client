import axios from "axios";
import { getAccessToken } from "../utils/token";

/**
 * Retrieves the submissions from the dashboard API.
 *
 * @return {Promise} The response from the API.
 */
export const getSubmissions = async () => {
  const accessToken = getAccessToken();
  const submissionUrl = "http://localhost:3000/api/dashboard";
  const res = await axios.get(submissionUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  return res;
};

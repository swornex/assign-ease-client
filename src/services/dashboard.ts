import axios from "axios";
import { decodedRole } from "../utils/decodeUser";
import { getAccessToken } from "../utils/token";

/**
 * Retrieves the dashboard data from the API based on the user's role.
 *
 * @return {Promise<AxiosResponse<any>>} The response object containing the dashboard data.
 */
export const getDashboardData = async () => {
  const role = decodedRole();
  const accessToken = getAccessToken();

  const dashboardUrl =
    role === "User"
      ? "http://localhost:3000/api/dashboard"
      : "http://localhost:3000/api/assignments";
  const res = await axios.get(dashboardUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return res;
};

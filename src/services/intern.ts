import axios from "axios";
import { ICreateUser } from "../interfaces/ICreateUser";
import { getAccessToken } from "../utils/token";

/**
 * Creates a new user by making a POST request to the specified API endpoint.
 *
 * @param {ICreateUser} userData - The data of the user to be created.
 * @return {Promise} - A promise that resolves to the response from the API.
 */
export const createUser = async (userData: ICreateUser) => {
  const accessToken = getAccessToken();
  const createAccUrl = "http://localhost:3000/api/users";

  const res = await axios.post(createAccUrl, userData, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return res;
};

/**
 * Retrieves the user data from the API server.
 *
 * @return {Promise<AxiosResponse<any>>} The response from the API server.
 */
export const getUser = async () => {
  const accessToken = getAccessToken();

  const userUrl = "http://localhost:3000/api/users";
  const res = await axios.get(userUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    params: {
      role: "User"
    }
  });
  return res;
};

/**
 * Deletes a user with the specified user ID.
 *
 * @param {string} userId - The ID of the user to be deleted.
 * @return {Promise<any>} A promise that resolves to the response from the API.
 */
export const deleteUser = async (userId: string) => {
  const accessToken = getAccessToken();

  const res = await axios.delete(`http://localhost:3000/api/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  return res;
};

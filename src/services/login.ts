import axios from "axios";

/**
 * Logs in a user with the given email and password.
 *
 * @param {object} userData - The user data containing the email and password.
 * @param {string} userData.email - The user's email.
 * @param {string} userData.password - The user's password.
 * @return {Promise} A promise that resolves with the response data from the login API.
 */
export const login = async (userData: {
  email?: string;
  password?: string;
}) => {
  const loginUrl = "http://localhost:3000/api/auth/login";
  const res = await axios.post(loginUrl, userData);
  return res;
};

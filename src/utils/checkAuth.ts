import { getAccessToken } from "./token";

/**
 * Checks if the user is authenticated.
 *
 * @return {void} No return value.
 */
function checkAuth() {
  if (!getAccessToken()) {
    window.location.href = "/views/login/";
  }
}

export default checkAuth;

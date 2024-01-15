import "./style.css";
import { getAccessToken } from "./utils/token";

/**
 * Executes when the window has finished loading. Checks if there is an access token,
 * and if not, redirects the user to the login page. If there is an access token,
 * redirects the user to the assignments page.
 *
 * @return {void} No return value.
 */
window.onload = () => {
  const accessToken = getAccessToken();

  if (!accessToken) {
    window.location.href = "/views/login/";
  } else {
    window.location.href = "/views/assignments/";
  }
};

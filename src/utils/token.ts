/**
 * Retrieves the access token from the local storage.
 *
 * @return {string} The access token.
 */
export function getAccessToken() {
  const accessToken = localStorage.getItem("token");
  return accessToken;
}

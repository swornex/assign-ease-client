export function getAccessToken() {
  const accessToken = localStorage.getItem("token");
  return accessToken;
}

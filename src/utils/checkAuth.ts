import { getAccessToken } from "./token";

function checkAuth() {
  if (!getAccessToken()) {
    window.location.href = "/views/login/";
  }
}

export default checkAuth;

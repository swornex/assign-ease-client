import "./style.css";
import { getAccessToken } from "./utils/token";

window.onload = () => {
  const accessToken = getAccessToken();

  if (!accessToken) {
    window.location.href = "/views/login/";
  } else {
    window.location.href = "/views/assignments/";
  }
};

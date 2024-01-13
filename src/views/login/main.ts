import "../../style.css";

import axios from "axios";
import { decodeUserName, decodedRole } from "../../utils/decodeUser";

if (localStorage.getItem("token")) {
  window.location.href = "../dashboard/";
}

const email = document.querySelector<HTMLInputElement>("#email");
const password = document.querySelector<HTMLInputElement>("#password");
const togglePassword = document.querySelector<HTMLAnchorElement>(
  ".password-toggle-icon"
);

const loginButton = document.querySelector<HTMLButtonElement>("button");

const loginUrl = "http://localhost:3000/api/auth/login";

togglePassword?.addEventListener("click", (e) => {
  e.preventDefault();
  const type =
    password?.getAttribute("type") === "password" ? "text" : "password";
  password?.setAttribute("type", type);
});

loginButton?.addEventListener("click", async (e) => {
  e.preventDefault();

  const userData = {
    email: email?.value,
    password: password?.value
  };
  console.log(email?.value, password?.value);

  const res = await axios.post(loginUrl, userData);
  console.log(res);

  if (res.status === 200) {
    localStorage.setItem("token", res.data.data.accessToken);
    decodeUserName();
    decodedRole();
    window.location.href = "../dashboard/";
  }
});

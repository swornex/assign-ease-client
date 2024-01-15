import "../../style.css";

import axios, { AxiosError } from "axios";
import { decodeUserName, decodedRole } from "../../utils/decodeUser";
import { showToast } from "../../utils/showToast";

if (localStorage.getItem("token")) {
  window.location.href = "views/assignments/";
}

const email = document.querySelector<HTMLInputElement>("#email");
const password = document.querySelector<HTMLInputElement>("#password");
const togglePassword = document.querySelector<HTMLAnchorElement>(
  ".password-toggle-icon"
);

const toast = document.getElementById("toast");

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

  try {
    const res = await axios.post(loginUrl, userData);

    if (!toast) {
      return;
    }

    localStorage.setItem("token", res.data.data.accessToken);
    showToast(toast, "Login Successful");
    decodeUserName();
    decodedRole();
    window.location.href = "views/assignments/";
  } catch (e) {
    if (!toast) {
      return;
    }

    if (e instanceof AxiosError) {
      console.log(e);
      showToast(toast, e.response?.data.message);
    }
  }
});

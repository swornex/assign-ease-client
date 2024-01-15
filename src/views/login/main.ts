import "../../style.css";

import { decodeUserName, decodedRole } from "../../utils/decodeUser";
import { showToast } from "../../utils/showToast";
import { login } from "../../services/login";
import { AxiosError } from "axios";

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
    const res = await login(userData);
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
      showToast(toast, e.response?.data.message);
    }
  }
});

import "../../../style.css";

import axios from "axios";
import { getAccessToken } from "../../../utils/token";
import sidebar from "../../../utils/sidebar";
import checkAuth from "../../../utils/checkAuth";

const sidebarElement = document.querySelector<HTMLElement>(".section-sidebar");
const firstName = document.querySelector<HTMLInputElement>("#firstName");
const lastName = document.querySelector<HTMLInputElement>("#lastName");
const email = document.querySelector<HTMLInputElement>("#email");
const password = document.querySelector<HTMLInputElement>("#password");
const addButton = document.querySelector<HTMLButtonElement>("button");
const togglePassword =
  document.querySelector<HTMLInputElement>("#showPassword");

const createAccUrl = "http://localhost:3000/api/users";

const accessToken = getAccessToken();

checkAuth();

window.onload = () => {
  sidebar(sidebarElement);

  togglePassword?.addEventListener("click", () => {
    const type =
      password?.getAttribute("type") === "password" ? "text" : "password";
    password?.setAttribute("type", type);
  });

  addButton?.addEventListener("click", async (e) => {
    e.preventDefault();

    const userData = {
      firstName: firstName?.value,
      lastName: lastName?.value,
      email: email?.value,
      password: password?.value
    };

    const res = await axios.post(createAccUrl, userData, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    if (res.status === 200) {
      window.location.href = "/views/interns/";
    }
  });
};

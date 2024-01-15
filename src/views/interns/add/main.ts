import "../../../style.css";

import { AxiosError } from "axios";
import sidebar from "../../../utils/sidebar";
import checkAuth from "../../../utils/checkAuth";
import { showToast } from "../../../utils/showToast";
import { createUser } from "../../../services/intern";
import checkRole from "../../../utils/checkRole";

const sidebarElement = document.querySelector<HTMLElement>(".section-sidebar");
const firstName = document.querySelector<HTMLInputElement>("#firstName");
const lastName = document.querySelector<HTMLInputElement>("#lastName");
const email = document.querySelector<HTMLInputElement>("#email");
const password = document.querySelector<HTMLInputElement>("#password");
const addButton = document.querySelector<HTMLButtonElement>("button");
const toast = document.getElementById("toast");

const togglePassword =
  document.querySelector<HTMLInputElement>("#showPassword");

checkAuth();
checkRole("Admin");

window.onload = () => {
  sidebar(sidebarElement);

  if (!toast) {
    return;
  }

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

    try {
      await createUser(userData);

      window.location.href = "/views/interns/";
      showToast(toast, "Intern added successfully");
    } catch (e) {
      if (e instanceof AxiosError) {
        showToast(toast, e.response?.data.message);
      }
    }
  });
};

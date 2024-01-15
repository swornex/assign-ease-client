import "../../../style.css";

import { AxiosError } from "axios";
import sidebar from "../../../utils/sidebar";
import checkAuth from "../../../utils/checkAuth";
import { showToast } from "../../../utils/showToast";
import { createAssignment } from "../../../services/assignment";
import checkRole from "../../../utils/checkRole";

const sidebarElement = document.querySelector<HTMLElement>(".section-sidebar");
const title = document.querySelector<HTMLInputElement>("#title");
const description = document.querySelector<HTMLInputElement>("#description");
const deadline = document.querySelector<HTMLInputElement>("#deadline");
const addButton = document.querySelector<HTMLButtonElement>("button");
const toast = document.getElementById("toast");

checkAuth();
checkRole("Admin");
window.onload = () => {
  sidebar(sidebarElement);

  if (!toast) {
    return;
  }

  addButton?.addEventListener("click", async (e) => {
    e.preventDefault();

    const assignmentData = {
      title: title?.value,
      description: description?.value,
      deadline: deadline?.value
    };

    try {
      await createAssignment(assignmentData);
      window.location.href = "views/assignments/";
      showToast(toast, "Assignment added successfully");
    } catch (e) {
      if (e instanceof AxiosError) {
        showToast(toast, e.response?.data.message);
      }
    }
  });
};

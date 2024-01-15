import "../../../style.css";

import axios, { AxiosError } from "axios";
import { getAccessToken } from "../../../utils/token";
import sidebar from "../../../utils/sidebar";
import checkAuth from "../../../utils/checkAuth";
import { showToast } from "../../../utils/showToast";

const sidebarElement = document.querySelector<HTMLElement>(".section-sidebar");
const title = document.querySelector<HTMLInputElement>("#title");
const description = document.querySelector<HTMLInputElement>("#description");
const deadline = document.querySelector<HTMLInputElement>("#deadline");
const addButton = document.querySelector<HTMLButtonElement>("button");
const toast = document.getElementById("toast");

const addAssignmentUrl = "http://localhost:3000/api/assignments";

const accessToken = getAccessToken();

checkAuth();
window.onload = () => {
  sidebar(sidebarElement);

  if (!toast) {
    return;
  }

  addButton?.addEventListener("click", async (e) => {
    e.preventDefault();

    console.log(deadline?.value);
    const assignmentData = {
      title: title?.value,
      description: description?.value,
      deadline: deadline?.value
    };

    try {
      await axios.post(addAssignmentUrl, assignmentData, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      window.location.href = "views/assignments/";
      showToast(toast, "Assignment added successfully");
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log(e);
        showToast(toast, e.response?.data.message);
      }
    }
  });
};

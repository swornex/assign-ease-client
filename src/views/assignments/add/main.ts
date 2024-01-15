import "../../../style.css";

import axios from "axios";
import { getAccessToken } from "../../../utils/token";
import sidebar from "../../../utils/sidebar";
import checkAuth from "../../../utils/checkAuth";

const sidebarElement = document.querySelector<HTMLElement>(".section-sidebar");
const title = document.querySelector<HTMLInputElement>("#title");
const description = document.querySelector<HTMLInputElement>("#description");
const deadline = document.querySelector<HTMLInputElement>("#deadline");
const addButton = document.querySelector<HTMLButtonElement>("button");

const addAssignmentUrl = "http://localhost:3000/api/assignments";

const accessToken = getAccessToken();

checkAuth();
window.onload = () => {
  sidebar(sidebarElement);

  addButton?.addEventListener("click", async (e) => {
    e.preventDefault();

    console.log(deadline?.value);
    const assignmentData = {
      title: title?.value,
      description: description?.value,
      deadline: deadline?.value
    };

    const res = await axios.post(addAssignmentUrl, assignmentData, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    if (res.status === 200) {
      window.location.href = "views/assignments/";
    }
  });
};

import "../../../style.css";

import sidebar from "../../../utils/sidebar";
import checkAuth from "../../../utils/checkAuth";
import axios from "axios";
import { getAccessToken } from "../../../utils/token";

const sidebarElement = document.querySelector<HTMLElement>(".section-sidebar");
const title = document.querySelector<HTMLInputElement>("#title");
const description = document.querySelector<HTMLInputElement>("#description");
const deadline = document.querySelector<HTMLInputElement>("#deadline");
const editButton = document.querySelector<HTMLButtonElement>("button");

const id = new URLSearchParams(window.location.search).get("assignmentId");

const assignmentUrl = `http://localhost:3000/api/assignments/${id}`;
const updateAssignmentUrl = `http://localhost:3000/api/assignments/${id}`;

const accessToken = getAccessToken();

console.log(updateAssignmentUrl);

checkAuth();

window.onload = async () => {
  sidebar(sidebarElement);

  if (!title || !description || !deadline) {
    return;
  }

  const res = await axios.get(assignmentUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  const assignment = res.data.data;

  title.value = assignment.title;
  description.value = assignment.description;
  deadline.value = assignment.deadline;

  editButton?.addEventListener("click", async (e) => {
    e.preventDefault();

    const assignmentData = {
      title: title?.value,
      description: description?.value,
      deadline: deadline?.value
    };

    const res = await axios.patch(updateAssignmentUrl, assignmentData, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    if (res.status === 200) {
      window.location.href = "views/assignments/";
    }
  });
};

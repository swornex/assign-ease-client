import "../../../style.css";

import sidebar from "../../../utils/sidebar";
import checkAuth from "../../../utils/checkAuth";
import { AxiosError } from "axios";
import { showToast } from "../../../utils/showToast";
import {
  editAssignment,
  getAssignmentById
} from "../../../services/assignment";
import checkRole from "../../../utils/checkRole";

const sidebarElement = document.querySelector<HTMLElement>(".section-sidebar");
const title = document.querySelector<HTMLInputElement>("#title");
const description = document.querySelector<HTMLInputElement>("#description");
const deadline = document.querySelector<HTMLInputElement>("#deadline");
const editButton = document.querySelector<HTMLButtonElement>("button");
const toast = document.getElementById("toast");

const id = new URLSearchParams(window.location.search).get("assignmentId");

checkAuth();
checkRole("Admin");

window.onload = async () => {
  sidebar(sidebarElement);

  if (!title || !description || !deadline || !toast) {
    return;
  }

  try {
    const res = await getAssignmentById(id);

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

      await editAssignment(id, assignmentData);

      window.location.href = "views/assignments/";
      showToast(toast, "Assignment updated successfully");
    });
  } catch (e) {
    if (e instanceof AxiosError) {
      showToast(toast, e.response?.data.message);
    }
  }
};

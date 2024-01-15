import "../../../style.css";

import { getAccessToken } from "../../../utils/token";
import axios, { AxiosError } from "axios";
import sidebar from "../../../utils/sidebar";
import checkAuth from "../../../utils/checkAuth";
import { showToast } from "../../../utils/showToast";

const sidebarElement = document.querySelector<HTMLElement>(".section-sidebar");
const submitAssignmentUrl = document.querySelector<HTMLInputElement>("#url");
const submitButton = document.querySelector<HTMLButtonElement>("button");
const submissionWrapper = document.querySelector<HTMLElement>(
  ".submission-wrapper"
);
const toast = document.getElementById("toast");

const submissionForm =
  document.querySelector<HTMLFormElement>(".submission-form");

const accessToken = getAccessToken();

const urlParams = new URLSearchParams(window.location.search);
const assignmentId = urlParams.get("assignmentId");

const userAssignmentStatusUrl =
  "http://localhost:3000/api/user-assignment-status";
const submissionUrl = "http://localhost:3000/api/submissions";

checkAuth();

window.onload = async () => {
  sidebar(sidebarElement);

  if (!submitAssignmentUrl || !submitButton || !toast) {
    return;
  }

  const res = await axios.get(userAssignmentStatusUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    params: {
      assignmentId
    }
  });

  const assignment = res.data.data;

  if (assignment.assignmentStatus !== "Pending") {
    submitButton.remove();
    submitAssignmentUrl.value = assignment.submissionUrl;
    submitAssignmentUrl.classList.add("cursor-not-allowed");
    submitAssignmentUrl.readOnly = true;
  }

  const assignmentInfo = document.createElement("div");
  assignmentInfo.classList.add("flex", "flex-col", "gap-4");

  const titleWrapper = document.createElement("div");
  titleWrapper.classList.add("flex");

  const title = document.createElement("h3");
  title.innerText = assignment.title;

  const status = document.createElement("span");
  status.classList.add(
    "ml-auto",
    "border",
    "border-black",
    "p-2",
    "rounded-full"
  );
  status.innerText = assignment.assignmentStatus;

  const description = document.createElement("p");
  description.innerText = assignment.description;

  const deadline = document.createElement("span");
  deadline.innerText = `Deadline: ${assignment.deadline}`;

  titleWrapper.appendChild(title);
  titleWrapper.appendChild(status);
  assignmentInfo.appendChild(titleWrapper);
  assignmentInfo.appendChild(description);
  assignmentInfo.appendChild(deadline);

  submissionWrapper?.insertBefore(assignmentInfo, submissionForm);

  submitButton?.addEventListener("click", async (e) => {
    e.preventDefault();
    const submissionData = {
      submissionUrl: submitAssignmentUrl?.value,
      assignmentId: assignmentId
    };

    try {
      await axios.post(submissionUrl, submissionData, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      window.location.href = "/views/assignments/";
      showToast(toast, "Assignment submitted successfully");
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log(e);
        showToast(toast, e.response?.data.message);
      }
    }
  });
};

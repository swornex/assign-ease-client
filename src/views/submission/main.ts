import axios, { AxiosError } from "axios";
import "../../style.css";
import sidebar from "../../utils/sidebar";
import { getAccessToken } from "../../utils/token";
import checkAuth from "../../utils/checkAuth";
import { IUserAssignmentStatus } from "../../interfaces/IUserAssignmentStatus";
import { ISubmission } from "../../interfaces/ISubmission";
import { showToast } from "../../utils/showToast";

const sidebarElement = document.querySelector<HTMLElement>(".section-sidebar");
const mainSection = document.querySelector<HTMLElement>(".section-main");
const toast = document.getElementById("toast");

const accessToken = getAccessToken();
const submissionUrl = "http://localhost:3000/api/dashboard";

checkAuth();

window.onload = async () => {
  sidebar(sidebarElement);

  if (!toast) {
    return;
  }

  try {
    const res = await axios.get(submissionUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const assignments = res.data.data;

    assignments.map((assignment: IUserAssignmentStatus) => {
      const mainWrapper = document.createElement("div");
      mainWrapper.classList.add("mx-8", "my-4");

      const assignmentName = document.createElement("h2");
      assignmentName.classList.add("text-xl");
      assignmentName.innerText = assignment.title;

      const submissionCard = document.createElement("div");
      submissionCard.classList.add(
        "bg-neutral-200",
        "rounded-lg",
        "w-full",
        "py-3",
        "px-8",
        "flex",
        "flex-wrap",
        "gap-4",
        "flex-col"
      );

      assignment.submissions.map((submission: ISubmission) => {
        const anchorElement = document.createElement("a");
        anchorElement.href = `/views/evaluate/?assignmentId=${assignment.assignmentId}&userId=${submission.userId}`;

        const submissionCardItem = document.createElement("div");
        submissionCardItem.classList.add(
          "bg-white",
          "p-4",
          "rounded-md",
          "shadow-md"
        );

        const card = document.createElement("div");
        card.classList.add("flex", "justify-between", "items-center", "mb-2");

        const internName = document.createElement("h3");
        internName.classList.add("text-md", "font-semibold", "mb-2");
        internName.innerText = submission.name;

        const status = document.createElement("span");
        status.classList.add("text-gray-600");
        status.innerText = submission.assignmentStatus;

        const lateSubmission = document.createElement("span");
        lateSubmission.classList.add("text-gray-600", "mb-2");
        lateSubmission.innerText = submission.isLateSubmitted
          ? "Submitted Lately"
          : "On Time";

        card.appendChild(internName);
        card.appendChild(status);
        submissionCardItem.appendChild(card);
        submissionCardItem.appendChild(lateSubmission);

        anchorElement.appendChild(submissionCardItem);
        submissionCard.appendChild(anchorElement);
      });
      mainWrapper.appendChild(assignmentName);
      mainWrapper.appendChild(submissionCard);

      mainSection?.appendChild(mainWrapper);
    });
  } catch (e) {
    if (e instanceof AxiosError) {
      console.log(e);
      showToast(toast, e.response?.data.message);
    }
  }
};

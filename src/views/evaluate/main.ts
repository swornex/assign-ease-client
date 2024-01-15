import "../../style.css";

import { AxiosError } from "axios";
import sidebar from "../../utils/sidebar";
import checkAuth from "../../utils/checkAuth";
import { showToast } from "../../utils/showToast";
import {
  evaluateAssignment,
  getUserAssignmentStatus
} from "../../services/evaluate";
import checkRole from "../../utils/checkRole";

const sidebarElement = document.querySelector<HTMLElement>(".section-sidebar");
const mainSection = document.querySelector<HTMLElement>(".section-main");

const formWrapper = document.querySelector<HTMLElement>(".form-wrapper");
const toast = document.getElementById("toast");

const form = document.querySelector<HTMLFormElement>("#form");

const remarks = document.querySelector<HTMLInputElement>("#remarks");
const evaluateButton = document.querySelector<HTMLButtonElement>("button");

const assignmentId = new URLSearchParams(window.location.search).get(
  "assignmentId"
);
const userId = new URLSearchParams(window.location.search).get("userId");

checkAuth();
checkRole("Admin");

window.onload = async () => {
  sidebar(sidebarElement);

  if (!remarks || !evaluateButton || !toast) {
    return;
  }

  try {
    const res = await getUserAssignmentStatus(assignmentId, userId);
    const submission = res.data.data;

    if (submission.assignmentStatus !== "Submitted") {
      form?.remove();
    }

    if (submission.assignmentStatus === "Evaluated") {
      const avgPoint = document.createElement("span");
      avgPoint.innerText = `Average Point: ${submission.avgPoints}`;
      avgPoint.classList.add("text-lg", "font-bold");

      formWrapper?.appendChild(avgPoint);
    }

    const mainWrapper = document.createElement("div");
    mainWrapper.classList.add("mx-8", "my-4", "flex", "flex-col", "gap-4");

    const titleStatusWrapper = document.createElement("div");
    titleStatusWrapper.classList.add("flex", "justify-between");

    const assignmentTitle = document.createElement("span");
    assignmentTitle.classList.add("text-xl");
    assignmentTitle.innerText = `${submission.title} - ${submission.name}`;

    const assignmentStatus = document.createElement("span");
    assignmentStatus.classList.add(
      "ml-auto",
      "border",
      "border-black",
      "p-2",
      "rounded-full"
    );
    assignmentStatus.innerText = submission.assignmentStatus;

    const assigmentDescription = document.createElement("p");
    assigmentDescription.innerText = submission.description;

    const submissionUrl = document.createElement("a");
    submissionUrl.href = submission.submissionUrl;
    submissionUrl.innerText = submission.submissionUrl;

    titleStatusWrapper.append(assignmentTitle, assignmentStatus);

    mainWrapper.append(titleStatusWrapper, assigmentDescription, submissionUrl);

    mainSection?.insertBefore(mainWrapper, formWrapper);

    evaluateButton?.addEventListener("click", async (e) => {
      e.preventDefault();

      const innerProblemSolving = document.querySelector<HTMLInputElement>(
        'input[name="problemSolving"]:checked'
      );
      const innerCodeQuality = document.querySelector<HTMLInputElement>(
        'input[name="codeQuality"]:checked'
      );
      const innerFinalProduct = document.querySelector<HTMLInputElement>(
        'input[name="finalProduct"]:checked'
      );

      const evaluateData = {
        problemSolvingPoints: innerProblemSolving?.value,
        codeQualityPoints: innerCodeQuality?.value,
        finalProductPoints: innerFinalProduct?.value,
        remarks: remarks?.value,
        submissionId: submission.submissionId
      };

      try {
        await evaluateAssignment(evaluateData);

        window.location.href = "/views/submission/";
        showToast(toast, "Assignment evaluated successfully");
      } catch (e) {
        if (e instanceof AxiosError) {
          showToast(toast, e.response?.data.message);
        }
      }
    });
  } catch (e) {
    if (e instanceof AxiosError) {
      showToast(toast, e.response?.data.message);
    }
  }
};

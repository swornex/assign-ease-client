import axios from "axios";
import "../../style.css";
import { decodedRole } from "../../utils/decodeUser";
import renderUserDashboard from "../../components/dashboard/userDashboard";
import renderAdminDashboard from "../../components/dashboard/adminDashboard";
import sidebar from "../../utils/sidebar";

const sidebarElement = document.querySelector<HTMLElement>(".section-sidebar");
const mainSection = document.querySelector<HTMLElement>(".section-main");

const accessToken = localStorage.getItem("token");
const role = decodedRole();
const dashboardUrl =
  role === "User"
    ? "http://localhost:3000/api/dashboard"
    : "http://localhost:3000/api/assignments";

if (!accessToken) {
  window.location.href = "../login/";
}
window.onload = async () => {
  const assignmentCard =
    document.querySelector<HTMLElement>("#assignment-card");

  sidebar(sidebarElement);
  const res = await axios.get(dashboardUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  const addButton = document.createElement("button");
  addButton.classList.add(
    "bg-neutral-300",
    "hover:bg-neutral-500",
    "mr-8",
    "text-black"
  );
  addButton.innerText = "Add Assignment";

  if (role === "Admin") {
    mainSection?.insertBefore(addButton, assignmentCard);
  }

  addButton.addEventListener("click", () => {
    window.location.href = "../add-assignment/";
  });

  const assignments = res.data.data;

  const el = document.createElement("div");
  el.classList.add(
    "bg-neutral-200",
    "rounded-lg",
    "w-full",
    "py-3",
    "px-8",
    "m-10"
  );

  role === "User"
    ? renderUserDashboard(el, assignments)
    : renderAdminDashboard(el, assignments);

  assignmentCard?.appendChild(el);
};

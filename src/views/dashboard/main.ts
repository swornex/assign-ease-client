import axios from "axios";
import renderSideBar from "../../components/sidebar/sidebar";
import "../../style.css";
import { decodedRole } from "../../utils/decodeUser";
import renderUserDashboard from "../../components/dashboard/userDashboard";
import renderAdminDashboard from "../../components/dashboard/adminDashboard";

const sidebar = document.querySelector<HTMLElement>(".section-sidebar");

const dashboardUrl = "http://localhost:3000/api/dashboard";
const accessToken = localStorage.getItem("token");
const role = decodedRole();

window.onload = async () => {
  const assignmentCard =
    document.querySelector<HTMLElement>("#assignment-card");

  if (!sidebar) {
    return;
  }
  renderSideBar(sidebar);

  const res = await axios.get(dashboardUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
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

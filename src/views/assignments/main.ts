import { AxiosError } from "axios";
import "../../style.css";
import { decodedRole } from "../../utils/decodeUser";
import renderUserDashboard from "../../components/dashboard/userDashboard";
import renderAdminDashboard from "../../components/dashboard/adminDashboard";
import sidebar from "../../utils/sidebar";
import checkAuth from "../../utils/checkAuth";
import { showToast } from "../../utils/showToast";
import { getDashboardData } from "../../services/dashboard";

const sidebarElement = document.querySelector<HTMLElement>(".section-sidebar");
const mainSection = document.querySelector<HTMLElement>(".section-main");
const toast = document.getElementById("toast");

const role = decodedRole();

checkAuth();
window.onload = async () => {
  if (!toast) {
    return;
  }

  const assignmentCard =
    document.querySelector<HTMLElement>("#assignment-card");

  sidebar(sidebarElement);

  try {
    const res = await getDashboardData();

    const buttonWrapper = document.createElement("div");
    buttonWrapper.classList.add("flex");

    const addButton = document.createElement("a");
    addButton.classList.add(
      "mr-8",
      "ml-auto",
      "p-2",
      "rounded-md",
      "bg-blackPearl-600",
      "text-neutral-200",
      "hover:bg-blackPearl-700"
    );
    addButton.innerText = "Add Assignment";
    addButton.href = "/views/assignments/add/";

    buttonWrapper.appendChild(addButton);
    if (role === "Admin") {
      mainSection?.insertBefore(buttonWrapper, assignmentCard);
    }

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
  } catch (e) {
    if (e instanceof AxiosError) {
      showToast(toast, e.response?.data.message);
    }
  }
};

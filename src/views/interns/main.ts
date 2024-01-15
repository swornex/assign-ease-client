import { AxiosError } from "axios";
import "../../style.css";
import sidebar from "../../utils/sidebar";
import checkAuth from "../../utils/checkAuth";
import { IUserWithFullName } from "../../interfaces/IUser";
import { showToast } from "../../utils/showToast";
import { deleteUser, getUser } from "../../services/intern";
import checkRole from "../../utils/checkRole";

const sidebarElement = document.querySelector<HTMLElement>(".section-sidebar");
const toast = document.getElementById("toast");

checkAuth();
checkRole("Admin");

window.onload = async () => {
  const internCard = document.querySelector<HTMLElement>("#intern-card");

  sidebar(sidebarElement);

  if (!toast) {
    return;
  }
  try {
    const res = await getUser();

    const users = res.data.data;

    const el = document.createElement("div");
    el.classList.add(
      "bg-neutral-200",
      "rounded-lg",
      "w-full",
      "py-3",
      "px-8",
      "m-10"
    );

    el.innerHTML = `
      <table class="w-full">
        <tr>
          <th class="p-2">Name</th>
          <th class="p-2">Email</th>
          <th class="p-2">Status</th>
          <th class="p-2">CreatedAt</th>
          <th class="p-2">Action</th>
        </tr>
        ${users
          .map(
            (user: IUserWithFullName) => `
              <tr id="${user.id}">
                <td class="p-2">${user.name}</td>
                <td class="p-2">${user.email}</td>
                <td class="p-2">${user.status}</td>
                <td class="p-2">${user.createdAt}</td>
                <td class="p-2 text-center">
                  <button class="delete bg-transparent hover:bg-transparent" ${
                    user.status === "Deleted" ? "disabled" : ""
                  }><i class="ph-bold ph-trash ${
              user.status === "Active" ? "text-red-600" : "text-gray-600"
            } "></i></button>
                </td>
              </tr>
            `
          )
          .join("")}
      </table>
    `;

    const deleteButtons = el.querySelectorAll<HTMLButtonElement>(".delete");

    deleteButtons.forEach((deleteButton) => {
      deleteButton?.addEventListener("click", async (e: MouseEvent) => {
        e.preventDefault();
        const targetElement = e.target as Element;
        const userId = targetElement?.closest("tr")?.id;

        if (!userId) {
          return;
        }

        if (userId) {
          try {
            await deleteUser(userId);
            showToast(toast, "User deleted successfully");

            window.location.reload();
          } catch (e) {
            if (e instanceof AxiosError) {
              showToast(toast, e.response?.data.message);
            }
          }
        }
      });
    });

    internCard?.appendChild(el);
  } catch (e) {
    if (e instanceof AxiosError) {
      showToast(toast, e.response?.data.message);
    }
  }
};

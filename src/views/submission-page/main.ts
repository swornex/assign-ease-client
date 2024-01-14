import axios from "axios";
import "../../style.css";
import sidebar from "../../utils/sidebar";

const sidebarElement = document.querySelector<HTMLElement>(".section-sidebar");

const accessToken = localStorage.getItem("token");
const submissionUrl = "http://localhost:3000/api/dashboard";

if (!accessToken) {
  window.location.href = "../login/";
}
window.onload = async () => {
  const assignmentCard =
    document.querySelector<HTMLElement>("#assignment-card");

  sidebar(sidebarElement);
  const res = await axios.get(submissionUrl, {
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

  el.innerHTML = `
  <table class="w-full">
        <tr>
          <th class="p-2">Assignment Name</th>
          <th class="p-2">Status</th>
        </tr>
        ${assignments
          .map(
            (assignment: any, index: number) => `
          <tr>
            <td class="p-2">${assignment.title}</td>
            <td class="p-2">${assignment.submissions[index].status}</td>
          </tr>
        `
          )
          .join("")}
      </table>
  `;

  //

  assignmentCard?.appendChild(el);
};

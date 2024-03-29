import { IAdminDashboard } from "../../interfaces/IAdminDashboard";

/**
 * Renders the admin dashboard with the given assignments.
 *
 * @param {HTMLElement} dashboard - The HTML element where the dashboard will be rendered.
 * @param {IAdminDashboard[]} assignments - An array of assignments to be displayed on the dashboard.
 */
const renderAdminDashboard = (
  dashboard: HTMLElement,
  assignments: IAdminDashboard[]
) => {
  dashboard.innerHTML = `
    <table class="w-full">
      <tr>
        <th class="p-2">Assignment Name</th>
        <th class="p-2">Deadline</th>
        <th class="p-2">Action</th>
      </tr>
      ${assignments
        .map(
          (assignment: IAdminDashboard) => `
        <tr>
          <td class="p-2">${assignment.title}</td>
          <td class="p-2">${assignment.deadline}</td>
          <td class="p-2 text-center"><a href="/views/assignments/edit/?assignmentId=${assignment.id}"><i class="ph-bold ph-pencil text-blackPearl-700"></i></a></td>
        </tr>
      `
        )
        .join("")}
    </table>
  `;
};

export default renderAdminDashboard;

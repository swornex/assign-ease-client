import { IUserDashboard } from "../../interfaces/IUserDashboard";

const renderUserDashboard = (
  dashboard: HTMLElement,
  assignments: IUserDashboard[]
) => {
  dashboard.innerHTML = `<div class="flex flex-wrap gap-4 flex-col">
    ${assignments
      .map(
        (assignment: IUserDashboard) => `
        <a href="/views/assignments/submit/?assignmentId=${
          assignment.assignmentId
        }">
      <div class="bg-white p-4 rounded-md shadow-md">
        <div class="flex justify-between items-center mb-2">
          <h3 class="text-xl font-semibold mb-2">${assignment.title}</h3>
          <p class="text-gray-600">Status: ${assignment.assignmentStatus}</p>
        </div>
        <p class="text-gray-600 mb-2">Average Score: ${
          assignment.avgPoints ?? 0
        }</p>
      </div>
      </a>
      `
      )
      .join("")}
  </div>`;
};

export default renderUserDashboard;

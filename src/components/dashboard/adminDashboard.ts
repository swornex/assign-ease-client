const renderAdminDashboard = (dashboard: HTMLElement, assignments: any) => {
  dashboard.innerHTML = `
    <table class="w-full">
      <tr>
        <th class="p-2">Assignment Name</th>
        <th class="p-2">Deadline</th>
      </tr>
      ${assignments
        .map(
          (assignment: any) => `
        <tr>
          <td class="p-2">${assignment.title}</td>
          <td class="p-2">${assignment.deadline}</td>
          <a href="#"><td class="p-2">edit</td></a>
        </tr>
      `
        )
        .join("")}
    </table>
  `;
};

export default renderAdminDashboard;

//<td class="p-2">${assignment.submissions[index].status}</td>

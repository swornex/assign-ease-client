const renderAdminDashboard = (dashboard: HTMLElement, assignments: any) => {
  dashboard.innerHTML = `
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
};

export default renderAdminDashboard;

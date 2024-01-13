const renderUserDashboard = (dashboard: HTMLElement, assignments: any) => {
  dashboard.innerHTML = `<table class="w-full cell">
    <tr>
      <th class="p-2">Assignment Name</th>
      <th class="p-2">Average Score</th>
      <th class="p-2">Status</th>
    </tr>
    ${assignments
      .map(
        (assignment: any) => `
      <tr>
      <td class="p-2">${assignment.title}</td>
      <td class="p-2">${
        assignment.avgPoints === null ? 0 : assignment.avgPoints
      }</td>
      <td class="p-2">${assignment.status}</td>
    </tr>
      `
      )
      .join("")}

    
  </table>
  
  `;
};

export default renderUserDashboard;

import renderSideBar from "../components/sidebar/sidebar";

/**
 * Generates a sidebar for the given sidebar element.
 *
 * @param {HTMLElement | null} sidebarElement - The sidebar element to generate.
 */
const sidebar = (sidebarElement: HTMLElement | null) => {
  if (!sidebarElement) {
    return;
  }

  renderSideBar(sidebarElement);

  const logout = document.querySelector<HTMLButtonElement>("#logout");

  logout?.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "/views/login/";
  });
};

export default sidebar;

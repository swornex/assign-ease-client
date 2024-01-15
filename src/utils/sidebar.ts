import renderSideBar from "../components/sidebar/sidebar";

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

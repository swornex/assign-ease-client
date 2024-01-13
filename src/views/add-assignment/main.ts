import "../../style.css";

import renderSideBar from "../../components/sidebar/sidebar";

const sidebar = document.querySelector<HTMLElement>(".section-sidebar");
window.onload = () => {
  if (!sidebar) {
    return;
  }
  renderSideBar(sidebar);
};

import { decodeUserName, decodedRole } from "../../utils/decodeUser";

/**
 * Renders the sidebar by updating the HTML of the provided sidebar element.
 *
 * @param {HTMLElement} sidebar - The HTMLElement that represents the sidebar.
 */
const renderSideBar = (sidebar: HTMLElement) => {
  // Get the current path or URL
  const currentPath = window.location.pathname;

  const [, , path] = currentPath.split("/");

  sidebar.innerHTML = `
    <nav class="py-8 h-full fixed w-1/4 grid">
      <div class="flex flex-col gap-3 items-center">
        <div>
          <img src="/assets/images/userImage.png" class="w-20 " alt="userImage" />
        </div>
        <h2>${decodeUserName()}</h2>
      </div>

      <div class="w-full mt-8">
        <ul class="flex flex-col gap-3 items-center w-full px-4">
          <li class="nav-items ${path === "assignments" ? "active" : ""}">
            <a href="/views/assignments/">Assignments</a>
          </li>
          ${
            decodedRole() === "Admin"
              ? `
          <li class="nav-items ${path === "submission" ? "active" : ""}">
            <a href="/views/submission/">Submission</a>
          </li>
          <li class="nav-items ${path === "interns" ? "active" : ""}">
            <a href="/views/interns/">Interns</a>
          </li>
          `
              : ""
          }
        </ul>
      </div>

      <button class="mt-auto my-0 outline outline-neutral-500 bg-transparent text-neutral-500 font-bold" id="logout">Logout</button>
    </nav>
  `;
};

export default renderSideBar;

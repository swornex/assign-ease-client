import { decodeUserName } from "../../utils/decodeUser";

const renderSideBar = (sidebar: HTMLElement) => {
  // Get the current path or URL
  const currentPath = window.location.pathname;

  const [, , path] = currentPath.split("/");

  console.log(path);
  sidebar.innerHTML = `
    <nav class="py-8 h-full fixed w-1/4 grid">
      <div class="flex flex-col gap-3 items-center">
        <div>
          <img src="../../assets/images/userImage.png" class="w-20 " alt="userImage" />
        </div>
        <h2>${decodeUserName()}</h2>
      </div>

      <div class="w-full mt-8">
        <ul class="flex flex-col gap-3 items-center w-full px-4">
          <li class="nav-items ${path === "dashboard" ? "active" : ""}">
            <a href="/views/dashboard/">Assignments</a>
          </li>
          <li class="nav-items ${path === "create-account" ? "active" : ""}">
            <a href="/views/create-account/">Create Account</a>
          </li>
          <li class="nav-items ${path === "submission" ? "active" : ""}">
            <a href="/views/submission-page/">Submission</a>
          </li>
          <li class="nav-items ${path === "interns" ? "active" : ""}">
            <a href="/views/interns/">Interns</a>
          </li>
        </ul>
      </div>

      <button class="mt-auto my-0 outline outline-neutral-500 bg-transparent text-neutral-500 font-bold" id="logout">Logout</button>
    </nav>
  `;
};

export default renderSideBar;

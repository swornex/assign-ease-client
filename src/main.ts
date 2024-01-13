import "./style.css";

window.onload = () => {
  const accessToken = localStorage.getItem("token");

  console.log(accessToken);
  if (!accessToken) {
    window.location.href = "/views/login/";
  } else {
    window.location.href = "/views/dashboard/";
  }
};

function checkAuth() {
  try {
    console.log("user");
  } catch (e) {
    console.log("not logged in");
  }
}

export default checkAuth;

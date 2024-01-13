import { jwtDecode } from "jwt-decode";
import { IDecodedUser } from "../interfaces/IDecodedUser";

export function decodeUser() {
  const accessToken = localStorage.getItem("token");
  if (accessToken) {
    const decodedUser = jwtDecode<IDecodedUser>(accessToken);
    return decodedUser.data;
  }
}

export function decodeUserName() {
  const firstName = decodeUser()?.firstName;
  const lastName = decodeUser()?.lastName;
  const fullName = firstName + " " + lastName;

  return fullName;
}

export function decodedRole() {
  const role = decodeUser()?.role;

  return role;
}

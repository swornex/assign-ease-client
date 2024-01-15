import { jwtDecode } from "jwt-decode";
import { IDecodedUser } from "../interfaces/IDecodedUser";
import { getAccessToken } from "./token";

export function decodeUser() {
  const accessToken = getAccessToken();
  if (accessToken) {
    const decodedUser = jwtDecode<IDecodedUser>(accessToken);
    return decodedUser.data;
  }
}

export function decodeUserName() {
  const firstName = decodeUser()?.firstName;
  const lastName = decodeUser()?.lastName;
  const fullName = lastName ? firstName + " " + lastName : firstName;

  return fullName;
}

export function decodedRole() {
  const role = decodeUser()?.role;

  return role;
}

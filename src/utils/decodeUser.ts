import { jwtDecode } from "jwt-decode";
import { IDecodedUser } from "../interfaces/IDecodedUser";
import { getAccessToken } from "./token";

/**
 * Decodes the user data from the access token.
 *
 * @return {IDecodedUser["data"]} The decoded user data.
 */
export function decodeUser() {
  const accessToken = getAccessToken();
  if (accessToken) {
    const decodedUser = jwtDecode<IDecodedUser>(accessToken);
    return decodedUser.data;
  }
}

/**
 * Decodes the user's first and last name and returns the full name.
 *
 * @return {string} The full name of the user.
 */
export function decodeUserName() {
  const firstName = decodeUser()?.firstName;
  const lastName = decodeUser()?.lastName;
  const fullName = lastName ? firstName + " " + lastName : firstName;

  return fullName;
}

/**
 * Retrieves and returns the user's role after decoding the user object.
 *
 * @return {string | undefined} The user's role, or undefined if the user object is not decoded.
 */
export function decodedRole() {
  const role = decodeUser()?.role;

  return role;
}

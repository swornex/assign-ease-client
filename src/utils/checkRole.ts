import { IRole } from "../interfaces/IUser";
import { decodedRole } from "./decodeUser";

/**
 * Checks if the user is authorized.
 *
 * @return {void} No return value.
 */
function checkRole(role: IRole) {
  const userRole = decodedRole();
  if (userRole !== role) {
    window.location.href = "/";
  }
}

export default checkRole;

import { IUser } from "./IUser";

export interface IDecodedUser {
  data: IUser;
  iat: number;
  exp: number;
}

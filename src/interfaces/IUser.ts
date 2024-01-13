export type IRole = "Admin" | "User";
export type IStatus = "Active" | "Delete";

export interface IUser {
  id: string;
  status: IStatus;
  firstName: string;
  lastName: string;
  email: string;
  role: IRole;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}

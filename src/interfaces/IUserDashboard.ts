export type IAssignmentStatus = "Pending" | "Submitted" | "Evaluated";

export interface IUserDashboard {
  title: string;
  avgPoints: number;
  assignmentStatus: IAssignmentStatus;
  assignmentId: string;
}

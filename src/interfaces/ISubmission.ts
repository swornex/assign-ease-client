import { IStatus } from "./IUser";
import { IAssignmentStatus } from "./IUserDashboard";

export interface ISubmission {
  userId: string;
  name: string;
  userStatus: IStatus;
  submissionId: string | null;
  isLateSubmitted: boolean;
  assignmentStatus: IAssignmentStatus;
  submissionUrl: string | null;
}

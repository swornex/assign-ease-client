import { ISubmission } from "./ISubmission";

export interface IUserAssignmentStatus {
  assignmentId: number;
  title: string;
  submissions: ISubmission[];
}

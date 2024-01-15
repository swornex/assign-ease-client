export interface IAdminDashboard {
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string | null;
  id: string;
  title: string;
  description: string;
  deadline: Date;
}

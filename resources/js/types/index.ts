export type ManageUserData = {
  id: number;
  name: string;
};
export type ManageUserDetailData = {
  id: number;
  name: string;
  email: string;
  roles: Array<RoleDetailData>;
};
export type ManageUserListData = {
  id: number;
  name: string;
  email: string;
  roles: Array<RoleData>;
};
export type MilestoneData = {
  id: number | null;
  name: string | null;
  description: string | null;
  due_date: string | null;
  status: string | null;
  created_at: string | null;
  updated_at: string | null;
};
export type PermissionData = {
  id: number;
  name: string;
};
export type ProjectData = {
  id: number;
  manager: ManageUserData | null;
  client: ManageUserData | null;
  name: string;
  description: string | null;
  project_type: string | null;
  budget: number | null;
  status: string | null;
  start_date: string | null;
  end_date: string | null;
};
export type ProjectDetailData = {
  id: number | null;
  manager: UserData | null;
  client: UserData | null;
  name: string | null;
  description: string | null;
  project_type: string | null;
  start_date: string | null;
  end_date: string | null;
  budget: number | null;
  status: string | null;
  created_at: string;
  updated_at: string;
  phases: Array<ProjectPhaseData> | null;
  milestones: Array<MilestoneData> | null;
};
export type ProjectPhaseData = {
  id: number;
  name: string;
  description: string | null;
  start_date: string | null;
  end_date: string | null;
  status: string;
  created_at: string | null;
  updated_at: string | null;
  milestones: Array<MilestoneData> | null;
};
export type ProjectPhaseDetailData = {
  id: number;
  name: string;
  description: string | null;
  start_date: string | null;
  end_date: string | null;
  status: string;
  created_at: string | null;
  updated_at: string | null;
  milestones: Array<MilestoneData> | null;
};
export type RoleData = {
  id: number;
  name: string;
};
export type RoleDetailData = {
  id: number;
  name: string;
  permissions: Array<PermissionData>;
};
export type UserData = {
  id: number;
  name: string;
  email: string;
};

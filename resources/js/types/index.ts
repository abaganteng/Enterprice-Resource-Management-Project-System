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
  name: string | null;
  projectGroups: Array<ProjectGroupData> | null;
};
export type ProjectGroupData = {
  id: number | null;
  name: string | null;
  statuses: Array<StatusData> | null;
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
export type StatusData = {
  id: number | null;
  name: string | null;
  color: string | null;
  tasks: Array<TaskData> | null;
};
export type TaskData = {
  id: number | null;
  name: string | null;
  parent_id: number | null;
};
export type UserData = {
  id: number;
  name: string;
  email: string;
};

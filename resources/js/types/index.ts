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
  id: number | null;
  manager: ManageUserData;
  client: ManageUserData;
  name: string;
  start_date: string | null;
  end_date: string | null;
  budget: number | null;
  status: string | null;
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

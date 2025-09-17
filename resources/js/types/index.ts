export type ManageUserData = {
  id: number;
  name: string;
};
export type PermissionData = {
  id: number;
  name: string;
};
export type RoleData = {
  id: number;
  name: string;
  permissions: Array<PermissionData>;
};
export type UserData = {
  id: number;
  name: string;
  email: string;
  roles: Array<ManageUserData>;
};
export type UserDetailData = {
  id: number;
  name: string;
  email: string;
  roles: Array<RoleData>;
};

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
export type RoleData = {
  id: number;
  name: string;
};
export type RoleDetailData = {
  id: number;
  name: string;
  permissions: Array<PermissionData>;
};
export type RolesPermissionsData = {
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

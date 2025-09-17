export type ManageUserData = {
  id: number;
  name: string;
};
export type UserData = {
  id: number;
  name: string;
  email: string;
  roles: Array<ManageUserData>;
};

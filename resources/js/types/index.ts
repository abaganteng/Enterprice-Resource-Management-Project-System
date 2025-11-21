export type AssignData = {
  name: string | null;
};
export type DepartmentData = {
  id: number | null;
  name: string | null;
  head: UserData | null;
  positions: Array<PositionData> | null;
  employees: Array<EmployeeData> | null;
};
export type EmployeeContractData = {
  id: number | null;
  employee: EmployeeData | null;
  position: PositionData | null;
  has_active_contract: boolean | null;
  contract_type: string | null;
  start_date: string | null;
  end_date: string | null;
  benefits: string | null;
  status: string | null;
};
export type EmployeeData = {
  id: number | null;
  employee_code: string | null;
  name: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  date_of_birth: string | null;
  gender: string | null;
  status: string | null;
  contracts: { [key: number]: any } | null;
  department: DepartmentData | null;
  position: PositionData | null;
  user: UserData | null;
  join_date: string | null;
};
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
export type PositionData = {
  id: number | null;
  name: string | null;
  department: DepartmentData | null;
  employees: Array<EmployeeData> | null;
  base_salary: number | null;
  level: number | null;
};
export type ProjectCalendarData = {
  id: number | null;
  name: string | null;
  due_date: string | null;
  start_date: string | null;
  end_date: string | null;
  priority: string | null;
  assignees: AssignData | null;
  status: StatusCalendarData | null;
  projectGroup: ProjectGroupCalendarData | null;
  subtasks: Array<SubtaskCalendarData> | null;
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
  start_date: string | null;
  end_date: string | null;
  due_date: string | null;
  projectGroups: Array<ProjectGroupData> | null;
};
export type ProjectGroupCalendarData = {
  id: number | null;
  name: string | null;
};
export type ProjectGroupData = {
  id: number | null;
  name: string | null;
  statuses: Array<StatusData> | null;
  tasks: Array<TaskData> | null;
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
export type StatusCalendarData = {
  id: number | null;
  name: string | null;
  color: string | null;
};
export type StatusData = {
  id: number | null;
  name: string | null;
  color: string | null;
  tasks: Array<TaskData> | null;
};
export type SubtaskCalendarData = {
  id: number | null;
  name: string | null;
  assign: AssignData | null;
};
export type TaskData = {
  id: number | null;
  name: string | null;
  due_date: string | null;
  start_date: string | null;
  end_date: string | null;
  priority: string | null;
  assignees: Array<UserData> | null;
  status: StatusData | null;
  parent_id: number | null;
};
export type UserData = {
  id: number;
  name: string;
  email: string;
  gravatar: string | null;
};

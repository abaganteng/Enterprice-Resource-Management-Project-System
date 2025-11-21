import { PropsWithChildren } from "react";
import { ProjectDetailData } from "@/types";
import AppLayout from "./app-layout";
import EmployeeAppSidebarNav from "@/components/employee-app-sidebar-nav";
import EmployeeAppSidebarSubNav from "@/components/employee-app-sidebar-sub-nav";
import ContractAppSidebarNav from "@/components/contract-app-sidebar-nav";
import ContractAppSidebarSubNav from "@/components/contract-app-sidebar-sub-nav";

interface ProjectLayoutProps extends PropsWithChildren {
  project: ProjectDetailData;
}

export default function ContractNav({ project, children }: ProjectLayoutProps) {
  return (
    <AppLayout>
      {/* Scoped project navigation */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <ContractAppSidebarNav project={project} />

        {/* Task navigation (Overview, List, Create Task) */}
        <ContractAppSidebarSubNav project={project} />

        {/* Main section (dinamis sesuai tab) */}
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
      </div>
    </AppLayout>
  );
}

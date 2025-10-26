import HumanAppSidebarNav from "@/components/human-app-sidebar-nav";
import HumanAppSidebarSubNav from "@/components/human-app-sidebar-sub-nav";
import { PropsWithChildren } from "react";
import { ProjectDetailData } from "@/types";
import AppLayout from "./app-layout";

interface ProjectLayoutProps extends PropsWithChildren {
  project: ProjectDetailData;
}

export default function HumanResourcesNav({
  project,
  children,
}: ProjectLayoutProps) {
  return (
    <AppLayout>
      {/* Scoped project navigation */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <HumanAppSidebarNav project={project} />

        {/* Task navigation (Overview, List, Create Task) */}
        <HumanAppSidebarSubNav project={project} />

        {/* Main section (dinamis sesuai tab) */}
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
      </div>
    </AppLayout>
  );
}

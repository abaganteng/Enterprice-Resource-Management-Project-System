import AppSidebarNav from "@/components/app-sidebar-nav";
import AppSidebarSubNav from "@/components/app-sidebar-sub-nav";
import AppLayout from "./app-layout";
import { PropsWithChildren } from "react";

interface ProjectLayoutProps extends PropsWithChildren {
  project: {
    id: number;
    name: string;
  };
}

export default function ProjectLayoutNav({
  project,
  children,
}: ProjectLayoutProps) {
  return (
    <AppLayout>
      {/* Scoped project navigation */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <AppSidebarNav project={project} />

        {/* Task navigation (Overview, List, Create Task) */}
        <AppSidebarSubNav project={project} />

        {/* Main section (dinamis sesuai tab) */}
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
      </div>
    </AppLayout>
  );
}

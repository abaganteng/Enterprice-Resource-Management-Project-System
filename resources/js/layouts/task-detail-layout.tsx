import AppLayout from "./app-layout";
import { PropsWithChildren } from "react";
import { ProjectDetailData } from "@/types";
import TaskSidebarNav from "@/components/task-sidebar-nav";

interface ProjectLayoutProps extends PropsWithChildren {
  project: ProjectDetailData;
}

export default function TaskDetailLayout({
  project,
  children,
}: ProjectLayoutProps) {
  return (
    <AppLayout>
      {/* Scoped project navigation */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <TaskSidebarNav project={project} />

        {/* Main section (dinamis sesuai tab) */}
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
      </div>
    </AppLayout>
  );
}

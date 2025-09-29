import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import ProjectSidebar from "./project-sidebar";
import { PropsWithChildren } from "react";

interface Props {
  project: any;
}

export default function ProjectLayout({
  project,
  children,
}: PropsWithChildren<Props>) {
  return (
    <div className="flex">
      <SidebarProvider>
        <ProjectSidebar collapsible="dock" project={project} />
        <SidebarInset>
          <div className="p-4 lg:p-6">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

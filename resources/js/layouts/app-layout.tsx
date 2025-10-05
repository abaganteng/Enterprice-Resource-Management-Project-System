import AppSidebar from "@/components/app-sidebar";
import { Flash } from "@/components/flash";
import { Footer } from "@/components/footer";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppNavbar } from "@/layouts/app-navbar";
import { CreateProjectModal } from "@/pages/projects/create-project-modal";
import { usePage } from "@inertiajs/react";
import { useState, type PropsWithChildren } from "react";

export default function AppLayout({ children }: PropsWithChildren) {
  const { projects } = usePage<{ projects: any[] }>().props;
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      {/* Flash messages */}
      <Flash />

      {/* Navbar fix di atas */}
      <AppNavbar />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar fix di kiri */}
        <SidebarProvider>
          <AppSidebar
            projects={projects}
            onCreateProject={() => setIsCreateModalOpen(true)}
            collapsible="dock"
          />

          {/* Main section scrollable (Inset + Footer ikut discroll) */}
          <div className="flex-1 flex flex-col overflow-auto">
            <SidebarInset>{children}</SidebarInset>
            <Footer />
          </div>
        </SidebarProvider>
      </div>

      {/* Modal create project */}
      {isCreateModalOpen && (
        <CreateProjectModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
        />
      )}
    </div>
  );
}

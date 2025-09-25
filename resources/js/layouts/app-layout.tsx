import { Flash } from "@/components/flash";
import { Footer } from "@/components/footer";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppNavbar } from "@/layouts/app-navbar";
import type { PropsWithChildren } from "react";
import AppSidebar from "./app-sidebar";
import AppSidebarNav from "./app-sidebar-nav";
import { Container } from "@/components/ui/container";

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <Flash />
      <SidebarProvider>
        <AppSidebar collapsible="dock" />
        <SidebarInset>
          <AppSidebarNav />
          <Container>{children}</Container>
        </SidebarInset>
      </SidebarProvider>
      <Footer />
    </div>
  );
}

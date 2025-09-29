import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";
import { ProjectData, ProjectDetailData } from "@/types";
import { Card } from "@/components/ui/card";
import { Button, buttonStyles } from "@/components/ui/button";
import { Menu, MenuContent, MenuItem } from "@/components/ui/menu";
import { IconChevronLgDown, IconFile, IconFolderOpen } from "@intentui/icons";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { DescriptionList } from "@/components/ui/description-list";
import { Link } from "@/components/ui/link";
import { GridList, GridListItem } from "@/components/ui/grid-list";
import {
  Disclosure,
  DisclosureGroup,
  DisclosurePanel,
  DisclosureTrigger,
} from "@/components/ui/disclosure";
import { FormPhaseModal } from "../phases/form-phase-modal";
import { useState } from "react";
import ProjectSidebar from "./project-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import ProjectSidebarNav from "./project-sidebar-nav";
import ProjectLayout from "./project-layout";

const title = "Show Project";

interface PageSettings {
  title: string;
  description: string;
  buttonText: string;
  method: "post" | "put";
  url: string;
}

interface Props {
  project: ProjectDetailData;
  create?: PageSettings;
  update?: PageSettings;
}

export default function Show({ project, create, update }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPhase, setSelectedPhase] = useState<any>(null);
  const [action, setAction] = useState<"update" | "create" | null>(null);
  return (
    <>
      <Head title={title} />
      <h1 className="sr-only">{title}</h1>
      <ProjectLayout project={project}>
        <Card>
          {/* Header */}
          <Card.Header>
            <Card.Title>Project Name ({project.name})</Card.Title>
            <Card.Description>
              <div className="flex items-center justify-between">
                <div>Project Type: {project.project_type}</div>
                <div className="capitalize">
                  <Badge>{project.status}</Badge>
                </div>
              </div>
            </Card.Description>
          </Card.Header>

          <Card.Content className="flex flex-col gap-y-6">
            {/* Manager & Client */}
            <div className="flex justify-center items-start gap-x-5">
              {/* Manager */}
              <Card className="w-1/2">
                <div className="ml-5 font-medium">Manager</div>
                <Card.Header>
                  <div className="flex items-center gap-x-3">
                    <Avatar
                      isSquare
                      alt="manager"
                      src="https://intentui.com/images/avatar/cobain.jpg"
                    />
                    <div>
                      <Card.Title>{project.manager.name}</Card.Title>
                      <Card.Description>
                        {project.manager.email}
                      </Card.Description>
                    </div>
                  </div>
                </Card.Header>
              </Card>

              {/* Client */}
              <Card className="w-1/2">
                <div className="ml-5 font-medium">Client</div>
                <Card.Header>
                  <div className="flex items-center gap-x-3">
                    <Avatar
                      isSquare
                      alt="client"
                      src="https://intentui.com/images/avatar/cobain.jpg"
                    />
                    <div>
                      <Card.Title>{project.client.name}</Card.Title>
                      <Card.Description>
                        {project.client.email}
                      </Card.Description>
                    </div>
                  </div>
                </Card.Header>
              </Card>
            </div>

            {/* Budget, Dates & Description */}
            <Card>
              <Card.Content className="space-y-4">
                {/* Grid 3 kolom */}
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="block font-medium text-gray-600">
                      Budget
                    </span>
                    <span>{project.budget || "-"}</span>
                  </div>
                  <div>
                    <span className="block font-medium text-gray-600">
                      Start Date
                    </span>
                    <span>{project.start_date}</span>
                  </div>
                  <div>
                    <span className="block font-medium text-gray-600">
                      End Date
                    </span>
                    <span>{project.end_date || "Not Set"}</span>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <span className="block font-medium text-gray-600">
                    Description
                  </span>
                  <p className="text-justify">{project.description}</p>
                </div>
              </Card.Content>
            </Card>

            <Card>
              <Card.Content>
                <DisclosureGroup allowsMultipleExpanded>
                  {Array.isArray(project.milestones) &&
                  project.milestones.length > 0 ? (
                    project.milestones.map((ms: any) => (
                      <Disclosure key={ms.id} id={ms.id}>
                        {/* Milestone Title */}
                        <DisclosureTrigger className="flex justify-between items-center w-full">
                          <span className="font-medium">
                            <IconFile className="text-blue-500 fill-blue-400" />{" "}
                            {ms.name}
                          </span>
                          <span className="text-sm text-gray-500">
                            {ms.due_date || "No date"}
                          </span>
                        </DisclosureTrigger>

                        {/* Milestone Detail */}
                        <DisclosurePanel className="pl-6 mt-2 space-y-2">
                          <div className="text-sm text-gray-600">
                            {ms.description || "Tidak ada deskripsi."}
                          </div>
                        </DisclosurePanel>
                      </Disclosure>
                    ))
                  ) : (
                    <div className="pl-6 mt-2 text-sm text-gray-500 italic">
                      🚫 Belum ada milestone untuk proyek ini
                    </div>
                  )}
                </DisclosureGroup>
              </Card.Content>
            </Card>

            {/* Audit Info */}
            <div className="text-xs text-gray-500 space-y-1">
              <div>Created At: {project.created_at}</div>
              <div>Updated At: {project.updated_at || "Not Updated"}</div>
            </div>
          </Card.Content>

          <Card.Footer />
        </Card>
      </ProjectLayout>

      {selectedPhase && action === "update" && (
        <FormPhaseModal
          open={isOpen}
          onOpenChange={() => setIsOpen(false)}
          project_phase={selectedPhase}
          pageSettings={update}
          start_date={project.start_date}
          end_date={project.end_date}
          project={project.id}
        />
      )}
      {action === "create" && (
        <FormPhaseModal
          open={isOpen}
          onOpenChange={() => setIsOpen(false)}
          pageSettings={create}
          start_date={project.start_date}
          end_date={project.end_date}
          project={project.id}
        />
      )}
    </>
  );
}

Show.layout = (page: any) => <AppLayout children={page} />;

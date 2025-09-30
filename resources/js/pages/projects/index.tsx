import AppLayout from "@/layouts/app-layout";
import { ManageUserData, ProjectData } from "@/types";
import { usePaginator } from "momentum-paginator";
import { Head, usePage } from "@inertiajs/react";
import { Card } from "@/components/ui/card";
import { Table } from "@/components/ui/table";
import {
  Menu,
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuTrigger,
} from "@/components/ui/menu";
import {
  IconChevronLgDown,
  IconDotsVertical,
  IconEye,
  IconGear,
  IconHighlight,
  IconTrash,
} from "@intentui/icons";
import { Pagination } from "@/components/ui/pagination";
import { useState } from "react";
import { Link } from "@/components/ui/link";
import { buttonStyles } from "@/components/ui/button";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
import AppSidebarNav from "@/components/app-sidebar-nav";
import { Container } from "@/components/ui/container";

const title = "Project";

interface ProjectStatusOption {
  id: string;
  name: string;
}

interface PageSettings {
  title: string;
  description: string;
  buttonText: string;
  method: "post" | "put";
  url: string;
}

interface Props {
  projects: Paginator<ProjectData>;
  statuses: ProjectStatusOption[];
  types: ProjectStatusOption[];
  clients: ManageUserData[];
  create?: PageSettings;
  update?: PageSettings;
}

export default function Index({
  projects,
  statuses,
  types,
  clients,
  create,
  update,
}: Props) {
  console.log(projects);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [action, setAction] = useState<"update" | "create" | null>(null);
  const { previous, next, pages } = usePaginator(projects);
  return (
    <>
      <Head title={title} />
      <Container>
        <Link
          onClick={() => (
            setIsOpen(true), setAction("create"), setSelectedProject(null)
          )}
          className={buttonStyles()}
        >
          Create Project
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.data.map((project) => (
            <Card key={project.id}>
              <Card.Header>
                <div className="flex items-center justify-between">
                  <Card.Title>{project.name}</Card.Title>
                  <Menu>
                    <MenuTrigger className="p-1 rounded hover:bg-muted">
                      Action <IconChevronLgDown />
                    </MenuTrigger>
                    <MenuContent popover={{ placement: "bottom" }}>
                      <MenuItem href={route("projects.show", project.id)}>
                        <IconEye />
                        View
                      </MenuItem>
                      <MenuItem>
                        <IconGear /> Edit
                      </MenuItem>
                      <MenuItem>
                        {" "}
                        <IconTrash />
                        Delete
                      </MenuItem>
                    </MenuContent>
                  </Menu>
                </div>
                <Card.Description>status {project.status}</Card.Description>
              </Card.Header>

              <Card.Content>
                Client: {project.client?.name ?? "No Client"}
              </Card.Content>
            </Card>
          ))}

          <div className="col-span-full">
            <Pagination>
              <Pagination.List>
                <Pagination.Item
                  className={!previous.isActive ? "hidden" : ""}
                  segment="previous"
                  href={previous.url ?? ""}
                />
                {pages.map((page) =>
                  page.isPage ? (
                    <Pagination.Item
                      key={page.label}
                      isCurrent={page.isCurrent}
                      href={page.url ?? ""}
                    >
                      {page.label}
                    </Pagination.Item>
                  ) : (
                    <Pagination.Item segment="ellipsis" />
                  )
                )}
                <Pagination.Item
                  className={!next.isActive ? "hidden" : ""}
                  segment="next"
                  href={next.url ?? ""}
                />
              </Pagination.List>
            </Pagination>
          </div>
        </div>

        {/* {selectedProject && action === "update" && (
          // <FormProjectModal
          //   open={isOpen}
          //   onOpenChange={() => setIsOpen(false)}
          //   project={selectedProject}
          //   statuses={statuses}
          //   types={types}
          //   clients={clients}
          //   pageSettings={update}
          // />
        )} */}
        {/* {action === "create" && (
          <FormProjectModal
            open={isOpen}
            onOpenChange={() => setIsOpen(false)}
            statuses={statuses}
            types={types}
            clients={clients}
            pageSettings={create}
          />
        )} */}
      </Container>
    </>
  );
}

Index.layout = (page: any) => <AppLayout children={page} />;

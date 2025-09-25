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
  IconDotsVertical,
  IconEye,
  IconGear,
  IconHighlight,
  IconTrash,
} from "@intentui/icons";
import { Pagination } from "@/components/ui/pagination";
import { FormProjectModal } from "./form-project-modal";
import { useState } from "react";
import { Link } from "@/components/ui/link";
import { buttonStyles } from "@/components/ui/button";

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
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [action, setAction] = useState<"update" | "create" | null>(null);
  const { previous, next, pages } = usePaginator(projects);
  return (
    <>
      <Head title={title} />
      <Card>
        <Card.Header>
          <Card.Title>Projects</Card.Title>
          <div className="flex items-center justify-between">
            <Card.Description>Projects data management.</Card.Description>
            <Link
              onClick={() => (
                setIsOpen(true), setAction("create"), setSelectedProject(null)
              )}
              className={buttonStyles()}
            >
              Create Project
            </Link>
            {/* <FormProjectModal
              open={isOpen}
              onOpenChange={() => setIsOpen(false)}
              statuses={statuses}
              types={types}
              clients={clients}
            /> */}
          </div>
        </Card.Header>
        <Card.Content>
          <Table
            bleed
            className="[--gutter:var(--card-spacing)] sm:[--gutter:var(--card-spacing)]"
            aria-label="Users"
          >
            <Table.Header>
              <Table.Column className="w-0">#</Table.Column>
              <Table.Column isRowHeader>Client</Table.Column>
              <Table.Column>Manager</Table.Column>
              <Table.Column>Project Name</Table.Column>
              <Table.Column>Project Type</Table.Column>
              <Table.Column>Budget</Table.Column>
              <Table.Column>Status</Table.Column>
              <Table.Column>Start Date</Table.Column>
              <Table.Column>End Date</Table.Column>
              <Table.Column />
            </Table.Header>
            <Table.Body>
              {projects.data.length > 0 ? (
                projects.data.map((project: ProjectData, index: number) => (
                  <Table.Row key={project.id}>
                    <Table.Cell>{index + 1}</Table.Cell>
                    <Table.Cell>{project.client.name}</Table.Cell>
                    <Table.Cell>{project.manager.name}</Table.Cell>
                    <Table.Cell>{project.name}</Table.Cell>
                    <Table.Cell>{project.project_type}</Table.Cell>
                    <Table.Cell>Rp {project.budget}</Table.Cell>
                    <Table.Cell>{project.status}</Table.Cell>
                    <Table.Cell>{project.start_date}</Table.Cell>
                    <Table.Cell>{project.end_date}</Table.Cell>
                    <Table.Cell className="text-end last:pr-2.5">
                      <Menu>
                        <MenuTrigger>
                          <IconDotsVertical />
                        </MenuTrigger>
                        <MenuContent placement="left top">
                          <MenuItem
                            href={route("manage-user.show", [project.id])}
                          >
                            <IconEye /> View
                          </MenuItem>
                          <MenuItem
                            onAction={() => {
                              setSelectedProject(project);
                              setAction("update");
                              setIsOpen(true);
                            }}
                          >
                            <IconGear />
                            Update Project
                          </MenuItem>
                          <MenuSeparator />
                          <MenuItem isDanger>
                            <IconTrash /> Delete
                          </MenuItem>
                        </MenuContent>
                      </Menu>
                    </Table.Cell>
                  </Table.Row>
                ))
              ) : (
                <Table.Row>
                  <Table.Cell className="text-center">
                    No data available.
                  </Table.Cell>
                  <Table.Cell className="text-center">
                    No data available.
                  </Table.Cell>
                  <Table.Cell className="text-center">
                    No data available.
                  </Table.Cell>
                  <Table.Cell className="text-center">
                    No data available.
                  </Table.Cell>
                  <Table.Cell className="text-center">
                    No data available.
                  </Table.Cell>
                  <Table.Cell className="text-center">
                    No data available.
                  </Table.Cell>
                  <Table.Cell className="text-center">
                    No data available.
                  </Table.Cell>
                  <Table.Cell className="text-center">
                    No data available.
                  </Table.Cell>
                  <Table.Cell className="text-center">
                    No data available.
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </Card.Content>
        <Card.Footer>
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
        </Card.Footer>
      </Card>

      {selectedProject && action === "update" && (
        <FormProjectModal
          open={isOpen}
          onOpenChange={() => setIsOpen(false)}
          project={selectedProject}
          statuses={statuses}
          types={types}
          clients={clients}
          pageSettings={update}
        />
      )}
      {action === "create" && (
        <FormProjectModal
          open={isOpen}
          onOpenChange={() => setIsOpen(false)}
          statuses={statuses}
          types={types}
          clients={clients}
          pageSettings={create}
        />
      )}
    </>
  );
}

Index.layout = (page: any) => <AppLayout children={page} />;

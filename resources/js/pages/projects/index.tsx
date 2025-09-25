import AppLayout from "@/layouts/app-layout";
import SettingsLayout from "../settings/settings-layout";
import { ProjectData } from "@/types";
import { usePaginator } from "momentum-paginator";
import { Head } from "@inertiajs/react";
import { Card } from "@/components/ui/card";
import { Link } from "@/components/ui/link";
import { buttonStyles } from "@/components/ui/button";
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
  IconHighlight,
  IconTrash,
} from "@intentui/icons";
import { Pagination } from "@/components/ui/pagination";

const title = "Project";

interface Props {
  projects: Paginator<ProjectData>;
}

export default function Index({ projects }: Props) {
  const { previous, next, pages } = usePaginator(projects);
  return (
    <>
      <Head title={title} />
      <Card>
        <Card.Header>
          <Card.Title>Users</Card.Title>
          <div className="flex items-center justify-between">
            <Card.Description>
              Manage users with roles and permissions.
            </Card.Description>
            <Link className={buttonStyles()} href="/manage-user/create">
              Create Project
            </Link>
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
              <Table.Column>Budget</Table.Column>
              <Table.Column>Status</Table.Column>
              <Table.Column>Start Date</Table.Column>
              <Table.Column>End Date</Table.Column>
              <Table.Column />
            </Table.Header>
            <Table.Body>
              {projects.data.length > 0 ? (
                projects.data.map((user: ProjectData, index: number) => (
                  <Table.Row key={user.id}>
                    <Table.Cell>{index + 1}</Table.Cell>
                    <Table.Cell>{user.client.name}</Table.Cell>
                    <Table.Cell>{user.manager.name}</Table.Cell>
                    <Table.Cell>{user.name}</Table.Cell>
                    <Table.Cell>{user.budget}</Table.Cell>
                    <Table.Cell>{user.status}</Table.Cell>
                    <Table.Cell>{user.start_date}</Table.Cell>
                    <Table.Cell>{user.end_date}</Table.Cell>
                    <Table.Cell className="text-end last:pr-2.5">
                      <Menu>
                        <MenuTrigger>
                          <IconDotsVertical />
                        </MenuTrigger>
                        <MenuContent placement="left top">
                          <MenuItem href={route("manage-user.show", [user.id])}>
                            <IconEye /> View
                          </MenuItem>
                          <MenuItem>
                            <IconHighlight /> Edit
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
    </>
  );
}

Index.layout = (page: any) => <AppLayout children={page} />;

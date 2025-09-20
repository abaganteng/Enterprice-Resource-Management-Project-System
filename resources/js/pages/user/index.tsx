import AppLayout from "@/layouts/app-layout";
import { Head, router } from "@inertiajs/react";
import { Card } from "@/components/ui/card";
import SettingsLayout from "@/pages/settings/settings-layout";
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
import { ManageUserData, UserData } from "@/types";
import { usePaginator } from "momentum-paginator";
import { Pagination } from "@/components/ui/pagination";
import { Link } from "@/components/ui/link";
import { buttonStyles } from "@/components/ui/button";

const title = "Manage User";

interface Props {
  users: Paginator<UserData>;
  roles: ManageUserData[];
}

export default function Index({ users, roles }: Props) {
  const { previous, next, pages } = usePaginator(users);
  return (
    <>
      <Head title={title} />
      <h1 className="sr-only">{title}</h1>
      <Card>
        <Card.Header>
          <Card.Title>Users</Card.Title>
          <div className="flex items-center justify-between">
            <Card.Description>
              Manage users with roles and permissions.
            </Card.Description>
            <Link className={buttonStyles()} href="/manage-user/view">
              Create User
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
              <Table.Column isRowHeader>Email</Table.Column>
              <Table.Column>Name</Table.Column>
              <Table.Column>Role</Table.Column>
              <Table.Column />
            </Table.Header>
            <Table.Body>
              {users.data.length > 0 ? (
                users.data.map((user: UserData, index: number) => (
                  <Table.Row key={user.id}>
                    <Table.Cell>{index + 1}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>{user.name}</Table.Cell>
                    <Table.Cell>
                      {user.roles?.length > 0
                        ? user.roles?.map((role: any) => role.name).join(", ")
                        : "-"}
                    </Table.Cell>
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

Index.layout = (page: any) => (
  <AppLayout>
    <SettingsLayout children={page} />
  </AppLayout>
);

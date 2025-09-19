import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";
import { Card } from "@/components/ui/card";
import SettingsLayout from "@/pages/settings/settings-layout";
import { Table } from "@/components/ui/table";
import { Menu, MenuContent, MenuItem, MenuTrigger } from "@/components/ui/menu";
import { IconDotsVertical, IconEye } from "@intentui/icons";
import { RolesPermissionsData } from "@/types";
import { usePaginator } from "momentum-paginator";
import { Pagination } from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";

const title = "Manage User";

interface Props {
  rolesPermissions: Paginator<RolesPermissionsData>;
}

export default function Index({ rolesPermissions }: Props) {
  console.log(rolesPermissions);
  const { previous, next, pages } = usePaginator(rolesPermissions);
  return (
    <>
      <Head title={title} />
      <h1 className="sr-only">{title}</h1>
      <Card>
        <Card.Header>
          <Card.Title>Roles and Permission</Card.Title>
          <Card.Description>Manage roles, and permissions.</Card.Description>
        </Card.Header>
        <Card.Content>
          <Table
            bleed
            className="[--gutter:var(--card-spacing)] sm:[--gutter:var(--card-spacing)]"
            aria-label="Users"
          >
            <Table.Header>
              <Table.Column isRowHeader>Role</Table.Column>
              <Table.Column>Permission</Table.Column>
              <Table.Column />
            </Table.Header>
            <Table.Body>
              {rolesPermissions.data.length > 0 ? (
                rolesPermissions.data.map(
                  (rolePermission: RolesPermissionsData) => (
                    <Table.Row key={rolePermission.id}>
                      <Table.Cell>{rolePermission.name}</Table.Cell>
                      <Table.Cell className="capitalize">
                        {rolePermission.permissions?.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {rolePermission.permissions.map(
                              (permission: any) => (
                                <Badge key={permission.id} intent="info">
                                  {permission.name}
                                </Badge>
                              )
                            )}
                          </div>
                        ) : (
                          "-"
                        )}
                      </Table.Cell>
                      <Table.Cell className="text-end last:pr-2.5">
                        <Menu>
                          <MenuTrigger>
                            <IconDotsVertical />
                          </MenuTrigger>
                          <MenuContent placement="left top">
                            <MenuItem
                              href={route("manage-user.show", [
                                rolePermission.id,
                              ])}
                            >
                              <IconEye /> View
                            </MenuItem>
                          </MenuContent>
                        </Menu>
                      </Table.Cell>
                    </Table.Row>
                  )
                )
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

import AppLayout from "@/layouts/app-layout";
import { Head, usePage } from "@inertiajs/react";
import { Card } from "@/components/ui/card";
import SettingsLayout from "@/pages/settings/settings-layout";
import { Table } from "@/components/ui/table";
import { Menu, MenuContent, MenuItem, MenuTrigger } from "@/components/ui/menu";
import { IconDotsVertical, IconEye } from "@intentui/icons";
import { PermissionData, RolesPermissionsData } from "@/types";
import { Pagination } from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { useListData } from "react-stately";
import { useDragAndDrop } from "react-aria-components";
import { View as AssignPermission } from "../permission/view";
import { View as CreateRole } from "../role/view";

const title = "Manage User";

interface Props {
  // rolesPermissions: RolesPermissionsData[];
  permissions: PermissionData[];
}

interface PageProps {
  rolesPermissions: RolesPermissionsData[];
  permissions: PermissionData[];
  [key: string]: unknown;
}

export default function Index() {
  const { props } = usePage<PageProps>();
  const { rolesPermissions, permissions } = props;
  console.log(rolesPermissions);

  return (
    <>
      <Head title={title} />
      <h1 className="sr-only">{title}</h1>
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <Card.Header>
            <Card.Title>Roles and Permission</Card.Title>
            <Card.Description>Manage roles, and permissions.</Card.Description>
          </Card.Header>
          <Card.Content>
            <Table
              bleed
              className="[--gutter:var(--card-spacing)] sm:[--gutter:var(--card-spacing)]"
              aria-label="Role-Permission"
            >
              <Table.Header>
                <Table.Column isRowHeader>Role</Table.Column>
                <Table.Column>Permission</Table.Column>
              </Table.Header>
              <Table.Body>
                {rolesPermissions.map((item: RolesPermissionsData) => (
                  <Table.Row key={item.id}>
                    <Table.Cell>{item.name}</Table.Cell>
                    <Table.Cell>
                      {item.permissions.length > 0 ? (
                        item.permissions.map((permission: PermissionData) => (
                          <Badge key={permission.id} className="capitalize">
                            {permission.name}
                          </Badge>
                        ))
                      ) : (
                        <Badge intent="danger">Tidak ada permission</Badge>
                      )}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Card.Content>
          <Card.Footer></Card.Footer>
        </Card>
        <div className="rounded-lg border p-4">
          <Card>
            <Card.Header>
              <Card.Title>Permissions</Card.Title>
              <Card.Description>
                All permissions in this system
              </Card.Description>
            </Card.Header>
            <Card.Content>
              <Table allowResize aria-label="Permissions">
                <Table.Header>
                  <Table.Column>#</Table.Column>
                  <Table.Column isRowHeader>Name</Table.Column>
                </Table.Header>
                <Table.Body>
                  {permissions.map((item: PermissionData) => (
                    <Table.Row key={item.id}>
                      <Table.Cell>{item.id}</Table.Cell>
                      <Table.Cell>{item.name}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Card.Content>
          </Card>
        </div>
        <CreateRole />
        <AssignPermission permissions={permissions} roles={rolesPermissions} />
      </div>
    </>
  );
}

Index.layout = (page: any) => (
  <AppLayout>
    <SettingsLayout children={page} />
  </AppLayout>
);

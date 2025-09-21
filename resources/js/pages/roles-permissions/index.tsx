import AppLayout from "@/layouts/app-layout";
import { Head, usePage } from "@inertiajs/react";
import { Card } from "@/components/ui/card";
import SettingsLayout from "@/pages/settings/settings-layout";
import { Table } from "@/components/ui/table";
import { PermissionData, RoleDetailData, RolesPermissionsData } from "@/types";
import { Badge } from "@/components/ui/badge";
import { View as AssignPermission } from "../permission/view";
import { View as CreateRole } from "../role/view";
import {
  Menu,
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuTrigger,
} from "@/components/ui/menu";
import { IconDotsVertical } from "@intentui/icons";
import { UpdateRoleModal } from "./update-role-modal";
import { useState } from "react";
import { DeleteRoleModal } from "./delete-role-modal";
import { RevokePermissionModal } from "./revoke-permission-modal";

const title = "Manage User";

interface PageProps {
  rolesPermissions: RoleDetailData[];
  permissions: PermissionData[];
  [key: string]: unknown;
}

export default function Index() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<any>(null);
  const [action, setAction] = useState<"update" | "delete" | "revoke" | null>(
    null
  );
  const { props } = usePage<PageProps>();
  const { rolesPermissions, permissions } = props;

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
                <Table.Column />
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
                    <Table.Cell>
                      <Menu>
                        <MenuTrigger>
                          <IconDotsVertical />
                        </MenuTrigger>
                        <MenuContent placement="left top">
                          <MenuItem
                            key={`update-${item.id}`}
                            onAction={() => {
                              setSelectedRole(item);
                              setAction("update");
                              setIsOpen(true);
                            }}
                          >
                            Update Role
                          </MenuItem>
                          <MenuSeparator />
                          <MenuItem
                            key={`revoke-${item.id}`}
                            onAction={() => {
                              setSelectedRole(item);
                              setAction("revoke");
                              setIsOpen(true);
                            }}
                            isDanger
                          >
                            Revoke Permission
                          </MenuItem>
                          <MenuSeparator />
                          <MenuItem
                            key={`delete-${item.id}`}
                            onAction={() => {
                              setSelectedRole(item);
                              setAction("delete");
                              setIsOpen(true);
                            }}
                            isDanger
                          >
                            Delete Role
                          </MenuItem>
                          <MenuSeparator />
                        </MenuContent>
                      </Menu>
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

      {selectedRole && action === "update" && (
        <UpdateRoleModal
          open={isOpen}
          onOpenChange={() => setIsOpen(false)}
          role={selectedRole}
        />
      )}
      {selectedRole && action === "delete" && (
        <DeleteRoleModal
          open={isOpen}
          onOpenChange={() => setIsOpen(false)}
          role={selectedRole}
        />
      )}
      {selectedRole && action === "revoke" && (
        <RevokePermissionModal
          open={isOpen}
          onOpenChange={() => setIsOpen(false)}
          role={selectedRole}
        />
      )}
    </>
  );
}

Index.layout = (page: any) => (
  <AppLayout>
    <SettingsLayout children={page} />
  </AppLayout>
);

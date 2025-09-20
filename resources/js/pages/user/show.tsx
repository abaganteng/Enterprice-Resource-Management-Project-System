import AppLayout from "@/layouts/app-layout";
import { Head, useForm } from "@inertiajs/react";
import SettingsLayout from "@/pages/settings/settings-layout";
import { ManageUserDetailData } from "@/types";
import { Card } from "@/components/ui/card";
import { DescriptionList } from "@/components/ui/description-list";
import { Button } from "@/components/ui/button";
import { Note } from "@/components/ui/note";
import { Badge } from "@/components/ui/badge";
import { Menu, MenuContent, MenuItem } from "@/components/ui/menu";
import { IconChevronLgDown } from "@intentui/icons";
import { Modal } from "@/components/ui/modal";
import { useState } from "react";

const title = "Manage User";

interface Props {
  user: ManageUserDetailData;
}

export default function Show({ user }: Props) {
  const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
  const {
    delete: destroy,
    processing,
    reset,
    errors,
  } = useForm({
    user: user.id,
  });

  const deleteRole = () => {
    destroy(route("manage-role.revokeRole", { user: user.id }), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onFinish: () => reset(),
    });
  };

  const closeModal = () => {
    setConfirmingUserDeletion(false);
    reset();
  };

  return (
    <>
      <Head title={title} />
      <h1 className="sr-only">{title}</h1>
      <Card className="max-w-lg">
        <Card.Header>
          <Card.Title>Details from {user.name}</Card.Title>
          <Card.Description>
            <div className="flex items-center justify-between">
              <div>Detail information</div>
              <div>
                <Menu>
                  <Button intent="outline">
                    Action <IconChevronLgDown />
                  </Button>
                  <MenuContent popover={{ placement: "bottom" }}>
                    <MenuItem href={route("manage-user.update", user.id)}>
                      Edit user
                    </MenuItem>
                    <MenuItem
                      href={route("manage-role.assign-role", {
                        user: user.id,
                        role: user.roles?.[0]?.id,
                      })}
                    >
                      Manage Role
                    </MenuItem>
                  </MenuContent>
                </Menu>
              </div>
            </div>
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <DescriptionList>
            <DescriptionList.Term>User Name</DescriptionList.Term>
            <DescriptionList.Details>{user.name}</DescriptionList.Details>
            <DescriptionList.Term>Email</DescriptionList.Term>
            <DescriptionList.Details>{user.email}</DescriptionList.Details>
            <DescriptionList.Term>Permissions</DescriptionList.Term>
            <DescriptionList.Details className="flex flex-wrap gap-2">
              {user.roles[0]?.permissions?.map((permission: any) => (
                <Badge key={permission.id} className="capitalize">
                  {permission.name}
                </Badge>
              ))}
            </DescriptionList.Details>
            {user.roles[0] ? (
              <>
                <DescriptionList.Term>Role</DescriptionList.Term>
                <DescriptionList.Details>
                  {user.roles[0]?.name}
                </DescriptionList.Details>
              </>
            ) : (
              <Note className="my-3" intent="warning">
                This user does not have a role
              </Note>
            )}
          </DescriptionList>
        </Card.Content>
        <Card.Footer>
          <Modal
            onOpenChange={setConfirmingUserDeletion}
            isOpen={confirmingUserDeletion}
          >
            <Button
              onPress={() => setConfirmingUserDeletion(true)}
              intent="danger"
            >
              Revoke User
            </Button>
            <Modal.Content>
              <Modal.Header>
                <Modal.Title>Revoke User Access</Modal.Title>
                <Modal.Description>
                  Are you sure you want to revoke this role? Once revoked, the
                  user will no longer have access or permissions granted by this
                  role. This action cannot be undone.
                </Modal.Description>
              </Modal.Header>
              <Modal.Footer>
                <Modal.Close>Cancel</Modal.Close>
                <Button
                  intent="danger"
                  type="submit"
                  onPress={deleteRole}
                  isDisabled={processing}
                >
                  Continue
                </Button>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
        </Card.Footer>
      </Card>
    </>
  );
}

Show.layout = (page: any) => (
  <AppLayout>
    <SettingsLayout children={page} />
  </AppLayout>
);

import {
  Modal,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/text-field";
import { useForm } from "@inertiajs/react";
import { PermissionData, RoleData, RoleDetailData } from "@/types";
import { useEffect } from "react";
import { Checkbox, CheckboxGroup } from "@/components/ui/checkbox";
import { Description } from "@/components/ui/field";

type UpdateRoleModalProps = {
  role: RoleDetailData;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function RevokePermissionModal({
  role,
  open,
  onOpenChange,
}: UpdateRoleModalProps) {
  const { data, setData, reset, post } = useForm({
    id: role.id ?? "",
    permissions: [] as string[],
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route("manage-role.revoke", role.id), {
      preserveScroll: true,
      onSuccess: () => {
        reset();
        onOpenChange(false);
      },
    });
  };

  return (
    <Modal isOpen={open} onOpenChange={onOpenChange}>
      <ModalContent role="alertdialog">
        {({ close }) => (
          <>
            <ModalHeader>
              <ModalTitle>Revoke Role {role.name}</ModalTitle>
              <ModalDescription>
                Revoke permission in role {role.name}.
              </ModalDescription>
            </ModalHeader>
            <ModalBody>
              <CheckboxGroup
                label="Select permissions to revoke"
                value={data.permissions}
                onChange={(values) => setData("permissions", values)}
                className={"py-2"}
              >
                {role.permissions.length > 0 ? (
                  role.permissions.map((permission: PermissionData) => (
                    <Checkbox value={permission.name} className={"py-3"}>
                      {permission.name}
                    </Checkbox>
                  ))
                ) : (
                  <Checkbox value="Nothing">Nothing</Checkbox>
                )}
              </CheckboxGroup>

              <Description className="mt-2 flex h-10 flex-col gap-y-1 [&>strong]:font-medium [&>strong]:text-fg">
                {data.permissions.length > 0 ? (
                  <>
                    Selected values{" "}
                    <strong className="font-medium">
                      {data.permissions.join(", ")}
                    </strong>
                  </>
                ) : (
                  "No values selected"
                )}
              </Description>
            </ModalBody>
            <ModalFooter>
              <ModalClose>Cancel</ModalClose>
              <Button
                onPress={close}
                onClick={submit}
                type="submit"
                intent="danger"
              >
                Delete
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

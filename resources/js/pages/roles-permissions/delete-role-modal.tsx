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
import { RoleData } from "@/types";
import { useEffect } from "react";

type UpdateRoleModalProps = {
  role: RoleData;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function DeleteRoleModal({
  role,
  open,
  onOpenChange,
}: UpdateRoleModalProps) {
  const { reset, delete: destroy } = useForm({
    id: role.id ?? "",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    destroy(route("manage-role.delete", role.id), {
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
              <ModalTitle>Delete Role</ModalTitle>
              <ModalDescription>
                Deleting this role will remove it permanently. Any users
                assigned to this role will lose their access rights, and all
                associated permissions will be revoked. This action cannot be
                undone.
              </ModalDescription>
            </ModalHeader>
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

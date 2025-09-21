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

export function UpdateRoleModal({
  role,
  open,
  onOpenChange,
}: UpdateRoleModalProps) {
  const { data, setData, reset, errors, put } = useForm({
    id: role.id ?? "",
    name: role.name ?? "",
  });

  useEffect(() => {
    setData("name", role?.name ?? "");
  }, [role, open]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    put(route("manage-role.update", role.id), {
      preserveScroll: true,
      onSuccess: () => {
        reset();
        onOpenChange(false); // Tutup modal setelah sukses
      },
    });
  };

  return (
    <Modal isOpen={open} onOpenChange={onOpenChange}>
      <ModalContent>
        {({ close }) => (
          <>
            <ModalHeader>
              <ModalTitle>Update Role</ModalTitle>
              <ModalDescription>
                This action will change name role
              </ModalDescription>
            </ModalHeader>
            <ModalBody>
              <TextField
                autoFocus
                aria-label="Role Name"
                type="text"
                value={data.name}
                onChange={(v) => setData("name", v)}
                errorMessage={errors.name}
              />
            </ModalBody>
            <ModalFooter>
              <ModalClose>Cancel</ModalClose>
              <Button
                onPress={close}
                onClick={submit}
                type="submit"
                intent="primary"
              >
                Save changes
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

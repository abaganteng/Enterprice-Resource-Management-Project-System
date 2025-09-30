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
import { TextField } from "@/components/ui/text-field";
import { Button } from "@/components/ui/button";
import { useForm } from "@inertiajs/react";

interface CreateProjectModalProps {
  isOpen?: boolean;
  onClose: () => void;
}

export function CreateProjectModal({
  isOpen,
  onClose,
}: CreateProjectModalProps) {
  const { data, setData, reset, post, errors } = useForm({
    name: "",
  });

  const submit = async (): Promise<boolean> => {
    return new Promise((resolve) => {
      post(route("projects.store"), {
        onSuccess: () => {
          reset();
          resolve(true);
        },
        onError: () => {
          resolve(false);
        },
      });
    });
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent isBlurred>
        {({ close }) => (
          <>
            <ModalHeader>
              <ModalTitle>Create Project</ModalTitle>
              <ModalDescription>
                A Project represents teams, departments, or groups, each with
                its own Lists, workflows, and settings.
              </ModalDescription>
            </ModalHeader>

            <ModalBody>
              <TextField
                autoFocus
                aria-label="Name"
                label="Project Name"
                placeholder="Enter project name"
                value={data.name}
                onChange={(v) => setData("name", v)}
                isRequired
                errorMessage={errors.name}
              />
            </ModalBody>

            <ModalFooter>
              <ModalClose>Cancel</ModalClose>
              <Button
                onClick={async (e) => {
                  e.preventDefault();
                  const success = await submit();
                  if (success) close();
                }}
                intent="primary"
              >
                Continue
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

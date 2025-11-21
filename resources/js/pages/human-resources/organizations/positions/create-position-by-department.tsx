import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
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
import { DepartmentData } from "@/types";
import { useForm } from "@inertiajs/react";
import { IconPlus } from "@intentui/icons";

export function CreatePositionByDepartment({
  department,
}: {
  department: DepartmentData;
}) {
  const { data, setData, errors, post, reset } = useForm({
    name: "",
    department_id: department.id,
    // base_salary: "",
  });

  const handleSubmit = async (): Promise<boolean> => {
    return new Promise((resolve) => {
      post(route("organizations.department.position.store"), {
        preserveScroll: true,
        onSuccess: () => {
          reset();
          resolve(true);
        },
      });
    });
  };

  return (
    <Modal>
      <Button intent="outline">
        <IconPlus />
      </Button>
      <ModalContent>
        {({ close }) => (
          <>
            <ModalHeader>
              <ModalTitle>Create New Position</ModalTitle>
              <ModalDescription>
                Create a new position in this department.
              </ModalDescription>
            </ModalHeader>
            <ModalBody>
              <TextField
                autoFocus
                aria-label="Name"
                value={data.name}
                onChange={(v) => setData("name", v)}
                isRequired
                className={"pb-3"}
              >
                <Label>Position Name</Label>
                <Input type="text" placeholder="Enter position name" />
              </TextField>
            </ModalBody>
            <ModalFooter>
              <ModalClose>Cancel</ModalClose>
              <Button
                onPress={close}
                onClick={handleSubmit}
                onKeyDown={async (e) => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }
                }}
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

import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
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
      <Modal.Content>
        {({ close }) => (
          <>
            <Modal.Header>
              <Modal.Title>Create New Position</Modal.Title>
              <Modal.Description>
                Create a new position in this department.
              </Modal.Description>
            </Modal.Header>
            <Modal.Body>
              <TextField
                autoFocus
                aria-label="Name"
                label="Position Name"
                placeholder="Enter position name"
                value={data.name}
                onChange={(v) => setData("name", v)}
                errorMessage={errors.name}
                isRequired
              />
              {/* <TextField
                aria-label="Base Salary"
                label="Base Salary"
                placeholder="Enter base salary"
                value={data.base_salary}
                onChange={(v) => setData("base_salary", v)}
                errorMessage={errors.base_salary}
                isRequired
              /> */}
            </Modal.Body>
            <Modal.Footer>
              <Modal.Close>Cancel</Modal.Close>
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
            </Modal.Footer>
          </>
        )}
      </Modal.Content>
    </Modal>
  );
}

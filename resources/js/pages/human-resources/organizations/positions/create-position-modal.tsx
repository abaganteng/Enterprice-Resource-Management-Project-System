import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/field";
import { Modal } from "@/components/ui/modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { TextField } from "@/components/ui/text-field";
import { DepartmentData } from "@/types";
import { useForm } from "@inertiajs/react";
import { IconPlus } from "@intentui/icons";

interface Props {
  departments: DepartmentData[];
}

export function CreatePositionModal({ departments }: Props) {
  const { data, setData, post, errors } = useForm({
    name: "",
    department_id: 0,
    base_salary: 0,
  });

  const handleSubmit = async (): Promise<boolean> => {
    return new Promise((resolve) => {
      post(route("organizations.position.store"), {
        preserveScroll: true,
        onSuccess: () => {
          resolve(true);
        },
      });
    });
  };

  return (
    <>
      <Modal>
        <Button>
          <IconPlus /> Position
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
                <Select
                  aria-label="Department"
                  placeholder="Select department"
                  value={data.department_id}
                  onChange={(v) => setData("department_id", Number(v))}
                >
                  <SelectTrigger />
                  <SelectContent
                    items={departments.map((department: DepartmentData) => ({
                      id: department.id || "",
                      name: department.name || "",
                    }))}
                  >
                    {(item) => (
                      <SelectItem id={item.id} textValue={item.name}>
                        {item.name}
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
                <TextField
                  label="Salary"
                  value={data.base_salary?.toString() || ""}
                  onChange={(v) => setData("base_salary", Number(v))}
                >
                  <Input type="number" placeholder="Enter salary" />
                </TextField>
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
    </>
  );
}

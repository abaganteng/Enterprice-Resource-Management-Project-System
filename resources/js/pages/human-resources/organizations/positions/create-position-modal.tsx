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
          <IconPlus /> Add Position
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
                >
                  <Label>Position Name</Label>
                  <Input type="text" placeholder="Enter position name" />
                </TextField>
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
                  value={data.base_salary?.toString() || ""}
                  onChange={(v) => setData("base_salary", Number(v))}
                >
                  <Label>Salary</Label>
                  <Input type="number" placeholder="Enter salary" />
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
    </>
  );
}

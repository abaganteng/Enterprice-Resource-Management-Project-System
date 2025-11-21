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
import { PositionData } from "@/types";
import { useForm } from "@inertiajs/react";
import { IconEyeDropper } from "@intentui/icons";
import { Pencil } from "lucide-react";

export function EditPositionByDepartment({
  position,
}: {
  position: PositionData;
}) {
  const { data, setData, put, processing, errors } = useForm({
    name: position.name,
    base_salary: position.base_salary,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(
      route("organizations.department.position.update", {
        position: position.id,
      }),
    );
  };

  return (
    <Modal>
      <Button intent="plain">
        <IconEyeDropper />
      </Button>
      <ModalContent>
        {({ close }) => (
          <>
            <ModalHeader>
              <ModalTitle>Edit Position</ModalTitle>
              <ModalDescription>
                Change how this position will appear across the dashboard.
              </ModalDescription>
            </ModalHeader>
            <ModalBody>
              <TextField
                aria-label="Name"
                value={data.name ?? ""}
                onChange={(v) => setData("name", v)}
                className={"pb-3"}
              >
                <Label>Position Name</Label>
                <Input type="text" placeholder="Enter position name" />
              </TextField>
              <TextField
                aria-label="Base Salary ($)"
                value={
                  data.base_salary != null ? `$ ${data.base_salary}` : undefined
                }
                onChange={(v) => {
                  const cleaned = v.replace(/[^0-9.-]+/g, "");
                  const parsed = cleaned === "" ? null : Number(cleaned);
                  setData("base_salary", Number.isNaN(parsed) ? null : parsed);
                }}
              >
                <Label>Base Salary</Label>
                <Input type="number" placeholder="Enter base salary" />
              </TextField>
            </ModalBody>
            <ModalFooter>
              <ModalClose>Cancel</ModalClose>
              <Button onPress={close} onClick={handleSubmit} intent="primary">
                Save changes
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

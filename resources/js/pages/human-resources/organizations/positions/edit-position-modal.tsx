import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { TextField } from "@/components/ui/text-field";
import { DepartmentData, PositionData } from "@/types";
import { useForm } from "@inertiajs/react";
import { Pencil } from "lucide-react";

interface EditPositionModalProps {
  position: PositionData;
  departments: DepartmentData[];
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

export function EditPositionModal({
  position,
  departments,
  open,
  onOpenChange,
}: EditPositionModalProps) {
  const { data, setData, put, processing, errors } = useForm({
    name: position.name,
    department_id: position.department?.id ?? null,
    base_salary: position.base_salary,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(route("organizations.position.update", [position.id]), {
      preserveScroll: true,
      onSuccess: () => {
        close();
      },
    });
  };

  return (
    <>
      <Modal isOpen={open} onOpenChange={onOpenChange}>
        <Modal.Content>
          {({ close }) => (
            <>
              <Modal.Header>
                <Modal.Title>Edit Position</Modal.Title>
                <Modal.Description>
                  Change how this position will appear across the dashboard.
                </Modal.Description>
              </Modal.Header>
              <Modal.Body>
                <TextField
                  aria-label="Name"
                  value={data.name ?? ""}
                  onChange={(v) => setData("name", v)}
                  className={"pb-3"}
                >
                  <Label>Position Name</Label>
                  <Input type="text" placeholder="Enter position name" />
                </TextField>
                <Select
                  aria-label="Department"
                  placeholder="Select department"
                  selectedKey={data.department_id}
                  onChange={(v) => setData("department_id", Number(v))}
                >
                  <SelectTrigger />
                  <SelectContent items={departments}>
                    {(item) => (
                      <SelectItem key={item.id}>{item.name}</SelectItem>
                    )}
                  </SelectContent>
                </Select>
                <TextField
                  aria-label="Base Salary ($)"
                  value={
                    data.base_salary != null
                      ? `$ ${data.base_salary}`
                      : undefined
                  }
                  onChange={(v) => {
                    const cleaned = v.replace(/[^0-9.-]+/g, "");
                    const parsed = cleaned === "" ? null : Number(cleaned);
                    setData(
                      "base_salary",
                      Number.isNaN(parsed) ? null : parsed,
                    );
                  }}
                  className={"pb-3"}
                >
                  <Label>Base Salary</Label>
                  <Input type="number" placeholder="Enter base salary" />
                </TextField>
              </Modal.Body>
              <Modal.Footer>
                <Modal.Close>Cancel</Modal.Close>
                <Button onPress={close} onClick={handleSubmit} intent="primary">
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

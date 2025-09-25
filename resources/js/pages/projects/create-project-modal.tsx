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
import { Textarea } from "@/components/ui/textarea";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import { DateValue } from "@internationalized/date";

interface ProjectStatusOption {
  id: string;
  name: string;
}

interface CreateProjectModalProps {
  statuses: ProjectStatusOption[];
}
type RangeValue<T> = { start: T; end: T } | null;

export function CreateProjectModal({ statuses }: CreateProjectModalProps) {
  const [dateRange, setDateRange] = useState<RangeValue<DateValue>>(null);
  const { data, setData, reset, post, errors } = useForm({
    name: "",
    budget: "",
    description: "",
    status_id: "",
    start_date: "",
    end_date: "",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    if (dateRange?.start && dateRange?.end) {
      setData("start_date", dateRange.start.toString());
      setData("end_date", dateRange.end.toString());
    }

    post(route("projects.store"));
  };

  return (
    <Modal>
      <Button intent="outline">Create Project</Button>
      <ModalContent isBlurred>
        {({ close }) => (
          <>
            <ModalHeader>
              <ModalTitle>Create Project</ModalTitle>
              <ModalDescription>Create a new project here.</ModalDescription>
            </ModalHeader>

            <ModalBody>
              {/* Section 1: Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <TextField
                  autoFocus
                  aria-label="Name"
                  placeholder="Enter project name"
                  value={data.name}
                  onChange={(v) => setData("name", v)}
                  errorMessage={errors.name}
                />
                <TextField
                  aria-label="Budget"
                  placeholder="Enter project budget"
                  value={data.budget}
                  onChange={(v) => setData("budget", v)}
                  errorMessage={errors.budget}
                />
              </div>

              <Textarea
                placeholder="Description project"
                aria-label="Description"
                className="mt-3"
                value={data.description}
                onChange={(v) => setData("description", v)}
                errorMessage={errors.description}
              />

              {/* Separator Horizontal */}
              <Separator orientation="horizontal" className="my-4" />

              {/* Date Range full width */}
              <DateRangePicker
                isRequired
                label="Date Range Project"
                value={dateRange}
                onChange={(range) => {
                  setDateRange(range);
                  setData("start_date", range?.start?.toString() ?? "");
                  setData("end_date", range?.end?.toString() ?? "");
                }}
              />
              <Separator orientation="horizontal" className="my-4" />
              {/* Select Software */}
              <Select
                aria-label="Design software"
                placeholder="Select Status"
                label="Project Status"
                selectedKey={data.status_id}
                onSelectionChange={(v) => setData("status_id", v as string)}
              >
                <SelectTrigger />
                <SelectContent items={statuses}>
                  {(item) => (
                    <SelectItem
                      key={item.id}
                      id={item.id}
                      textValue={item.name}
                    >
                      {item.name}
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </ModalBody>

            <ModalFooter>
              <ModalClose>Cancel</ModalClose>
              <Button onPress={close} onClick={submit} intent="primary">
                Create Project
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

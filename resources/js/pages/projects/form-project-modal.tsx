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
import { useEffect, useState } from "react";
import { DateValue, parseDate } from "@internationalized/date";
import { ManageUserData } from "@/types";
import { Dialog } from "@/components/ui/dialog";
import { Autocomplete, useFilter, Popover } from "react-aria-components";
import { SearchField } from "@/components/ui/search-field";
import { ListBox } from "@/components/ui/list-box";
import { DatePicker } from "@/components/ui/date-picker";

interface ProjectStatusOption {
  id: string;
  name: string;
}

interface CreateProjectModalProps {
  statuses: ProjectStatusOption[];
  types: ProjectStatusOption[];
  clients?: ManageUserData[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project?: any;
  pageSettings?: {
    title: string;
    description: string;
    buttonText: string;
    method: "post" | "put";
    url: string;
  };
}
type RangeValue<T> = { start: T; end: T } | null;

export function FormProjectModal({
  statuses,
  types,
  clients,
  open,
  onOpenChange,
  project,
  pageSettings,
}: CreateProjectModalProps) {
  const { contains } = useFilter({ sensitivity: "base" });
  const [dateRange, setDateRange] = useState<RangeValue<DateValue>>(null);
  const { data, setData, reset, post, errors } = useForm({
    name: project?.name ?? "",
    project_type: project?.project_type ?? "",
    client_id: project?.client?.id ?? "",
    budget: project?.budget ?? "0",
    description: project?.description ?? "",
    start_date: project?.start_date ?? "",
    end_date: project?.end_date ?? "",
    _method: pageSettings?.method,
  });

  const submit = async (): Promise<boolean> => {
    if (dateRange?.start && dateRange?.end) {
      setData("start_date", dateRange.start.toString());
      setData("end_date", dateRange.end.toString());
    }

    return new Promise((resolve) => {
      post(pageSettings?.url || "", {
        onSuccess: () => {
          reset();
          resolve(true); // sukses → true
        },
        onError: () => {
          resolve(false); // gagal (validasi error) → false
        },
      });
    });
  };

  useEffect(() => {
    if (project) {
      setDateRange({
        start: parseDate(project.start_date),
        end: parseDate(project.end_date),
      });
      setData("start_date", project.start_date);
      setData("end_date", project.end_date);
    }
  }, [project]);

  return (
    <Modal isOpen={open} onOpenChange={onOpenChange}>
      <ModalContent isBlurred>
        {({ close }) => (
          <>
            <ModalHeader>
              <ModalTitle>{pageSettings?.title}</ModalTitle>
              <ModalDescription>{pageSettings?.description}</ModalDescription>
            </ModalHeader>

            <ModalBody>
              {/* Section 1: Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <TextField
                  autoFocus
                  aria-label="Name"
                  label="Project Name"
                  placeholder="Enter project name"
                  value={data.name}
                  onChange={(v) => setData("name", v)}
                  isRequired
                  errorMessage={errors.name}
                  isReadOnly={project && project.status !== "draft"}
                />
                <TextField
                  aria-label="Budget"
                  label="Budget"
                  placeholder="Enter project budget"
                  value={data.budget}
                  onChange={(v) => setData("budget", v)}
                  errorMessage={errors.budget}
                />
              </div>
              <Textarea
                placeholder="Description project"
                label="Project Description"
                aria-label="Description"
                className="mt-3"
                value={data.description}
                onChange={(v) => setData("description", v)}
                errorMessage={errors.description}
              />

              {/* Separator Horizontal */}
              <Separator orientation="horizontal" className="my-4" />
              {project?.project_type ? (
                <TextField
                  isReadOnly
                  label="Project Type"
                  value={project.project_type}
                  className="w-full"
                />
              ) : (
                <Select
                  aria-label="Select Project Type"
                  placeholder="Select Type Project"
                  label="Project Type"
                  selectedKey={data.project_type}
                  onSelectionChange={(v) =>
                    setData("project_type", v as string)
                  }
                  className="w-full"
                  isRequired
                  errorMessage={errors.project_type}
                >
                  <SelectTrigger />
                  <SelectContent items={types}>
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
              )}
              {data.project_type === "external" && (
                <>
                  <Separator orientation="horizontal" className="my-4" />

                  <Select
                    label="Choose a client"
                    placeholder="Select Client"
                    selectedKey={data.client_id}
                    onSelectionChange={(v) => setData("client_id", v as string)}
                    isRequired
                    errorMessage={errors.client_id}
                  >
                    <SelectTrigger />
                    <Popover className="entering:fade-in exiting:fade-out flex max-h-80 w-(--trigger-width) entering:animate-in exiting:animate-out flex-col overflow-hidden rounded-lg border bg-overlay">
                      <Dialog aria-label="Clients">
                        <Autocomplete filter={contains}>
                          <div className="border-b bg-muted p-2">
                            <SearchField
                              className="rounded-lg bg-bg"
                              autoFocus
                            />
                          </div>
                          <ListBox
                            className="max-h-[inherit] min-w-[inherit] border-0 shadow-none"
                            items={clients}
                          >
                            {(item) => (
                              <SelectItem key={item.id}>{item.name}</SelectItem>
                            )}
                          </ListBox>
                        </Autocomplete>
                      </Dialog>
                    </Popover>
                  </Select>
                </>
              )}

              <Separator orientation="horizontal" className="my-4" />

              {/* Section 2: Timeline */}
              {project && project.status !== "draft" ? (
                <DatePicker
                  aria-label="End Date"
                  label="End Date"
                  value={data.end_date ? parseDate(data.end_date) : null}
                  onChange={(date) =>
                    setData("end_date", date?.toString() ?? "")
                  }
                  errorMessage={
                    errors.start_date
                      ? errors.start_date
                      : errors.end_date
                      ? errors.end_date
                      : undefined
                  }
                />
              ) : (
                <DateRangePicker
                  isRequired
                  label="Date Range Project"
                  value={dateRange}
                  onChange={(range) => {
                    setDateRange(range);
                    setData("start_date", range?.start?.toString() ?? "");
                    setData("end_date", range?.end?.toString() ?? "");
                  }}
                  errorMessage={errors.start_date || errors.end_date}
                />
              )}

              {/* Separator Horizontal */}
              <Separator orientation="horizontal" className="my-4" />
            </ModalBody>

            <ModalFooter>
              <ModalClose>Cancel</ModalClose>
              <Button
                onClick={async (e) => {
                  e.preventDefault();
                  const success = await submit(); // submit return true/false

                  if (success) {
                    close(); // tutup modal hanya kalau sukses
                  }
                }}
                intent="primary"
              >
                {pageSettings?.buttonText}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

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
import { IconCircleInfo } from "@intentui/icons";

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
    budget: project?.budget ?? "",
    description: project?.description ?? "",
    status_id: project?.status ?? "",
    start_date: project?.start_date ?? "",
    end_date: project?.end_date ?? "",
    _method: pageSettings?.method,
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    if (dateRange?.start && dateRange?.end) {
      setData("start_date", dateRange.start.toString());
      setData("end_date", dateRange.end.toString());
    }

    post(pageSettings?.url || "", {});
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
                  errorMessage={errors.name}
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

              {/* Section 2: Timeline */}
              <DateRangePicker
                isRequired
                label="Date Range Project"
                value={dateRange}
                onChange={(range) => {
                  // kalau project sudah punya start_date (immutable), jangan update start
                  if (project?.start_date) {
                    const fixedStart = parseDate(project.start_date);
                    setDateRange({
                      start: fixedStart,
                      end: range?.end ?? fixedStart,
                    });
                    setData("start_date", project.start_date); // tetap pakai dari backend
                    setData(
                      "end_date",
                      range?.end?.toString() ?? project.end_date
                    );
                  } else {
                    // create mode → bebas isi start & end
                    setDateRange(range);
                    setData("start_date", range?.start?.toString() ?? "");
                    setData("end_date", range?.end?.toString() ?? "");
                  }
                }}
              />

              {/* Separator Horizontal */}
              <Separator orientation="horizontal" className="my-4" />

              <div className="flex flex-col md:flex-row md:items-center md:gap-4">
                {/* Select kiri */}
                <div className="w-full md:flex-1">
                  <Select
                    aria-label="Select Project Status"
                    placeholder="Select Status"
                    label="Project Status"
                    selectedKey={data.status_id}
                    onSelectionChange={(v) => setData("status_id", v as string)}
                    className="w-full"
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
                </div>

                {/* Separator (hanya tampil di md ke atas) */}
                <div className="hidden md:flex md:items-center md:px-2">
                  <Separator
                    orientation="vertical"
                    className="h-8"
                    aria-hidden="true"
                  />
                </div>

                {/* Select kanan */}
                <div className="w-full md:flex-1">
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
                      placeholder="Select Type"
                      label="Project Type"
                      selectedKey={data.project_type}
                      onSelectionChange={(v) =>
                        setData("project_type", v as string)
                      }
                      className="w-full"
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
                </div>
              </div>

              {/* Section 4: Client (conditional) */}
              {data.project_type === "external" && (
                <>
                  <Separator orientation="horizontal" className="my-4" />

                  <Select
                    label="Choose a client"
                    placeholder="Select Client"
                    selectedKey={data.client_id}
                    onSelectionChange={(v) => setData("client_id", v as string)}
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
            </ModalBody>

            <ModalFooter>
              <ModalClose>Cancel</ModalClose>
              <Button onPress={close} onClick={submit} intent="primary">
                {pageSettings?.buttonText}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

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
import { Separator } from "@/components/ui/separator";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { DateValue, parseDate } from "@internationalized/date";
import { DatePicker } from "@/components/ui/date-picker";

interface ProjectPhaseStatusOption {
  id: string;
  name: string;
}

interface CreateProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project_phase?: any;
  project?: number | null;
  pageSettings?: {
    title: string;
    description: string;
    buttonText: string;
    method: "post" | "put";
    url: string;
  };
  start_date?: any;
  end_date?: any;
}
type RangeValue<T> = { start: T; end: T } | null;

export function FormPhaseModal({
  open,
  onOpenChange,
  project_phase,
  pageSettings,
  start_date,
  end_date,
  project,
}: CreateProjectModalProps) {
  console.log(start_date, end_date);
  const [dateRange, setDateRange] = useState<RangeValue<DateValue>>(null);
  const { data, setData, reset, post, errors } = useForm({
    name: project_phase?.name ?? "",
    project_id: project ?? "",
    description: project_phase?.description ?? "",
    start_date: project_phase?.start_date ?? "",
    end_date: project_phase?.end_date ?? "",
    status: project_phase?.status ?? "",
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
    if (project_phase) {
      setDateRange({
        start: parseDate(project_phase.start_date),
        end: parseDate(project_phase.end_date),
      });
      setData("start_date", project_phase.start_date);
      setData("end_date", project_phase.end_date);
    }
  }, [project_phase]);

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
                  label="Phase Name"
                  placeholder="Enter phase name"
                  value={data.name}
                  onChange={(v) => setData("name", v)}
                  isRequired
                  errorMessage={errors.name}
                  isReadOnly={project_phase && project_phase.status !== "draft"}
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
              {project_phase && project_phase.status !== "draft" ? (
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
                  minValue={parseDate(start_date)}
                  maxValue={parseDate(end_date)}
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

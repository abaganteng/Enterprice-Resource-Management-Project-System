import { Button } from "@/components/ui/button";
import { router, useForm } from "@inertiajs/react";
import { IconEnter } from "@intentui/icons";
import { useEffect, useRef, useState } from "react";
import { Input } from "react-aria-components";

export function NewTaskForm({
  project,
  group,
  status,
  onCancel,
  onSuccess,
}: any) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const { data, setData, reset, processing, post } = useForm<{
    name: string;
    project_id: number;
    project_group_id: number | string;
    status_id: number;
  }>({
    name: "",
    project_id: project?.id,
    project_group_id: group?.id ?? group,
    status_id: status?.id,
  });

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = () => {
    if (!data.name.trim()) return;

    post(
      route("projects.groups.statuses.tasks.create", {
        project: project.id,
        status: status.id,
      }),
      {
        preserveScroll: true,
        onSuccess: () => {
          reset("name");
          onSuccess?.();
          window.location.reload();
        },
      },
    );
  };

  return (
    <div className="flex items-center gap-2 w-auto rounded-md border bg-foreground px-2 py-1">
      <Input
        ref={inputRef}
        placeholder="Task Name"
        value={data.name}
        onChange={(e: any) => setData("name", e.target.value)}
        onKeyDown={(e: any) => {
          if (e.key === "Enter") handleSubmit();
          if (e.key === "Escape") onCancel?.();
        }}
        className="flex-1"
      />

      <Button intent="outline" onClick={onCancel} isDisabled={submitting}>
        Cancel
      </Button>

      <Button onClick={handleSubmit} isDisabled={submitting || processing}>
        Save <IconEnter />
      </Button>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { useForm } from "@inertiajs/react";
import { IconEnter } from "@intentui/icons";
import { useEffect, useRef } from "react";
import { Input } from "react-aria-components";

export function NewTaskForm({
  project,
  group,
  status,
  onCancel,
  onSuccess,
}: any) {
  console.log(group);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const form = useForm<{
    name: string;
    project_id: number;
    project_group_id: number;
    status_id: number;
  }>({
    name: "",
    project_id: project.id,
    project_group_id: group,
    status_id: status.id,
  });

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  const handleSubmit = () => {
    form.post(
      route("projects.groups.statuses.tasks.create", {
        project: project.id,
        status: status.id,
      }),
      {
        preserveScroll: true,
        onSuccess: () => {
          form.reset();
          onSuccess?.();
        },
      }
    );
  };

  return (
    <div className="flex items-center gap-2 w-auto rounded-md border bg-foreground px-2 py-1">
      <Input
        ref={inputRef}
        placeholder="Task Name"
        value={form.data.name}
        onChange={(e) => form.setData("name", e.target.value)}
        className="flex-1"
      />

      <Button intent="outline" onClick={onCancel}>
        Cancel
      </Button>
      <Button onClick={handleSubmit} isDisabled={form.processing}>
        Save <IconEnter />
      </Button>
    </div>
  );
}

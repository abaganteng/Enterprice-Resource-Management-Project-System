import { Button } from "@/components/ui/button";
import { router, useForm } from "@inertiajs/react";
import { IconEnter } from "@intentui/icons";
import { useEffect, useRef, useState } from "react";
import { Input } from "react-aria-components";

export function NewSubtaskForm({
  project,
  group,
  status,
  parentId,
  level = 0,
  onCancel,
  onSuccess,
}: any) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // 🧱 Data form sekarang menyertakan parent_id
  const { data, setData, reset, processing, post } = useForm<{
    name: string;
    project_id: number;
    project_group_id: number | string;
    status_id: number;
    parent_id: number | string;
  }>({
    name: "",
    project_id: project?.id,
    project_group_id: group?.id ?? group,
    status_id: status?.id,
    parent_id: parentId, // 👈 penting
  });

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = () => {
    if (!data.name.trim()) return;

    setSubmitting(true);

    // ⚙️ Pastikan route kamu sudah benar di backend (kamu bilang akan sesuaikan sendiri)
    post(
      route("projects.groups.statuses.tasks.subtask.create", {
        project: project.id,
        projectGroup: group?.id ?? group,
        status: status.id,
        task: parentId,
      }),
      {
        preserveScroll: true,
        onSuccess: () => {
          reset("name");
          onSuccess?.();
          setSubmitting(false);
          window.location.reload();
        },
        onError: () => setSubmitting(false),
      },
    );
  };

  return (
    <div
      className="flex items-center gap-2 w-full rounded-md border bg-background px-2 py-1"
      style={{ marginLeft: `${(level ?? 0) * 16}px` }} // ⬅️ ikut level
    >
      <Input
        ref={inputRef}
        placeholder="Subtask name"
        value={data.name}
        onChange={(e: any) => setData("name", e.target.value)}
        onKeyDown={(e: any) => {
          if (e.key === "Enter") handleSubmit();
          if (e.key === "Escape") onCancel?.();
        }}
        className="flex-1 bg-transparent border-none outline-none focus:ring-0"
      />

      <Button
        intent="outline"
        size="sm"
        onClick={onCancel}
        isDisabled={submitting}
      >
        Cancel
      </Button>

      <Button
        size="sm"
        onClick={handleSubmit}
        isDisabled={submitting || processing}
      >
        Save
        <IconEnter className="ml-1 size-3" />
      </Button>
    </div>
  );
}

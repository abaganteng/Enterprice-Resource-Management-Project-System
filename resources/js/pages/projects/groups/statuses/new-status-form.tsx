import { Button } from "@/components/ui/button";
import { ColorPicker } from "@/components/ui/color-picker";
import { useForm } from "@inertiajs/react";
import { IconEnter } from "@intentui/icons";
import { useEffect, useRef, useState } from "react";
import { Input, parseColor } from "react-aria-components";

export function NewStatusForm({ project, group, onCancel, onSuccess }: any) {
  console.log(project, group);
  const [colorValue, setColorValue] = useState<any>(() =>
    parseColor("#3B82F6")
  );
  const inputRef = useRef<HTMLInputElement | null>(null);
  const form = useForm<{
    name: string;
    color: string;
    project_group_id: number;
  }>({
    name: "",
    color: "#3B82F6",
    project_group_id: group.id,
  });

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  const handleSubmit = () => {
    form.post(
      route("projects.groups.statuses.create", {
        project: project.id,
        group: group.id,
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
    <div className="flex items-center gap-2 w-auto rounded-md border  bg-foreground px-2 py-1">
      <ColorPicker
        value={colorValue}
        onChange={(c) => {
          setColorValue(c);
          form.setData("color", c?.toString?.());
        }}
      />
      <Input
        ref={inputRef}
        placeholder="New Status"
        value={form.data.name}
        onChange={(e) => form.setData("name", e.target.value)}
        className="flex-1"
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSubmit();
        }}
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

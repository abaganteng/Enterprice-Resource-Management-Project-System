import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import { router, useForm } from "@inertiajs/react";
import { IconCheck, IconPin2 } from "@intentui/icons";

interface Props {
  projectId: any;
  groupId: any;
  statusId: any;
  task: any;
}

export default function TaskPriority({
  projectId,
  groupId,
  statusId,
  task,
}: Props) {
  const { data, setData } = useForm({
    priority: task?.priority ?? "",
  });

  const handlePriorityChange = (value: string) => {
    setData("priority", value);

    router.put(
      route("projects.groups.statuses.tasks.priority", {
        project: projectId,
        projectGroup: groupId,
        status: statusId,
        task: task.id,
      }),
      { priority: value },
      {
        preserveScroll: true,
        onSuccess: () => {
          console.log("✅ Priority updated successfully:", value);
        },
        onError: (e) => {
          console.error("❌ Failed to update priority", e);
        },
      },
    );
  };

  // Helper untuk menentukan apakah item sedang aktif
  const isSelected = (id: string) => data.priority === id;

  return (
    <Select
      aria-label="Priority"
      placeholder="Select a priority"
      value={data.priority}
      onChange={(key) => handlePriorityChange(String(key))}
    >
      <SelectTrigger className="min-w-[120px]" />

      <SelectContent>
        <SelectItem id="urgent" textValue="Urgent">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <IconPin2 className="fill-red-500" />
              <SelectLabel>Urgent</SelectLabel>
            </div>
            {isSelected("urgent") && (
              <IconCheck className="size-4 text-green-500" />
            )}
          </div>
        </SelectItem>

        <SelectItem id="high" textValue="High">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <IconPin2 className="fill-yellow-500" />
              <SelectLabel>High</SelectLabel>
            </div>
            {isSelected("high") && (
              <IconCheck className="size-4 text-green-500" />
            )}
          </div>
        </SelectItem>

        <SelectItem id="normal" textValue="Normal">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <IconPin2 className="fill-blue-500" />
              <SelectLabel>Normal</SelectLabel>
            </div>
            {isSelected("normal") && (
              <IconCheck className="size-4 text-green-500" />
            )}
          </div>
        </SelectItem>

        <SelectItem id="low" textValue="Low">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <IconPin2 className="fill-gray-500" />
              <SelectLabel>Low</SelectLabel>
            </div>
            {isSelected("low") && (
              <IconCheck className="size-4 text-green-500" />
            )}
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}

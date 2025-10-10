import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { parseDate } from "@internationalized/date";
import { useState } from "react";
import { router } from "@inertiajs/react";
import { IconCalendar } from "@intentui/icons";
import { Label } from "@/components/ui/field";

export default function TaskDueDate({
  projectId,
  groupId,
  statusId,
  task,
}: any) {
  const [dueDate, setDueDate] = useState<string | null>(null);

  const handleSaveTaskDates = (
    taskId: number | string,
    dueDate: string | null,
  ) => {
    if (!taskId) return console.warn("Missing task ID");
    if (!dueDate) return console.warn("No due date selected");

    router.put(
      route("projects.groups.statuses.tasks.date", {
        project: projectId,
        projectGroup: groupId,
        status: statusId,
        task: taskId,
      }),
      { due_date: dueDate },
      {
        preserveScroll: true,
        onSuccess: () => {
          window.location.reload();
        },
      },
    );
  };

  function formatDisplayDate(dateStr: string) {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <Popover>
      <PopoverTrigger>
        <button
          type="button"
          className="flex items-center gap-2 p-1 rounded-md hover:bg-muted transition-colors"
        >
          {task?.due_date ? (
            <Label className="text-xs text-foreground group-hover:text-foreground/90 transition-colors">
              {formatDisplayDate(task.due_date)}
            </Label>
          ) : (
            <Label className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
              Select date
            </Label>
          )}

          <IconCalendar className="size-5 text-muted-foreground hover:text-foreground" />
        </button>
      </PopoverTrigger>

      <PopoverContent className="p-0">
        <Calendar
          aria-label="Task Due Date"
          value={dueDate ? parseDate(dueDate) : undefined}
          onChange={(date) => {
            const iso = date.toString();
            setDueDate(iso);
            handleSaveTaskDates(task.id, iso);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

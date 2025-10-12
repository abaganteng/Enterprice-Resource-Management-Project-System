import { CalendarCell } from "react-aria-components";
import { twMerge } from "tailwind-merge";

export interface ProjectCalendarData {
  id: number | null;
  name: string | null;
  due_date: string | null;
  priority: string | null;
  assignees?: { name: string | null } | null;
  status?: { name: string | null } | null;
  projectGroup?: { name: string | null } | null;
  subtasks?: ProjectCalendarData[];
}

interface CalendarDayCellProps {
  date: any; // CalendarDate from @internationalized/date
  tasks?: ProjectCalendarData[];
}

export function CalendarDayCell({ date, tasks = [] }: CalendarDayCellProps) {
  const limitedTasks = tasks.slice(0, 3);
  const remaining = tasks.length - limitedTasks.length;

  return (
    <CalendarCell
      date={date}
      className={({ isSelected, isOutsideMonth }) =>
        twMerge(
          "relative min-h-[90px] border p-1 rounded-md transition-colors",
          isOutsideMonth && "bg-muted/40 text-muted-fg",
          isSelected && "bg-primary/10 border-primary",
          !isSelected && "hover:bg-muted/20",
        )
      }
    >
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-medium">{date.day}</span>
      </div>

      {/* Task badges */}
      <div className="flex flex-col gap-0.5">
        {limitedTasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center gap-1 rounded-md px-1 py-0.5 text-xs truncate bg-muted/50"
          >
            <span
              className={twMerge(
                "h-2 w-2 rounded-full shrink-0",
                task.priority === "urgent" && "bg-red-500",
                task.priority === "high" && "bg-orange-500",
                task.priority === "medium" && "bg-yellow-500",
                task.priority === "low" && "bg-green-500",
                !task.priority && "bg-gray-300",
              )}
            />
            <span className="truncate">{task.name}</span>
          </div>
        ))}

        {remaining > 0 && (
          <span className="text-[10px] text-muted-fg px-1">
            +{remaining} more
          </span>
        )}
      </div>
    </CalendarCell>
  );
}

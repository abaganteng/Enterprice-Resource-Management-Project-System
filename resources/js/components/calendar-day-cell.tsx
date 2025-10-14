import { CalendarDate } from "@internationalized/date";
import { CalendarCell } from "react-aria-components";
import { twMerge } from "tailwind-merge";

export interface ProjectCalendarData {
  id: number | null;
  name: string | null;
  due_date: string | null;
  start_date: string | null;
  end_date: string | null;
  priority: string | null;
  assignees?: { name: string | null } | null;
  status?: { name: string | null; color: string | null } | null;
  projectGroup?: { name: string | null } | null;
  subtasks?: ProjectCalendarData[];
}

interface CalendarDayCellProps {
  date: any; // CalendarDate
  tasks?: ProjectCalendarData[];
}

export function CalendarDayCell({ date, tasks = [] }: CalendarDayCellProps) {
  const limitedTasks = tasks.slice(0, 3);
  const remaining = tasks.length - limitedTasks.length;

  // Helper: buat CalendarDate dari string "YYYY-MM-DD"
  const toCalendarDate = (str: string | null) => {
    if (!str) return null;
    const [y, m, d] = str.split("-").map(Number);
    return new CalendarDate(y, m, d);
  };

  // Helper: apakah cell date termasuk dalam rentang task?
  const isDateInRange = (
    current: CalendarDate,
    start: CalendarDate,
    end: CalendarDate,
  ) => {
    return start.compare(current) <= 0 && current.compare(end) <= 0;
  };

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
      {/* Tanggal di pojok kiri atas */}
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-medium">{date.day}</span>
      </div>

      {/* Task badges */}
      <div className="flex flex-col gap-0.5 overflow-hidden">
        {limitedTasks.map((task) => {
          const start = toCalendarDate(task.start_date);
          const end = toCalendarDate(task.end_date);
          const due = toCalendarDate(task.due_date);

          const isRange = !!(start && end);
          let shouldRender = false;

          if (isRange) {
            shouldRender = isDateInRange(date, start!, end!);
          } else if (due) {
            shouldRender = due.compare(date) === 0;
          }

          if (!shouldRender) return null;

          const isStart = isRange && start?.compare(date) === 0;
          const isEnd = isRange && end?.compare(date) === 0;
          const color = task.status?.color ?? "#9CA3AF";

          return (
            <div
              key={task.id}
              className={twMerge(
                "flex items-center gap-1 px-1 py-0.5 text-[11px] text-white truncate transition-all",
                isStart && "rounded-l-md",
                isEnd && "rounded-r-md",
                !isStart && !isEnd && "rounded-none",
              )}
              style={{ backgroundColor: color }}
            >
              {/* Titik warna kecil */}
              <span
                className="h-2 w-2 rounded-full shrink-0"
                style={{ backgroundColor: color }}
              />
              {/* Nama task (truncate kalau panjang) */}
              <span className="truncate text-ellipsis overflow-hidden whitespace-nowrap block w-full">
                {task.name}
              </span>
            </div>
          );
        })}

        {remaining > 0 && (
          <span className="text-[10px] text-muted-fg px-1">
            +{remaining} more
          </span>
        )}
      </div>
    </CalendarCell>
  );
}

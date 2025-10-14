import { EventInput } from "@fullcalendar/core";

interface ProjectCalendarData {
  id: number;
  name: string;
  start_date?: string | null;
  end_date?: string | null;
  due_date?: string | null;
  status?: {
    id: number;
    name: string;
    color: string;
  } | null;
  subtasks?: ProjectCalendarData[];
}

export function mapTasksToEvents(tasks: ProjectCalendarData[]): EventInput[] {
  return (tasks ?? []).flatMap((task) => {
    const allTasks = [task, ...(task.subtasks ?? [])];

    return allTasks
      .filter((t) => t.start_date || t.due_date) // hanya task yang punya tanggal
      .map((t) => {
        const statusName = t.status?.name ?? "Unknown";
        const statusColor = t.status?.color ?? "#9ca3af";

        return {
          id: String(t.id),
          title: t.name ?? "Unknow",
          start: t.start_date ?? t.due_date ?? undefined,
          end: t.end_date ?? t.due_date ?? undefined,
          color: statusColor,
          extendedProps: {
            task: t,
            status: t.status,
          },
        } satisfies EventInput;
      });
  });
}

import {
  CalendarGridHeader,
  CalendarGrid,
  CalendarHeaderCell,
  CalendarGridBody,
  CalendarCell,
} from "react-aria-components";
import { ProjectCalendarData } from "./calendar-day-cell";
import { ProjectCalendarOverlay } from "./project-calendar-overlayes";

interface ProjectCalendarGridProps {
  focusedDate: any;
  tasksByDate: Map<string, ProjectCalendarData[]>;
  allTasks: ProjectCalendarData[];
}

export function ProjectCalendarGrid({
  focusedDate,
  tasksByDate,
  allTasks,
}: ProjectCalendarGridProps) {
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="relative">
      {/* Calendar grid utama */}
      <CalendarGrid className="w-full border-collapse border-spacing-0">
        <CalendarGridHeader>
          {(day) => (
            <CalendarHeaderCell className="text-xs font-medium text-center py-1">
              {day}
            </CalendarHeaderCell>
          )}
        </CalendarGridHeader>

        <CalendarGridBody>
          {(date) => {
            const key = date.toString();

            return (
              <CalendarCell
                key={key}
                date={date}
                className={({ isOutsideMonth, isSelected }) =>
                  [
                    "relative min-h-[90px] border p-1 align-top transition-colors overflow-hidden",
                    isOutsideMonth ? "bg-muted/40 text-muted-fg" : "",
                    isSelected ? "bg-primary/10 border-primary" : "",
                    !isSelected ? "hover:bg-muted/20" : "",
                  ].join(" ")
                }
              >
                <span className="text-xs font-medium">{date.day}</span>
              </CalendarCell>
            );
          }}
        </CalendarGridBody>
      </CalendarGrid>

      {/* Overlay layer untuk task range */}
      <ProjectCalendarOverlay tasks={allTasks} focusedDate={focusedDate} />
    </div>
  );
}

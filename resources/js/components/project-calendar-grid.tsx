import { getLocalTimeZone, getWeeksInMonth } from "@internationalized/date";
import {
  CalendarGridHeader,
  CalendarGrid,
  CalendarHeaderCell,
  CalendarGridBody,
} from "react-aria-components";
import { CalendarDayCell, ProjectCalendarData } from "./calendar-day-cell";

interface ProjectCalendarGridProps {
  focusedDate: any; // CalendarDate
  tasksByDate: Map<string, ProjectCalendarData[]>;
}

export function ProjectCalendarGrid({
  focusedDate,
  tasksByDate,
}: ProjectCalendarGridProps) {
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <CalendarGrid>
      <CalendarGridHeader>
        {(day) => (
          <CalendarHeaderCell className="text-xs font-medium text-center py-1">
            {day}
          </CalendarHeaderCell>
        )}
      </CalendarGridHeader>

      {/* CalendarGridBody expects a function (date) => ReactNode */}
      <CalendarGridBody>
        {(date) => {
          // date is a CalendarDate (or DateValue) provided by react-aria-components
          const key = date.toString();
          const dayTasks = tasksByDate.get(key) ?? [];

          // return one CalendarDayCell for this date
          return <CalendarDayCell key={key} date={date} tasks={dayTasks} />;
        }}
      </CalendarGridBody>
    </CalendarGrid>
  );
}

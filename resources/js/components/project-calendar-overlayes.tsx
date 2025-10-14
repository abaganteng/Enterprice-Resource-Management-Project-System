import { getDayIndex, getWeekIndex } from "@/utils/calendar-utils";
import {
  CalendarDate,
  endOfMonth,
  getDayOfWeek,
  parseDate,
  startOfMonth,
  toCalendarDate,
  ZonedDateTime,
} from "@internationalized/date";
import { JSX, useMemo } from "react";
import { twMerge } from "tailwind-merge";

export interface ProjectCalendarData {
  id: number | null;
  name: string | null;
  due_date: string | null;
  start_date: string | null;
  end_date: string | null;
  status?: { color: string | null } | null;
}

interface Props {
  tasks: ProjectCalendarData[];
  focusedDate: any;
  rowHeightPx?: number;
  offsetBadgePx?: number;
}

export function ProjectCalendarOverlay({
  tasks,
  focusedDate,
  rowHeightPx = 90,
  offsetBadgePx = 60,
}: Props) {
  // Konversi focusedDate ke CalendarDate
  const monthDate: CalendarDate =
    typeof focusedDate.toCalendarDate === "function"
      ? focusedDate.toCalendarDate()
      : focusedDate;

  // Definisi toCalendarDate seperti aslinya
  const toCalendarDate = (raw: string | null): CalendarDate | null => {
    if (!raw) return null;
    const s = raw.trim();
    if (/^\d{4}[-/]\d{1,2}[-/]\d{1,2}$/.test(s)) {
      const normalized = s.replace(/\//g, "-");
      try {
        return parseDate(normalized);
      } catch {
        const [y, m, d] = normalized.split("-").map(Number);
        return new CalendarDate(y, m, d);
      }
    }
    if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(s)) {
      const [d, m, y] = s.split("/").map(Number);
      return new CalendarDate(y, m, d);
    }
    try {
      return parseDate(s);
    } catch {
      return null;
    }
  };

  const overlaySegments = useMemo(() => {
    const out: Array<{
      id: number | string | null;
      name: string | null;
      color: string;
      row: number;
      colStart: number;
      colEnd: number;
    }> = [];

    const firstOfMonth = startOfMonth(monthDate);
    const lastOfMonth = endOfMonth(monthDate);

    // Hitung offset untuk week index (firstOfMonth sudah CalendarDate)
    const firstDayIndex = getDayIndex(firstOfMonth);

    // Gunakan getWeekIndex local dengan offset
    const getWeekIndexLocal = (date: CalendarDate) => {
      return Math.floor((date.day - 1 + firstDayIndex) / 7);
    };

    tasks.forEach((task) => {
      let start = toCalendarDate(task.start_date ?? task.due_date ?? null);
      let end = toCalendarDate(task.end_date ?? task.due_date ?? null);

      if (!start || !end) return;

      if (start.compare(end) > 0) {
        const tmp = start;
        start = end;
        end = tmp;
      }

      const effectiveStart =
        start.compare(firstOfMonth) < 0 ? firstOfMonth : start;
      const effectiveEnd = end.compare(lastOfMonth) > 0 ? lastOfMonth : end;

      const startWeekIdx = getWeekIndexLocal(effectiveStart);
      const endWeekIdx = getWeekIndexLocal(effectiveEnd);

      for (let w = startWeekIdx; w <= endWeekIdx; w++) {
        const colStart =
          w === startWeekIdx ? getDayIndex(effectiveStart) + 1 : 1;
        const colEnd = w === endWeekIdx ? getDayIndex(effectiveEnd) + 1 : 7;

        out.push({
          id: task.id,
          name: task.name,
          color: task.status?.color ?? "#3B82F6",
          row: w + 1,
          colStart,
          colEnd: colEnd + 1,
        });
      }
    });

    return out;
  }, [tasks, monthDate]);
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        gridTemplateRows: `repeat(6, ${rowHeightPx}px)`,
      }}
    >
      {overlaySegments.map((seg, i) => (
        <div
          key={`${seg.id}-${i}`}
          className="relative mx-0 my-1 flex items-center px-2 text-[12px] text-white overflow-hidden"
          style={{
            gridRow: seg.row,
            gridColumnStart: seg.colStart,
            gridColumnEnd: seg.colEnd,
            transform: `translateY(${offsetBadgePx - 20}px)`,
            backgroundColor: seg.color,
            borderRadius: 6,
            boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
            alignItems: "center",
            minHeight: Math.max(20, rowHeightPx * 0.18),
          }}
          title={seg.name ?? undefined}
        >
          <span className="truncate">{seg.name}</span>
        </div>
      ))}
    </div>
  );
}

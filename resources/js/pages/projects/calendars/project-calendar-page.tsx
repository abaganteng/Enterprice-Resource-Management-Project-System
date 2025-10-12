import { ProjectCalendarData } from "@/components/calendar-day-cell";
import CalendarHeader from "@/components/calendar-header";
import { ProjectCalendarGrid } from "@/components/project-calendar-grid";
import { Card } from "@/components/ui/card";
import ProjectLayoutNav from "@/layouts/project-layout-nav";
import { getLocalTimeZone, now } from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";
import { useMemo, useState } from "react";
import { Calendar } from "react-aria-components";

interface Props {
  project: any;
  tasks: ProjectCalendarData[];
}

export default function ProjectCalendarPage({ project, tasks }: Props) {
  const [focusedDate, setFocusedDate] = useState(() => now(getLocalTimeZone()));

  const monthFormatter = useDateFormatter({ month: "long", year: "numeric" });

  const monthTitle = monthFormatter.format(focusedDate.toDate());

  const handleNext = () => setFocusedDate((prev) => prev.add({ months: 1 }));
  const handlePrev = () => setFocusedDate((prev) => prev.add({ months: -1 }));

  const tasksByDate = useMemo(() => {
    const map = new Map<string, ProjectCalendarData[]>();

    tasks.forEach((task: any) => {
      const allTasks = [task, ...(task.subtasks ?? [])];
      allTasks.forEach((t) => {
        if (!t.due_date) return; // skip jika null
        const dateKey = t.due_date; // "YYYY-MM-DD"
        if (!map.has(dateKey)) map.set(dateKey, []);
        map.get(dateKey)!.push(t);
      });
    });

    return map;
  }, [project.tasks]);

  return (
    <div className="p-4 lg:p-6">
      <Card>
        <Card.Header>
          <Card.Title>Project Calendar</Card.Title>
          <Card.Description>
            Visualisasi waktu & progres berdasarkan due date task proyek.
          </Card.Description>
        </Card.Header>

        <Card.Content className="flex flex-col gap-y-6">
          {/* Header Navigasi Bulan */}
          <CalendarHeader
            title={monthTitle}
            onPrev={handlePrev}
            onNext={handleNext}
          />
          {/* Komponen Calendar */}
          <Calendar
            aria-label="Project Calendar"
            value={focusedDate}
            onChange={setFocusedDate}
            visibleDuration={{ months: 1 }}
            className="flex flex-col gap-2 border rounded-2xl shadow-sm overflow-hidden"
          >
            <ProjectCalendarGrid
              focusedDate={focusedDate}
              tasksByDate={tasksByDate}
            />
          </Calendar>
        </Card.Content>

        <Card.Footer />
      </Card>
    </div>
  );
}

ProjectCalendarPage.layout = (page: any) => (
  <ProjectLayoutNav project={page.props.project}>{page}</ProjectLayoutNav>
);

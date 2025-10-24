import { useMemo } from "react";
import ProjectLayoutNav from "@/layouts/project-layout-nav";
import { Card } from "@/components/ui/card";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import { mapTasksToEvents } from "@/utils/calendar-utils";
import { setupCalendarCellHover } from "@/utils/calendar-cell-utils";
import { router } from "@inertiajs/react";

interface Props {
  project: any;
  tasks: any;
}

export default function ProjectCalendarPage({ project, tasks }: Props) {
  const events = useMemo(() => mapTasksToEvents(tasks), [tasks]);

  // ✅ Saat user drag event ke tanggal lain
  const handleEventDrop = async (info: any) => {
    const event = info.event;
    const task = event.extendedProps.task;

    console.log("drop Task:", event.startStr, event.endSt);
    router.put(
      route("projects.groups.statuses.tasks.date", {
        project: project.id,
        projectGroup: task.projectGroup.id,
        status: task.status.id,
        task: task.id,
      }),
      {
        start_date: event.startStr,
        end_date: event.endStr,
        due_date: event.startStr,
      },
      {
        preserveScroll: true,
      },
    );
  };

  // ✅ Saat user resize event (ubah durasi start/end)
  const handleEventResize = async (info: any) => {
    const event = info.event;
    const task = event.extendedProps.task;

    // console.log("Resized Task:", task);
    router.put(
      route("projects.groups.statuses.tasks.date", {
        project: project.id,
        projectGroup: task.projectGroup.id,
        status: task.status.id,
        task: task.id,
      }),
      { start_date: event.startStr, end_date: event.endStr, due_date: null },
      {
        preserveScroll: true,
      },
    );
  };

  // ✅ Ketika event di-klik (sementara log di console)
  const handleEventClick = (info: any) => {
    const { task } = info.event.extendedProps;
    // console.log("🟦 Clicked Task:", task);
  };

  return (
    <div className="p-4 lg:p-6">
      <Card>
        <Card.Header>
          <Card.Title>Project Calendar</Card.Title>
          <Card.Description>
            Visualisasi waktu & progres berdasarkan tanggal mulai dan selesai
            task proyek.
          </Card.Description>
        </Card.Header>

        <Card.Content>
          <div className="rounded-2xl overflow-hidden border shadow-sm">
            <FullCalendar
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                listPlugin,
                interactionPlugin,
              ]}
              initialView="dayGridMonth"
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,listWeek",
              }}
              buttonText={{
                today: "Hari Ini",
                month: "Bulan",
                week: "Minggu",
                list: "Daftar",
              }}
              height="auto"
              events={events}
              editable={true}
              selectable={true}
              eventDrop={handleEventDrop}
              eventResize={handleEventResize}
              eventClick={handleEventClick}
              dayMaxEvents={3}
              dayCellDidMount={setupCalendarCellHover}
            />
          </div>
        </Card.Content>
      </Card>
    </div>
  );
}

ProjectCalendarPage.layout = (page: any) => (
  <ProjectLayoutNav project={page.props.project}>{page}</ProjectLayoutNav>
);

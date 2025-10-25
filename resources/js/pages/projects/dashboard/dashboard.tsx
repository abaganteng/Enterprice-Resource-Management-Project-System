import ProjectLayoutNav from "@/layouts/project-layout-nav";
import { CardStatus } from "./card-status";
import { PieChartDashboard } from "./pie-chart-dashboard";
import { useEffect, useRef } from "react";
import { createSwapy } from "swapy";
import { BarChartDashboard } from "./bar-chart-dashboard";
import { BarListDashboard } from "./bar-list-dashboard";
import { GridListSectionDashboard } from "./grid-list-section-dashboard";

interface Props {
  project: any;
  tasks: any;
}

export default function Dashboard({ project, tasks }: Props) {
  const swapy = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const statuses = [
    { id: "todo", name: "To Do", count: 3 },
    { id: "progress", name: "In Progress", count: 5 },
    { id: "done", name: "Done", count: 8 },
  ];

  const disableSwapy = () => swapy.current?.enable(false);
  const enableSwapy = () => swapy.current?.enable(true);

  useEffect(() => {
    if (containerRef.current) {
      swapy.current = createSwapy(containerRef.current, {
        swapMode: "hover", // bisa juga "insert" atau "move"
      });

      swapy.current.onSwap((event: any) => {
        console.log("Widget swapped:", event);
      });
    }

    // Cleanup
    return () => {
      swapy.current?.destroy();
    };
  }, []);
  return (
    <>
      <div
        ref={containerRef}
        className="flex flex-wrap gap-4 p-4 items-start"
        style={{ minHeight: "100vh" }}
      >
        {/* SLOT A */}
        {statuses.map((status) => (
          <div
            key={status.id}
            data-swapy-slot={status.id}
            className="p-2 rounded-lg border border-dashed border-gray-300 bg-muted/10"
          >
            <div data-swapy-item={status.id}>
              <CardStatus
                status={status}
                onResizeStart={disableSwapy}
                onResizeStop={enableSwapy}
              />
            </div>
          </div>
        ))}

        {/* SLOT B */}
        <div
          data-swapy-slot="b"
          className="p-2 rounded-lg border border-dashed border-gray-300 bg-muted/10"
        >
          <div data-swapy-item="b">
            <PieChartDashboard
              onResizeStart={disableSwapy}
              onResizeStop={enableSwapy}
            />
          </div>
        </div>
        <div
          data-swapy-slot="c"
          className="p-2 rounded-lg border border-dashed border-gray-300 bg-muted/10"
        >
          <div data-swapy-item="c">
            <BarChartDashboard
              onResizeStart={disableSwapy}
              onResizeStop={enableSwapy}
            />
          </div>
        </div>
        <div
          data-swapy-slot="d"
          className="p-2 rounded-lg border border-dashed border-gray-300 bg-muted/10"
        >
          <div data-swapy-item="d">
            <BarListDashboard
              onResizeStart={disableSwapy}
              onResizeStop={enableSwapy}
            />
          </div>
        </div>
        <div
          data-swapy-slot="E"
          className="p-2 rounded-lg border border-dashed border-gray-300 bg-muted/10"
        >
          <div data-swapy-item="E">
            <GridListSectionDashboard
              onResizeStart={disableSwapy}
              onResizeStop={enableSwapy}
            />
          </div>
        </div>
      </div>
    </>
  );
}

Dashboard.layout = (page: any) => (
  <ProjectLayoutNav project={page.props.project}>{page}</ProjectLayoutNav>
);

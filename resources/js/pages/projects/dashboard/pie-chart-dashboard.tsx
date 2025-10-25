import { Card } from "@/components/ui/card";
import { PieChart } from "@/components/ui/pie-chart";
import { Resizable } from "re-resizable";
import { useMemo } from "react";

type PieChartDashboardProps = {
  title?: string;
  description?: string;
  onResizeStart?: () => void;
  onResizeStop?: () => void;
};

export function PieChartDashboard({
  title = "Total Task by Assignee",
  description = "Where your total task by assignee.",
  onResizeStart,
  onResizeStop,
}: PieChartDashboardProps) {
  const data = useMemo(
    () => [
      { name: "Organic", amount: 1240 },
      { name: "Paid", amount: 880 },
      { name: "Referral", amount: 360 },
      { name: "Social", amount: 220 },
    ],
    [],
  );

  return (
    <Resizable
      defaultSize={{
        width: 350,
        height: 300,
      }}
      minWidth={300}
      minHeight={250}
      maxWidth={700}
      maxHeight={500}
      className="border rounded-xl bg-background shadow-sm p-0"
      enable={{
        top: true,
        right: true,
        bottom: true,
        left: false,
        topRight: true,
        bottomRight: true,
        bottomLeft: false,
        topLeft: false,
      }}
      onResizeStart={onResizeStart}
      onResizeStop={onResizeStop}
    >
      <Card className="w-full h-full select-none overflow-hidden cursor-grab">
        <Card.Header className="text-center">
          <Card.Title>{title}</Card.Title>
          <Card.Description>{description}</Card.Description>
        </Card.Header>

        <Card.Content>
          <PieChart
            className="mx-auto h-56"
            data={data}
            dataKey="amount"
            nameKey="name"
            config={{
              Organic: { label: "Organic" },
              Paid: { label: "Paid" },
              Referral: { label: "Referral" },
              Social: { label: "Social" },
            }}
          />
        </Card.Content>
      </Card>
    </Resizable>
  );
}

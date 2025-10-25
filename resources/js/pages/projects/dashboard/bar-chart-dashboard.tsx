import { BarChart } from "@/components/ui/bar-chart";
import { Card } from "@/components/ui/card";
import { Resizable } from "re-resizable";
import { useMemo } from "react";

interface BarChartDashboardProps {
  onResizeStart?: () => void;
  onResizeStop?: () => void;
}

export function BarChartDashboard({
  onResizeStart,
  onResizeStop,
}: BarChartDashboardProps) {
  const data = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const month = new Date(0, i).toLocaleString("en-US", {
        month: "short",
      });
      const revenue = Math.floor(4000 + Math.random() * 1500);
      const expenses = Math.floor(2000 + Math.random() * 1000);
      return { month, revenue, expenses, net: revenue - expenses };
    });
  }, []);

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
      <Card>
        <Card.Header>
          <Card.Title>Net revenue by month</Card.Title>
          <Card.Description>
            Revenue minus expenses to show monthly profitability.
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <BarChart
            className="aspect-video h-56 min-h-[224px] sm:h-72 sm:min-h-[288px]"
            data={data}
            dataKey="month"
            barProps={{
              type: "monotone",
            }}
            type="stacked"
            valueFormatter={(value: number) =>
              new Intl.NumberFormat("en-US", {
                notation: "compact",
                compactDisplay: "short",
              }).format(value)
            }
            tooltipProps={{
              formatter: (value: number, label: string) => (
                <span className="flex w-full justify-between gap-x-4 font-mono">
                  <span className="flex-1">{label}</span>
                  <span>
                    {" "}
                    {new Intl.NumberFormat("en-US", {
                      notation: "compact",
                      compactDisplay: "short",
                    }).format(value)}
                  </span>
                </span>
              ),
            }}
            config={{
              revenue: { label: "Revenue" },
              expenses: { label: "Expenses" },
              net: { label: "Net" },
            }}
          />
        </Card.Content>
      </Card>
    </Resizable>
  );
}

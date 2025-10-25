import { BarList } from "@/components/ui/bar-list";
import { Card } from "@/components/ui/card";
import { Resizable } from "re-resizable";

interface BarListDashboardProps {
  onResizeStart?: () => void;
  onResizeStop?: () => void;
}

export function BarListDashboard({
  onResizeStart,
  onResizeStop,
}: BarListDashboardProps) {
  return (
    <>
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
            <Card.Title>Page visits by section</Card.Title>
            <Card.Description>
              Unique visits for the most viewed docs pages this month
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <BarList
              data={[
                {
                  name: "Documentation",
                  value: 1200,
                  href: "/installation",
                },
                { name: "Components", value: 980, href: "/components" },
                { name: "Themes", value: 760, href: "/themes" },
                { name: "Colors", value: 430, href: "/colors" },
                { name: "Icons", value: 150, href: "/icons" },
                {
                  name: "Templates",
                  value: 150,
                  href: "https://irsyad.co",
                },
                {
                  name: "Plus",
                  value: 150,
                  href: "https://dub.sh/designiui",
                },
              ]}
              valueFormatter={(value) => `${value} visits`}
            />
          </Card.Content>
        </Card>
      </Resizable>
    </>
  );
}

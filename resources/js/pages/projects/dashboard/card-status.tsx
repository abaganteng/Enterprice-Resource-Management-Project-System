import { Card } from "@/components/ui/card";
import { Resizable } from "re-resizable";
import { useState } from "react";
import { IconCheck, IconDotsHorizontal, IconEyeDropper } from "@intentui/icons";

interface CardStatusProps {
  status: {
    id: string;
    name: string;
    count: number;
  };
  onResizeStart?: () => void;
  onResizeStop?: () => void;
}

export function CardStatus({
  status,
  onResizeStart,
  onResizeStop,
}: CardStatusProps) {
  const [hovered, setHovered] = useState(false);
  return (
    <>
      <Resizable
        defaultSize={{
          width: 200,
          height: 170,
        }}
        minWidth={200}
        minHeight={170}
        maxWidth={600}
        maxHeight={400}
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
        <Card
          className="p-4 h-full cursor-grab"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <Card.Header className="relative flex justify-between items-center">
            {/* ===== Title Normal ===== */}
            <div
              className={`transition-opacity duration-200 ${
                hovered ? "opacity-0" : "opacity-100"
              }`}
            >
              <Card.Title className="text-center">{status.name}</Card.Title>
            </div>

            {/* ===== Action Icons (muncul saat hover) ===== */}
            <div
              className={`absolute inset-0 flex justify-center items-center gap-2 transition-opacity duration-200 ${
                hovered ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              {/* 
              icon yang seharusnya:
              <ArrowPathIcon />
              <ArrowsPointingOutIcon />
              <Cog6ToothIcon />
              <EllipsisHorizontalIcon />
              <FunnelIcon />
               */}
              <IconCheck className="w-4 h-4 cursor-pointer hover:text-primary" />
              <IconCheck className="w-4 h-4 cursor-pointer hover:text-primary" />
              <IconCheck className="w-4 h-4 cursor-pointer hover:text-primary" />
              <IconCheck className="w-4 h-4 cursor-pointer hover:text-primary" />
              <IconCheck className="w-4 h-4 cursor-pointer hover:text-primary" />
            </div>
          </Card.Header>
          <Card.Content className="text-3xl font-bold text-center">
            {status.count}
          </Card.Content>
          <Card.Footer className="text-sm text-muted-foreground text-center">
            Tasks
          </Card.Footer>
        </Card>
      </Resizable>
    </>
  );
}

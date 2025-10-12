import { IconChevronLgLeft, IconChevronLgRight } from "@intentui/icons";
import { Button } from "./ui/button";
import { Heading } from "./ui/heading";

interface CalendarHeaderProps {
  title: string;
  onPrev?: () => void;
  onNext?: () => void;
  children?: React.ReactNode; // untuk filter tambahan di kanan nanti
}

export default function CalendarHeader({
  title,
  onPrev,
  onNext,
  children,
}: CalendarHeaderProps) {
  return (
    <header className="flex items-center justify-between">
      {/* Navigasi Bulan */}
      <div className="flex items-center gap-2">
        <Button
          aria-label="Previous Month"
          onPress={onPrev}
          className="p-2 rounded-lg hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
        >
          <IconChevronLgLeft className="size-4" />
        </Button>

        <Heading
          level={2}
          className="text-lg font-semibold text-foreground select-none"
        >
          {title}
        </Heading>

        <Button
          aria-label="Next Month"
          onPress={onNext}
          className="p-2 rounded-lg hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
        >
          <IconChevronLgRight className="size-4" />
        </Button>
      </div>

      {/* Filter control (opsional) */}
      <div className="flex items-center gap-2">{children}</div>
    </header>
  );
}

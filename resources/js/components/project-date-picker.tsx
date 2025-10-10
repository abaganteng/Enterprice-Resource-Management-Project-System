import { useEffect, useRef, useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { TextField } from "@/components/ui/text-field";
import { ListBox } from "@/components/ui/list-box";
import { Card } from "@/components/ui/card";
import { Link } from "@/components/ui/link";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "react-aria-components";
import { IconCalendar, IconX } from "@intentui/icons";
import { Label } from "./ui/field";
import { Button } from "./ui/button";

type DateValues = {
  start_date?: string | null;
  end_date?: string | null;
  due_date?: string | null;
};

type ProjectDatePickerProps = {
  value: DateValues;
  onChange: (values: DateValues) => void;
  autoFocus?: boolean;
  onSave?: (values: DateValues) => void;
  project: any;
};

type SelectionMode = "range" | "due_date";

export function ProjectDatePicker({
  value,
  onChange,
  project,
  onSave,
  autoFocus = true,
}: ProjectDatePickerProps) {
  const [dates, setDates] = useState<DateValues>(value);
  const [mode, setMode] = useState<SelectionMode>("due_date");
  const [activeField, setActiveField] = useState<"start" | "end" | "due">(
    "due",
  );
  const startRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLInputElement>(null);
  const dueRef = useRef<HTMLInputElement>(null);

  // Initialize mode based on existing values
  useEffect(() => {
    setDates(value);
    const hasRange = value.start_date || value.end_date;
    const hasDue = value.due_date;

    if (hasRange && !hasDue) {
      setMode("range");
      setActiveField(value.start_date && !value.end_date ? "end" : "start");
    } else {
      setMode("due_date");
      setActiveField("due");
    }
  }, [value]);

  // Auto-focus logic
  useEffect(() => {
    if (!autoFocus) return;

    const timeout = setTimeout(() => {
      if (mode === "range") {
        if (activeField === "start" && startRef.current) {
          startRef.current.focus();
        } else if (activeField === "end" && endRef.current) {
          endRef.current.focus();
        }
      } else if (dueRef.current) {
        dueRef.current.focus();
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, [autoFocus, mode, activeField]);

  const formatDateForInput = (date: Date): string => {
    return date.toISOString().split("T")[0];
  };

  const formatDisplayDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB"); // Format dd/mm/yyyy
  };

  // Handle manual input changes
  const handleInputChange = (key: keyof DateValues, val: string) => {
    let newDates = { ...dates };

    if (key === "start_date") {
      if (val) {
        setMode("range");
        setActiveField("end");
        newDates = {
          start_date: val,
          end_date: null,
          due_date: null,
        };
        setDates(newDates);
        onChange?.(newDates);
        setTimeout(() => endRef.current?.focus(), 50);
      } else {
        newDates = { ...dates, start_date: null };
        setDates(newDates);
        onChange?.(newDates);
        // Trigger save ketika data di-clear
        onSave?.(newDates);
      }
      return;
    }

    if (key === "end_date" && mode === "range") {
      newDates = {
        ...dates,
        end_date: val,
        due_date: null,
      };
      setDates(newDates);
      onChange?.(newDates);
      // 🚀 AUTO-SAVE: Trigger save ketika end_date diisi (range complete)
      onSave?.(newDates);
      return;
    }

    if (key === "due_date") {
      if (val) {
        setMode("due_date");
        setActiveField("due");
        newDates = {
          start_date: null,
          end_date: null,
          due_date: val,
        };
      } else {
        newDates = { ...dates, due_date: null };
      }
      setDates(newDates);
      onChange?.(newDates);
      // 🚀 AUTO-SAVE: Trigger save ketika due_date diisi
      onSave?.(newDates);
      return;
    }
  };

  // Handle calendar selection
  const handleCalendarSelect = (date: Date) => {
    const dateStr = formatDateForInput(date);

    if (mode === "range") {
      if (!dates.start_date) {
        handleInputChange("start_date", dateStr);
      } else {
        handleInputChange("end_date", dateStr);
        // 🚀 AUTO-SAVE: Calendar selection untuk end_date (range complete)
      }
    } else {
      handleInputChange("due_date", dateStr);
      // 🚀 AUTO-SAVE: Calendar selection untuk due_date
    }
  };
  // Handle quick select with proper mode awareness
  const handleQuickSelect = (optionId: string) => {
    const today = new Date();
    let targetDate = new Date();

    switch (optionId) {
      case "today":
        // Use today as-is
        break;
      case "tomorrow":
        targetDate.setDate(today.getDate() + 1);
        break;
      case "next-week":
        targetDate.setDate(today.getDate() + 7);
        break;
      case "next-weekend":
        const daysUntilSaturday = (6 - today.getDay() + 7) % 7 || 7;
        targetDate.setDate(today.getDate() + daysUntilSaturday);
        break;
      case "2w":
        targetDate.setDate(today.getDate() + 14);
        break;
      case "4w":
        targetDate.setDate(today.getDate() + 28);
        break;
      case "8w":
        targetDate.setDate(today.getDate() + 56);
        break;
      default:
        return;
    }

    const dateStr = formatDateForInput(targetDate);

    if (mode === "range") {
      if (!dates.start_date) {
        handleInputChange("start_date", dateStr);
      } else {
        handleInputChange("end_date", dateStr);
        // 🚀 AUTO-SAVE: Quick select untuk end_date (range complete)
      }
    } else {
      handleInputChange("due_date", dateStr);
      // 🚀 AUTO-SAVE: Quick select untuk due_date
    }
  };

  // Handle field focus to switch modes clearly
  const handleFieldFocus = (fieldType: "start" | "end" | "due") => {
    setActiveField(fieldType);

    if (fieldType === "start" || fieldType === "end") {
      setMode("range");
      // Clear due date when switching to range mode
      if (dates.due_date) {
        const newDates = { ...dates, due_date: null };
        setDates(newDates);
        onChange?.(newDates);
      }
    } else if (fieldType === "due") {
      setMode("due_date");
      // Clear range data when switching to due date mode
      if (dates.start_date || dates.end_date) {
        const newDates = { ...dates, start_date: null, end_date: null };
        setDates(newDates);
        onChange?.(newDates);
      }
    }
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Link className="flex items-center gap-2 min-h-6 px-3 py-1 rounded-md border border-transparent hover:border-muted-foreground/20 hover:bg-muted/50 transition-all duration-200 group">
          {/* Icon Calendar */}
          <IconCalendar className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />

          {/* Label - menggunakan data dari project */}
          {(project?.start_date && project?.end_date) || project?.due_date ? (
            <div className="flex items-center gap-2">
              <Label className="text-xs text-foreground group-hover:text-foreground/90 transition-colors">
                {project?.start_date && project?.end_date
                  ? `${formatDisplayDate(project.start_date)} - ${formatDisplayDate(project.end_date)}`
                  : formatDisplayDate(project?.due_date!)}
              </Label>
              {/* Clear button muncul on hover */}
              <Link
                onClick={(e) => {
                  e.stopPropagation();
                  // Clear dates logic here
                  const clearedDates = {
                    start_date: null,
                    end_date: null,
                    due_date: null,
                  };
                  setDates(clearedDates);
                  onChange?.(clearedDates);
                  onSave?.(clearedDates); // Juga trigger save ke backend
                }}
                className="opacity-0 group-hover:opacity-100 transition-all duration-200 text-xs text-muted-foreground hover:text-destructive p-0.5 rounded-sm hover:bg-destructive/10"
                aria-label="Clear dates"
              >
                <IconX className="size-3 hover:text-muted-fg" />
              </Link>
            </div>
          ) : (
            <Label className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
              Select date
            </Label>
          )}
        </Link>
      </PopoverTrigger>

      <PopoverContent className="flex flex-col gap-3 p-4 w-auto min-w-max">
        {/* Mode Indicator */}
        <div className="flex gap-2 text-xs font-medium">
          <button
            type="button"
            className={`px-2 py-1 rounded ${
              mode === "due_date"
                ? "bg-primary text-primary-fg"
                : "bg-muted text-muted-fg"
            }`}
            onClick={() => handleFieldFocus("due")}
          >
            Due Date
          </button>
          <button
            type="button"
            className={`px-2 py-1 rounded ${
              mode === "range"
                ? "bg-primary text-primary-fg"
                : "bg-muted text-muted-fg"
            }`}
            onClick={() => handleFieldFocus("start")}
          >
            Date Range
          </button>
        </div>

        {/* Input Fields */}
        <div className="flex gap-3">
          {/* Start Date - Hanya tampil di range mode */}
          {mode === "range" && (
            <TextField>
              <Input
                ref={startRef}
                placeholder="Start Date"
                value={
                  dates.start_date ? formatDisplayDate(dates.start_date) : ""
                }
                onChange={(e) => {
                  // Handle manual input jika diperlukan, atau biarkan kosong
                  // untuk hanya allow input dari calendar
                }}
                onFocus={() => handleFieldFocus("start")}
                className="h-8 px-3 text-sm flex-1 bg-transparent border rounded"
                type="text" // Ganti dari type="date" ke type="text"
                readOnly // Tambahkan ini untuk disable input manual
              />
            </TextField>
          )}

          {/* Conditional Field */}
          {mode === "range" ? (
            <TextField>
              <Input
                ref={endRef}
                placeholder="End Date"
                value={dates.end_date ? formatDisplayDate(dates.end_date) : ""}
                onChange={(e) => {
                  // Handle manual input jika diperlukan
                }}
                onFocus={() => handleFieldFocus("end")}
                className="h-8 px-3 text-sm flex-1 bg-transparent border rounded"
                type="text" // Ganti dari type="date" ke type="text"
                readOnly // Tambahkan ini untuk disable input manual
              />
            </TextField>
          ) : (
            <TextField>
              <Input
                ref={dueRef}
                placeholder="Due Date"
                value={dates.due_date ? formatDisplayDate(dates.due_date) : ""}
                onChange={(e) => {
                  // Handle manual input jika diperlukan
                }}
                onFocus={() => handleFieldFocus("due")}
                className="h-8 px-3 text-sm flex-1 bg-transparent border rounded"
                type="text" // Ganti dari type="date" ke type="text"
                readOnly // Tambahkan ini untuk disable input manual
              />
            </TextField>
          )}
        </div>

        {/* Quick Options + Calendar */}
        <div className="flex items-start gap-2">
          <div className="flex flex-col">
            <ListBox
              items={quickOptions}
              selectionMode="single"
              aria-label="Quick options"
              className="text-sm w-fit flex flex-col"
            >
              {(item) => (
                <ListBox.Item
                  key={item.id}
                  id={item.id}
                  onClick={() => handleQuickSelect(item.id)}
                  className="w-full text-left px-2 py-1 rounded-md cursor-pointer hover:bg-muted data-[selected=true]:bg-muted"
                >
                  {item.name}
                </ListBox.Item>
              )}
            </ListBox>
          </div>

          <Card className="p-0 w-fit">
            <Card.Content className="p-2">
              <div className="text-xs font-medium mb-2 text-center text-muted-fg">
                {mode === "range" ? "Select Date Range" : "Select Due Date"}
              </div>
              <Calendar
                aria-label="Project date picker"
                onChange={(date: any) => {
                  if (date) {
                    handleCalendarSelect(new Date(date));
                  }
                }}
              />
            </Card.Content>
          </Card>
        </div>
      </PopoverContent>
    </Popover>
  );
}

const quickOptions = [
  { id: "today", name: "Today" },
  { id: "tomorrow", name: "Tomorrow" },
  { id: "next-week", name: "Next Week" },
  { id: "next-weekend", name: "Next Weekend" },
  { id: "2w", name: "2 weeks" },
  { id: "4w", name: "4 weeks" },
  { id: "8w", name: "8 weeks" },
];

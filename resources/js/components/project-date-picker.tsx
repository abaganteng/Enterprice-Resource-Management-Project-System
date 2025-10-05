import { Input } from "react-aria-components";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Label } from "./ui/field";
import { ListBox, ListBoxItem } from "./ui/list-box";
import { Link } from "./ui/link";
import { IconCalendar } from "@intentui/icons";
import { TextField } from "./ui/text-field";

export function ProjectDatePicker() {
  return (
    <Popover>
      <PopoverTrigger>
        <Link>
          <IconCalendar className="size-5 cursor-pointer hover:text-muted-fg" />
        </Link>
      </PopoverTrigger>

      <PopoverContent className="p-4 min-w-[600px]">
        {/* 🔹 Form Input (Atas) */}
        <div className="flex gap-3 mb-4">
          <TextField
            placeholder="Start Date"
            id="start_date"
            className="flex-1"
          />
          <TextField placeholder="Due Date" id="due_date" className="flex-1" />
        </div>

        {/* 🔹 Quick Option + Calendar (Bawah) */}
        <div className="flex gap-4">
          {/* Sidebar Quick Option */}
          <div className="flex flex-col border-r pr-4 w-40 shrink-0">
            <h4 className="mb-2 text-sm font-medium text-muted-fg">
              Quick options
            </h4>

            {/* ❗️Pastikan ListBox tidak meluber */}
            <ListBox
              aria-label="Quick options"
              className="w-full max-w-[160px] overflow-y-auto"
            >
              <ListBoxItem>Today</ListBoxItem>
              <ListBoxItem>Tomorrow</ListBoxItem>
              <ListBoxItem>Next week</ListBoxItem>
              <ListBoxItem>Next weekend</ListBoxItem>
              <ListBoxItem>2 weeks</ListBoxItem>
              <ListBoxItem>4 weeks</ListBoxItem>
              <ListBoxItem>8 weeks</ListBoxItem>
            </ListBox>
          </div>

          {/* Calendar Area */}
          <div className="flex-1 border rounded-md p-2 overflow-hidden">
            <Calendar aria-label="Project date picker" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Disclosure, DisclosurePanel } from "@/components/ui/disclosure";
import { Heading } from "@/components/ui/heading";
import {
  Menu,
  MenuContent,
  MenuItem,
  MenuLabel,
  MenuSeparator,
  MenuSubmenu,
  MenuTrigger,
} from "@/components/ui/menu";
import {
  IconCheck,
  IconChevronRight,
  IconDotsHorizontal,
  IconEyeDropper,
  IconPlus,
} from "@intentui/icons";
import { StatusTask } from "./tasks/status-task";
import { Container } from "@/components/ui/container";
import { useEffect, useRef, useState } from "react";
import { useForm } from "@inertiajs/react";
import { Input, parseColor } from "react-aria-components";
import { ColorPicker } from "@/components/ui/color-picker";
import { NewTaskForm } from "./tasks/new-task-form";

interface Status {
  id: number | string;
  name: string;
  color: string;
  tasks: any[];
}

interface ListStatusProps {
  project: any;
  group: any;
  statuses: Status[];
}

export function GroupStatus({ project, statuses, group }: ListStatusProps) {
  console.log(group);
  const [editingStatusId, setEditingStatusId] = useState<
    number | string | null
  >(null);
  const [colorValue, setColorValue] = useState<any>(() =>
    parseColor("#3B82F6")
  );
  const inputRef = useRef<HTMLInputElement | null>(null);
  const form = useForm<{ name: string; color?: string }>({
    name: "",
    color: "",
  });
  const [creatingStatusId, setCreatingStatusId] = useState<
    number | string | null
  >(null);

  useEffect(() => {
    if (editingStatusId && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingStatusId]);

  const getInputWidth = (text: string, font = "14px Inter", buffer = 12) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return buffer;
    ctx.font = font;
    return Math.min(ctx.measureText(text || "").width + buffer, 300);
  };

  const handleRenameSubmit = (statusId: number | string) => {
    form.setData(
      "color",
      colorValue?.toString?.() ?? form.data.color ?? "#3B82F6"
    );
    form.put(
      route("projects.groups.statuses.rename", {
        project: project.id,
        status: statusId,
      }),
      {
        preserveScroll: true,
        onSuccess: () => setEditingStatusId(null),
      }
    );
  };

  return (
    <>
      {statuses.map((status) => (
        <Disclosure key={status.id}>
          <div className="flex items-center gap-2">
            <Button slot="trigger" intent="plain">
              <IconChevronRight className="size-5 cursor-pointer hover:text-gray-600" />
            </Button>

            <div className="flex flex-1 items-center gap-2 min-w-3xl">
              {editingStatusId === status.id ? (
                <div className="flex items-center gap-2 rounded-md border-2 bg-foreground px-1">
                  <ColorPicker
                    value={colorValue}
                    onChange={(c) => {
                      setColorValue(c);
                      form.setData("color", c?.toString?.());
                    }}
                  />

                  <Input
                    ref={inputRef}
                    value={form.data.name}
                    onChange={(e) => form.setData("name", e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleRenameSubmit(status.id);
                    }}
                    style={{
                      width: `${getInputWidth(form.data.name)}px`,
                      minWidth: "40px",
                      maxWidth: "100%",
                    }}
                    className="flex-1 bg-transparent capitalize border-none outline-none focus:ring-0 text-sm text-blue-600 truncate"
                  />

                  <Button
                    type="button"
                    onClick={() => handleRenameSubmit(status.id)}
                    className=" bg-bg hover:bg-foreground"
                    aria-label="Save"
                  >
                    <IconCheck />
                  </Button>
                </div>
              ) : (
                <span
                  className="text-sm capitalize truncate cursor-text px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: status.color ?? "transparent",
                    color: status.color ? "#ffffff" : undefined,
                  }}
                  onClick={() => {
                    setEditingStatusId(status.id);
                    form.setData("name", status.name);
                    form.setData("color", status.color ?? "#3B82F6");
                    setColorValue(parseColor(status.color ?? "#3B82F6"));
                  }}
                >
                  {status.name}
                </span>
              )}

              <Menu>
                <MenuTrigger aria-label="Open Menu" className="p-0">
                  <IconDotsHorizontal className="w-4 h-4 cursor-pointer hover:text-gray-600" />
                </MenuTrigger>
                <MenuContent popover={{ placement: "bottom" }}>
                  <MenuItem
                    onAction={() => {
                      setEditingStatusId(status.id);
                      form.setData("name", status.name);
                      form.setData("color", status.color ?? "#3B82F6");
                      setColorValue(parseColor(status.color ?? "#3B82F6"));
                    }}
                  >
                    <IconEyeDropper className="cursor-pointer hover:text-gray-600" />
                    <MenuLabel>Rename</MenuLabel>
                  </MenuItem>
                </MenuContent>
              </Menu>

              <Button
                intent="outline"
                size="xs"
                className={"space-y-3"}
                onClick={() => setCreatingStatusId(status.id)}
                slot="trigger"
              >
                <IconPlus />
                Add Task
              </Button>
            </div>
          </div>

          <DisclosurePanel>
            <Container>
              {creatingStatusId === status.id && (
                <NewTaskForm
                  project={project}
                  status={status}
                  group={group}
                  onCancel={() => setCreatingStatusId(null)}
                  onSuccess={() => setCreatingStatusId(null)}
                />
              )}
              <StatusTask tasks={status.tasks ?? []} />
            </Container>
          </DisclosurePanel>
        </Disclosure>
      ))}
    </>
  );
}

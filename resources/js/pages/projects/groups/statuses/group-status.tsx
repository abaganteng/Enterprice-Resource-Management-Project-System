import { Button } from "@/components/ui/button";
import {
  Disclosure,
  DisclosurePanel,
  DisclosureTrigger,
} from "@/components/ui/disclosure";
import {
  Menu,
  MenuContent,
  MenuItem,
  MenuLabel,
  MenuTrigger,
} from "@/components/ui/menu";
import { IconCheck, IconDotsHorizontal, IconEyeDropper } from "@intentui/icons";
import { Container } from "@/components/ui/container";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "@inertiajs/react";
import { Input, parseColor } from "react-aria-components";
import { ColorPicker } from "@/components/ui/color-picker";
import StatusTable from "./status-table";

interface Status {
  id: number | string;
  name: string;
  color: string;
  tasks: any[];
}

interface ListStatusProps {
  project: any;
  users: any;
  group: any;
  statuses: Status[];
}

export function GroupStatus({
  users,
  project,
  statuses,
  group,
}: ListStatusProps) {
  const [editingStatusId, setEditingStatusId] = useState<
    number | string | null
  >(null);
  const [colorValue, setColorValue] = useState<any>(() =>
    parseColor("#3B82F6"),
  );
  const inputRef = useRef<HTMLInputElement | null>(null);
  const form = useForm<{ name: string; color?: string }>({
    name: "",
    color: "",
  });

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
      colorValue?.toString?.() ?? form.data.color ?? "#3B82F6",
    );
    form.put(
      route("projects.groups.statuses.rename", {
        project: project.id,
        projectGroup: group,
        status: statusId,
      }),
      {
        preserveScroll: true,
        onSuccess: () => setEditingStatusId(null),
      },
    );
  };

  return (
    <>
      {statuses.map((status: any) => (
        <Disclosure
          defaultExpanded={status.id}
          key={status.id}
          className={"space-y-6"}
        >
          <div className="flex items-center gap-2">
            <DisclosureTrigger
              className={"hover:text-muted-fg cursor-pointer"}
            />

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
                <MenuContent>
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
            </div>
          </div>

          <DisclosurePanel>
            <Container>
              <StatusTable
                users={users}
                project={project}
                group={group}
                status={status}
              />
            </Container>
          </DisclosurePanel>
        </Disclosure>
      ))}
    </>
  );
}

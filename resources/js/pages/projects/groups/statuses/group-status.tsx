import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Disclosure,
  DisclosurePanel,
  DisclosureTrigger,
} from "@/components/ui/disclosure";
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
  IconDotsVertical,
  IconEye,
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
import { Table } from "@/components/ui/table";
import { useDragAndDrop } from "react-aria-components";
import { useListData } from "react-stately";
import { Checkbox } from "@/components/ui/checkbox";

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
      colorValue?.toString?.() ?? form.data.color ?? "#3B82F6",
    );
    form.put(
      route("projects.groups.statuses.rename", {
        project: project.id,
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
      {statuses.map((status) => (
        <Disclosure key={status.id} className={"space-y-6"}>
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
            </div>
          </div>

          <DisclosurePanel>
            <Container>
              <StatusTable project={project} group={group} status={status} />
            </Container>
          </DisclosurePanel>
        </Disclosure>
      ))}
    </>
  );
}

function StatusTable({ project, group, status }: any) {
  const [creatingTask, setCreatingTask] = useState(false);

  // data lokal task
  const list = useListData({
    initialItems: status.tasks ?? [],
    getKey: (task: any) => String(task.id),
  });

  // setup drag & drop
  const { dragAndDropHooks } = useDragAndDrop({
    getItems: (keys) =>
      [...keys].map((key) => ({
        "text/plain": list.getItem(key)?.name ?? "",
      })),
    onReorder(e) {
      if (e.target.dropPosition === "before") {
        list.moveBefore(e.target.key, e.keys);
      } else if (e.target.dropPosition === "after") {
        list.moveAfter(e.target.key, e.keys);
      }
      // TODO: persist reorder ke backend
    },
  });

  // ambil root tasks (tanpa parent)
  const rootTasks = list.items.filter(
    (t: any) => t && (t.parent_id === null || t.parent_id === undefined),
  );

  return (
    <div className="w-full rounded-lg border p-4 bg-background">
      <Table
        allowResize
        aria-label={`Tasks for ${status.name}`}
        selectionMode="multiple"
        selectionBehavior="toggle"
        dragAndDropHooks={dragAndDropHooks}
      >
        <Table.Header>
          <Table.Column isRowHeader>Name</Table.Column>
          <Table.Column />
        </Table.Header>

        <Table.Body items={rootTasks}>
          {(task: any) => (
            <StatusTaskItem
              key={task.id}
              task={task}
              group={group}
              tasks={list.items}
              level={0}
              project={project}
              status={status}
            />
          )}
        </Table.Body>
      </Table>

      {/* Tampilkan form Add Task di bawah tabel */}
      {creatingTask && (
        <div className="mt-3">
          <NewTaskForm
            project={project}
            status={status}
            group={group}
            onCancel={() => setCreatingTask(false)}
            onSuccess={(newTask: any) => {
              setCreatingTask(false);
              list.insert(0, newTask);
            }}
          />
        </div>
      )}

      {/* Tombol Add Task */}
      {!creatingTask && (
        <div className="mt-3">
          <Button
            intent="outline"
            size="sm"
            onClick={() => setCreatingTask(true)}
          >
            <IconPlus className="size-4" />
            Add Task
          </Button>
        </div>
      )}
    </div>
  );
}

interface Task {
  id: number | string;
  name: string;
  parent_id?: number | string | null;
}

interface StatusTaskItemProps {
  task: Task;
  tasks: Task[];
  level: number;
  project: any;
  status: any;
  group: any;
}

function StatusTaskItem({
  task,
  group,
  tasks,
  level,
  project,
  status,
}: StatusTaskItemProps) {
  const [expanded, setExpanded] = useState(false);
  console.log(project);
  const children = tasks.filter((t) => t && t.parent_id === task.id);

  const hasChildren = children.length > 0;

  return (
    <>
      {/* Baris utama task */}
      <Table.Row key={task.id}>
        <Table.Cell>
          <div className="flex items-center gap-2">
            {/* Expand / Collapse button */}
            {hasChildren ? (
              <button
                type="button"
                onClick={() => setExpanded((prev) => !prev)}
                className="transition-transform duration-200 hover:text-muted"
              >
                <IconChevronRight
                  className={`size-4 text-gray-400 transform  ${
                    expanded ? "rotate-90 text-blue-500" : ""
                  }`}
                />
              </button>
            ) : (
              <div className="w-4" /> // placeholder agar alignment tetap sejajar
            )}

            {/* Nama task */}
            <span
              style={{ marginLeft: `${level * 16}px` }}
              className="truncate text-sm text-foreground"
            >
              {task.name}
            </span>
          </div>
        </Table.Cell>
        <Table.Cell>
          <div className="flex justify-end">
            <Menu>
              <MenuTrigger className="size-6">
                <IconDotsVertical />
              </MenuTrigger>
              <MenuContent aria-label="Actions" placement="left top">
                <MenuItem
                  href={route("projects.groups.statuses.tasks.show", {
                    project: project.id,
                    group: group,
                    status: status.id,
                    task: task.id,
                  })}
                >
                  <IconEye />
                  <Menu.Label>Detail</Menu.Label>
                </MenuItem>
                <MenuSeparator />
                <MenuItem isDanger>Delete</MenuItem>
              </MenuContent>
            </Menu>
          </div>
        </Table.Cell>
      </Table.Row>

      {/* Render subtask jika sedang di-expand */}
      {expanded &&
        children.map((child) => (
          <StatusTaskItem
            key={child.id}
            task={child}
            group={group}
            tasks={tasks}
            level={level + 1}
            project={project}
            status={status}
          />
        ))}
    </>
  );
}

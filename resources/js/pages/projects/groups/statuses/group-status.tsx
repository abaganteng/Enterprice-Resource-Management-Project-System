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
  MenuSeparator,
  MenuTrigger,
} from "@/components/ui/menu";
import {
  IconCheck,
  IconChevronRight,
  IconDotsHorizontal,
  IconDotsVertical,
  IconEye,
  IconEyeDropper,
  IconPerson,
  IconPlus,
  IconX,
} from "@intentui/icons";
import { Container } from "@/components/ui/container";
import { useEffect, useRef, useState } from "react";
import { router, useForm } from "@inertiajs/react";
import {
  Autocomplete,
  Popover,
  Input,
  parseColor,
  useFilter,
} from "react-aria-components";
import { ColorPicker } from "@/components/ui/color-picker";
import { NewTaskForm } from "./tasks/new-task-form";
import { Table } from "@/components/ui/table";
import { useDragAndDrop } from "react-aria-components";
import { useListData } from "react-stately";
import { Select, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Dialog } from "@/components/ui/dialog";
import { SearchField } from "@/components/ui/search-field";
import { ListBox } from "@/components/ui/list-box";
import { Avatar } from "@/components/ui/avatar";
import { usePress } from "react-aria";
import TaskDueDate from "./task-due-date";
import TaskPriority from "./task-priority";
import { twMerge } from "tailwind-merge";

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

function StatusTable({ users, project, group, status }: any) {
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
          <Table.Column>Assign</Table.Column>
          <Table.Column>Due Date</Table.Column>
          <Table.Column>Priority</Table.Column>
          <Table.Column />
        </Table.Header>

        <Table.Body items={rootTasks}>
          {(task: any) => (
            <StatusTaskItem
              key={task.id}
              users={users}
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
  assignees: any[];
  parent_id?: number | string | null;
}

interface StatusTaskItemProps {
  users: any[];
  task: Task;
  tasks: Task[];
  level: number;
  project: any;
  status: any;
  group: any;
}

function StatusTaskItem({
  users,
  task,
  group,
  tasks,
  level,
  project,
  status,
}: StatusTaskItemProps) {
  const [expanded, setExpanded] = useState(false);
  const { contains } = useFilter({ sensitivity: "base" });
  const children = tasks.filter((t) => t && t.parent_id === task.id);

  const hasChildren = children.length > 0;

  const { put, data, setData, reset } = useForm({
    assigned_to: "" as string,
  });

  const handleAssign = (key: string | number, taskId: string | number) => {
    const userId = String(key);
    setData("assigned_to", userId);
    router.put(
      route("projects.groups.statuses.tasks.assign", {
        project: project.id,
        projectGroup: group,
        status: status.id,
        task: taskId,
      }),
      { assigned_to: userId },
      {
        preserveScroll: true,
        onSuccess: () => {
          reset();
          window.location.reload();
        },
      },
    );
  };

  const getInitials = (name: string) => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (
      parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
    ).toUpperCase();
  };

  const handleRemoveAssignees = (
    assignId: number | string,
    taskId: number | string,
    data: any,
  ) => {
    router.post(
      route("projects.groups.statuses.tasks.assign.remove", {
        project: project.id,
        projectGroup: group,
        status: status.id,
        task: taskId,
        assign: assignId,
      }),
      {
        _method: "delete",
        assign: assignId,
        task: taskId,
        ...data,
      },
      {
        preserveScroll: true,
        onSuccess: () => {
          const updated = task.assignees.filter((u) => u.id !== assignId);
          task.assignees = updated;
          window.location.reload();
        },
      },
    );
  };

  return (
    <>
      {/* Baris utama task */}
      <Table.Row key={task.id}>
        <Table.Cell>
          <div
            className={twMerge(
              "flex items-center justify-between w-full",
              "group/task hover:bg-muted/40 rounded-md px-2 py-1 transition-colors",
            )}
          >
            {/* Kiri: expand button + nama task */}
            <div className="flex items-center gap-2">
              {hasChildren ? (
                <Button
                  size="sm"
                  intent="outline"
                  aria-label={expanded ? "Collapse" : "Expand"}
                  onPress={() => setExpanded((prev) => !prev)}
                  className={twMerge(
                    "size-5 transition-transform duration-200",
                    expanded ? "rotate-90 text-blue-500" : "text-muted-fg",
                  )}
                >
                  <IconChevronRight className="size-4" />
                </Button>
              ) : (
                <div className="w-5" />
              )}

              <span
                style={{ marginLeft: `${level * 16}px` }}
                className="truncate text-sm font-medium text-foreground"
              >
                {task.name}
              </span>
            </div>

            {/* Kanan: tombol Add Subtask (sementara placeholder) */}
            <Button
              size="sm"
              intent="outline"
              className="opacity-0 group-hover/task:opacity-100 transition-opacity"
              onPress={() => console.log("Add subtask for task:", task.id)}
            >
              <IconPlus className="size-4 text-muted-fg hover:text-foreground" />
            </Button>
          </div>
        </Table.Cell>
        <Table.Cell>
          <Select
            placeholder={<IconPerson />}
            value={data.assigned_to} // gunakan "value" bukan "selectedKey"
            onChange={(key: any) => handleAssign(key, task.id)}
          >
            <SelectTrigger>
              {task.assignees && task.assignees.length > 0 ? (
                <div className="flex -space-x-1">
                  {task.assignees.map((user: any) => {
                    // 🟢 1️⃣ Definisikan usePress di sini, di dalam map
                    const { pressProps } = usePress({
                      onPress: (e: any) => {
                        e.continuePropagation();
                        handleRemoveAssignees(user.id, task.id, data);
                      },
                    });

                    // 🟢 2️⃣ Return avatar + tombol IconX
                    return (
                      <div key={user.id} className="relative group">
                        <Avatar
                          style={{
                            backgroundColor: `hsl(${(user.id * 47) % 360}, 70%, 60%)`,
                            color: "white",
                          }}
                          className="mr-2 size-4 sm:size-6 flex items-center justify-center rounded-full text-[10px] font-medium"
                        >
                          {getInitials(user.name)}
                        </Avatar>

                        <div
                          role="button"
                          tabIndex={0}
                          title="Remove assignee"
                          {...pressProps}
                          className="absolute -top-1 -right-1 hidden group-hover:flex items-center justify-center
             bg-red-500 text-white rounded-full p-[1px] transition hover:bg-red-600"
                        >
                          <IconX className="w-2 h-2" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <IconPerson className="text-gray-400" />
              )}
            </SelectTrigger>

            <Popover className="entering:fade-in exiting:fade-out flex max-h-80 w-(--trigger-width) entering:animate-in exiting:animate-out flex-col overflow-hidden rounded-lg border bg-overlay">
              <Dialog aria-label="Assign User">
                <Autocomplete filter={contains}>
                  <div className="border-b bg-muted p-2">
                    <SearchField className="rounded-lg bg-bg" autoFocus />
                  </div>

                  <ListBox
                    className="max-h-[inherit] min-w-[inherit] rounded-t-none border-0 bg-transparent shadow-none"
                    items={users}
                  >
                    {(item) => (
                      <SelectItem key={item.id} textValue={item.name}>
                        {item.name}
                      </SelectItem>
                    )}
                  </ListBox>
                </Autocomplete>
              </Dialog>
            </Popover>
          </Select>
        </Table.Cell>
        <Table.Cell>
          <TaskDueDate
            projectId={project.id}
            groupId={group}
            statusId={status.id}
            task={task}
          />
        </Table.Cell>
        <Table.Cell>
          <TaskPriority
            projectId={project.id}
            groupId={group}
            statusId={status.id}
            task={task}
          />
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
            users={users}
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

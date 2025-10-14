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
import { useEffect, useMemo, useRef, useState } from "react";
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
import { NewSubtaskForm } from "./tasks/new-subtask-form";
import { GridList, GridListItem } from "@/components/ui/grid-list";
import { TaskNameCell } from "./task-name-cell";
import AssignTask from "./tasks/assign-task";
import { ProjectDatePicker } from "@/components/project-date-picker";

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

  const list = useListData({
    initialItems: Array.isArray(status?.tasks) ? status.tasks : [],
    getKey: (task: any) => String(task.id),
  });

  // const { dragAndDropHooks } = useDragAndDrop({
  //   getItems: (keys) =>
  //     [...keys].map((key) => {
  //       const item = list.getItem(key);
  //       return item ? { "text/plain": item.name } : {};
  //     }),
  //   onReorder(e) {
  //     if (e.target.dropPosition === "before") {
  //       list.moveBefore(e.target.key, e.keys);
  //     } else if (e.target.dropPosition === "after") {
  //       list.moveAfter(e.target.key, e.keys);
  //     }
  //   },
  // });

  const rootTasks = Array.isArray(list.items)
    ? list.items.filter((t: any) => t && t.parent_id == null)
    : [];

  const safeUsers = Array.isArray(users) ? users : [];

  return (
    <div
      className="w-full rounded-lg border p-4 bg-background"
      style={{ "--cols": "1fr 150px 120px 120px 80px" } as React.CSSProperties}
    >
      {/* HEADER */}
      <div className="grid [grid-template-columns:var(--cols)] gap-2 pb-2 pt-1 font-semibold text-sm text-muted-fg border-b">
        <div className="min-w-md">Name</div>
        <div className="text-left">Assign</div>
        <div className="text-left">Due Date</div>
        <div className="text-left">Priority</div>
        <div className="text-left">Actions</div>
      </div>

      {/* BODY */}
      <GridList
        aria-label={`Tasks for ${status.name}`}
        items={rootTasks ?? []}
        // dragAndDropHooks={dragAndDropHooks}
      >
        {(task: any) => (
          <GridListItem
            key={task.id}
            className="flex items-center justify-between gap-2 w-full"
          >
            <StatusTaskItem
              users={safeUsers}
              task={task}
              group={group}
              tasks={list.items}
              level={0}
              project={project}
              status={status}
            />
          </GridListItem>
        )}
      </GridList>

      {/* ADD TASK */}
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
  const [creatingSubtask, setCreatingSubtask] = useState(false);
  const children = useMemo(
    () => tasks.filter((t) => t && t.parent_id === task.id),
    [tasks, task.id], // dependensi
  );
  const [editingTaskId, setEditingTaskId] = useState<number | string | null>(
    null,
  );
  const inputRef = useRef<HTMLInputElement | null>(null);
  const form = useForm<{ name: string }>({ name: "" });

  useEffect(() => {
    if (editingTaskId && inputRef.current) inputRef.current.focus();
  }, [editingTaskId]);

  const hasChildren = children.length > 0;

  const handleRenameTask = (taskId: number | string) => {
    form.put(
      route("projects.groups.statuses.tasks.rename", {
        project: project.id,
        projectGroup: group,
        status: status.id,
        task: taskId,
      }),
      {
        preserveScroll: true,
        onSuccess: () => {
          setEditingTaskId(null);
          window.location.reload();
        },
      },
    );
  };
  type DateValues = {
    start_date?: string | null;
    end_date?: string | null;
    due_date?: string | null;
  };
  const [projectDates, setProjectDates] = useState<DateValues>({
    start_date: "",
    end_date: "",
    due_date: "",
  });

  const handleSaveProjectDates = (dates: DateValues) => {
    router.put(
      route("projects.groups.statuses.tasks.date", {
        project: project.id,
        projectGroup: group,
        status: status.id,
        task: task.id,
      }),
      {
        start_date: dates.start_date,
        end_date: dates.end_date,
        due_date: dates.due_date,
      },
      {
        preserveState: true,
        onSuccess: () => closed,
      },
    );
  };

  return (
    <div className="flex flex-col">
      {/* ====== Baris Utama Task ====== */}
      <div
        key={task.id}
        className={twMerge(
          "grid [grid-template-columns:var(--cols)] items-center py-1 px-2 group/task hover:bg-muted/40 rounded-md transition-colors",
        )}
      >
        {/* Kolom 1: Nama + Expand + Add Subtask */}
        <div className="flex items-center justify-between min-w-md">
          <TaskNameCell
            task={task}
            level={level}
            hasChildren={hasChildren}
            creatingSubtask={creatingSubtask}
            expanded={expanded}
            setExpanded={setExpanded}
            setCreatingSubtask={setCreatingSubtask}
            project={project}
            group={group}
            status={status}
            editingTaskId={editingTaskId}
            setEditingTaskId={setEditingTaskId}
            form={form}
            inputRef={inputRef}
            handleRenameTask={handleRenameTask}
          />
        </div>

        {/* Kolom 2: Assign */}
        <div className="flex justify-end">
          <AssignTask
            projectId={project.id}
            groupId={group}
            statusId={status.id}
            users={users}
            task={task}
          />
        </div>

        {/* Kolom 3: Due Date */}
        <div className="flex justify-end ">
          {/* <TaskDueDate
            projectId={project.id}
            groupId={group}
            statusId={status.id}
            task={task}
          /> */}
          <ProjectDatePicker
            value={projectDates}
            onChange={(newDates: any) => setProjectDates(newDates)}
            onSave={handleSaveProjectDates}
            project={task}
          />
        </div>

        {/* Kolom 4: Priority */}
        <div className="flex justify-end ">
          <TaskPriority
            projectId={project.id}
            groupId={group}
            statusId={status.id}
            task={task}
          />
        </div>

        {/* Kolom 5: Actions */}
        <div className="flex justify-end ">
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
              <MenuItem
                onAction={() => {
                  setEditingTaskId(task.id);
                  form.setData("name", task.name);
                }}
              >
                <IconEyeDropper className="cursor-pointer hover:text-gray-600" />
                <Menu.Label>Rename</Menu.Label>
              </MenuItem>
            </MenuContent>
          </Menu>
        </div>
      </div>

      {/* ====== Form New Subtask (posisi di bawah) ====== */}
      {creatingSubtask && (
        <div
          style={{ marginLeft: `${(level + 1) * 16}px` }}
          className="pl-2 mt-1"
        >
          <NewSubtaskForm
            project={project}
            status={status}
            group={group}
            parentId={task.id}
            level={level + 1}
            onCancel={() => setCreatingSubtask(false)}
            onSuccess={() => setCreatingSubtask(false)}
          />
        </div>
      )}

      {/* ====== Subtask Rekursif ====== */}
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
    </div>
  );
}

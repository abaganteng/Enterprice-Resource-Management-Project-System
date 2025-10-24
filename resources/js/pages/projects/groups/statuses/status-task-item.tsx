import { router, useForm } from "@inertiajs/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { TaskNameCell } from "./task-name-cell";
import AssignTask from "./tasks/assign-task";
import { ProjectDatePicker } from "@/components/project-date-picker";
import TaskPriority from "./task-priority";
import { Menu } from "@/components/ui/menu";
import { IconDotsVertical, IconEye, IconEyeDropper } from "@intentui/icons";
import { NewSubtaskForm } from "./tasks/new-subtask-form";

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
export function StatusTaskItem({
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
            <Menu.Trigger className="size-6">
              <IconDotsVertical />
            </Menu.Trigger>
            <Menu.Content aria-label="Actions" placement="left top">
              <Menu.Item
                href={route("projects.groups.statuses.tasks.show", {
                  project: project.id,
                  group: group,
                  status: status.id,
                  task: task.id,
                })}
              >
                <IconEye />
                <Menu.Label>Detail</Menu.Label>
              </Menu.Item>
              <Menu.Separator />
              <Menu.Item
                onAction={() => {
                  setEditingTaskId(task.id);
                  form.setData("name", task.name);
                }}
              >
                <IconEyeDropper className="cursor-pointer hover:text-gray-600" />
                <Menu.Label>Rename</Menu.Label>
              </Menu.Item>
            </Menu.Content>
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

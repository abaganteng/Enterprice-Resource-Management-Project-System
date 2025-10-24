import { Button } from "@/components/ui/button";
import { IconPlus } from "@intentui/icons";
import { NewTaskForm } from "./tasks/new-task-form";
import {
  GridList,
  GridListEmptyState,
  GridListItem,
} from "@/components/ui/grid-list";
import { StatusTaskItem } from "./status-task-item";
import { router } from "@inertiajs/react";
import { useDragAndDrop } from "react-aria-components";
import { useListData } from "react-stately";
import { useState } from "react";

export default function StatusTable({ users, project, group, status }: any) {
  const [creatingTask, setCreatingTask] = useState(false);
  const list = useListData({
    initialItems: status?.tasks,
    getKey: (task: any) => String(task.id),
  });

  const rootTasks = Array.isArray(list.items)
    ? list.items.filter((t: any) => t && t.parent_id == null)
    : [];

  const safeUsers = Array.isArray(users) ? users : [];

  const { dragAndDropHooks } = useDragAndDrop({
    getItems: (keys: any) =>
      [...keys].map((key) => {
        const task = list.getItem(key);
        console.log(task);
        return {
          "task/json": JSON.stringify({
            id: task.id,
            name: task.name,
            fromStatusId: status.id,
          }),
          "text/plain": task.name,
        };
      }),

    async onInsert(e: any) {
      try {
        const droppedItems = await Promise.all(
          e.items.map(async (item: any) => {
            const text = await item.getText("task/json");
            return JSON.parse(text);
          }),
        );

        const toStatusId = status.id;

        for (const task of droppedItems) {
          console.log("✅ Task berpindah:", {
            taskId: task.id,
            fromStatusId: task.fromStatusId,
            toStatusId,
          });

          // Update ke backend
          router.put(
            route("projects.groups.statuses.tasks.updateStatus", {
              project: project.id,
              projectGroup: group,
              status: status.id,
              task: task.id,
            }),
            {
              status_id: toStatusId,
            },
          );

          // Tambahkan ke list lokal (visual feedback)
          list.append(task);
        }
      } catch (error) {
        console.error("❌ Gagal saat onInsert:", error);
      }
    },
    onDragEnd: (e: any) => {
      if (e.dropOperation === "move") {
        list.remove(...e.keys);
      }
    },
  });

  return (
    <div
      className="w-full rounded-lg border p-4 bg-background"
      style={{ "--cols": "1fr 150px 120px 120px 80px" } as React.CSSProperties}
    >
      {/* header tetap sama */}
      <div className="grid [grid-template-columns:var(--cols)] gap-2 pb-2 pt-1 font-semibold text-sm text-muted-fg border-b">
        <div className="min-w-md">Name</div>
        <div className="text-left">Assign</div>
        <div className="text-left">Due Date</div>
        <div className="text-left">Priority</div>
        <div className="text-left">Actions</div>
      </div>

      {/* body: GridList sekarang dengan dragAndDropHooks */}
      <GridList
        aria-label={`Tasks for ${status.name}`}
        items={rootTasks ?? []}
        selectionMode="multiple"
        dragAndDropHooks={dragAndDropHooks}
        renderEmptyState={() => (
          <GridListEmptyState>
            No tasks here - add or drop some!
          </GridListEmptyState>
        )}
      >
        {(task: any) => (
          <GridListItem
            key={task.id}
            id={String(task.id)}
            className="flex items-center justify-between gap-2 w-full cursor-move hover:bg-muted/30 transition-colors rounded-md"
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

      {/* add task tetap sama */}
      {creatingTask ? (
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
      ) : (
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

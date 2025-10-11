import { Button } from "@/components/ui/button";
import { useForm } from "@inertiajs/react";
import { IconCheck, IconChevronRight, IconPlus } from "@intentui/icons";
import { useEffect, useRef, useState } from "react";
import { Input } from "react-aria-components";
import { twMerge } from "tailwind-merge";

export function TaskNameCell({
  task,
  level,
  hasChildren,
  creatingSubtask,
  expanded,
  setExpanded,
  setCreatingSubtask,
  editingTaskId,
  setEditingTaskId,
  form,
  inputRef,
  handleRenameTask,
}: any) {
  return (
    <div className="flex items-center justify-between">
      {/* Bagian kiri: expand + nama */}
      <div className="flex items-center gap-2">
        {hasChildren || creatingSubtask ? (
          <Button
            size="sm"
            intent="outline"
            aria-label={expanded ? "Collapse" : "Expand"}
            onPress={() => setExpanded((prev: any) => !prev)}
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

        {/* ✅ Nama / Input Rename */}
        {editingTaskId === task.id ? (
          <div className="flex items-center gap-2 rounded-md border-2 bg-foreground px-1">
            <Input
              ref={inputRef}
              value={form.data.name}
              onChange={(e) => form.setData("name", e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleRenameTask(task.id);
                if (e.key === "Escape") setEditingTaskId(null);
              }}
              className="flex-1 bg-transparent border-none outline-none focus:ring-0 text-sm text-blue-600 truncate"
              style={{
                width: `${Math.min(form.data.name.length * 8 + 20, 300)}px`,
              }}
            />
            <Button
              size="sm"
              type="button"
              onClick={() => handleRenameTask(task.id)}
              className="bg-bg hover:bg-foreground"
              aria-label="Save"
            >
              <IconCheck />
            </Button>
          </div>
        ) : (
          <span
            style={{ marginLeft: `${level * 16}px` }}
            className="truncate text-sm font-medium text-foreground"
          >
            {task.name}
          </span>
        )}
      </div>

      {/* Tombol Add Subtask */}
      <Button
        size="sm"
        intent="outline"
        className=" opacity-0 group-hover/task:opacity-100 transition-opacity"
        onPress={() => {
          if (!expanded) setExpanded(true);
          setCreatingSubtask(true);
        }}
      >
        <IconPlus className="size-4 text-muted-fg hover:text-foreground" />
      </Button>
    </div>
  );
}

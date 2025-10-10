import { Table } from "@/components/ui/table";
import { IconChevronRight } from "@intentui/icons";

interface Task {
  id: number | string;
  name: string;
  parent_id: number | string | null;
}

interface ListTaskProps {
  tasks: Task[];
  task: any;
  level: any;
}

export function StatusTask({ tasks }: ListTaskProps) {
  // Ambil root tasks (tanpa parent)
  const rootTasks = tasks.filter((t) => !t.parent_id);

  return (
    <>
      {rootTasks.map((task) => (
        <StatusTaskItem key={task.id} task={task} tasks={tasks} level={0} />
      ))}
    </>
  );
}

interface StatusTaskItemProps {
  task: Task;
  tasks: Task[];
  level: number; // untuk indentasi visual
}

function StatusTaskItem({ task, tasks, level }: StatusTaskItemProps) {
  const children = tasks.filter((t) => t.parent_id === task.id);

  return (
    <>
      {/* Row utama untuk task */}
      <Table.Row key={task.id}>
        <Table.Cell>
          <div className="flex items-center gap-2">
            {children.length > 0 && (
              <IconChevronRight className="size-4 text-gray-400" />
            )}
            <span
              className="text-sm text-foreground"
              style={{ marginLeft: `${level * 16}px` }} // indentasi dinamis
            >
              {task.name}
            </span>
          </div>
        </Table.Cell>
        <Table.Cell>Assign</Table.Cell>
      </Table.Row>

      {/* Render subtasks langsung di bawah task induk */}
      {children.map((child) => (
        <StatusTaskItem
          key={child.id}
          task={child}
          tasks={tasks}
          level={level + 1}
        />
      ))}
    </>
  );
}

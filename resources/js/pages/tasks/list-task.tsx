import { Button } from "@/components/ui/button";
import { Disclosure, DisclosurePanel } from "@/components/ui/disclosure";
import { Heading } from "@/components/ui/heading";
import { IconChevronRight } from "@intentui/icons";

interface Task {
  id: number | string;
  name: string;
  parent_id: number | string | null;
}

interface ListTaskProps {
  tasks: Task[];
}

export function ListTask({ tasks }: ListTaskProps) {
  // Ambil root tasks (tanpa parent)
  const rootTasks = tasks.filter((t) => !t.parent_id);

  return (
    <div>
      {rootTasks.map((task) => (
        <TaskItem key={task.id} task={task} tasks={tasks} />
      ))}
    </div>
  );
}

interface TaskItemProps {
  task: Task;
  tasks: Task[];
}

function TaskItem({ task, tasks }: TaskItemProps) {
  console.log(
    "Task:",
    task.id,
    "children:",
    tasks.filter((t) => t.parent_id === task.id)
  );
  const children = tasks.filter((t) => t.parent_id === task.id);

  return (
    <Disclosure>
      <div className="flex items-center gap-2">
        {children.length > 0 && (
          <Heading>
            <Button slot="trigger" intent="plain">
              <IconChevronRight className="size-4 cursor-pointer hover:text-gray-600" />
            </Button>
          </Heading>
        )}

        {/* Task name */}
        <Button intent="plain">{task.name}</Button>
      </div>

      {children.length > 0 && (
        <DisclosurePanel>
          <div className="ml-6">
            {children.map((child) => (
              <TaskItem key={child.id} task={child} tasks={tasks} />
            ))}
          </div>
        </DisclosurePanel>
      )}
    </Disclosure>
  );
}

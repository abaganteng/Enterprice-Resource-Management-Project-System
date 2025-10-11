import { Avatar } from "@/components/ui/avatar";
import { Dialog } from "@/components/ui/dialog";
import { ListBox } from "@/components/ui/list-box";
import { SearchField } from "@/components/ui/search-field";
import { Select, SelectItem, SelectTrigger } from "@/components/ui/select";
import { router, useForm } from "@inertiajs/react";
import { IconPerson, IconX } from "@intentui/icons";
import { Autocomplete, Popover } from "react-aria-components";
import { useFilter, usePress } from "react-aria";

interface Props {
  projectId: any;
  groupId: any;
  statusId: any;
  task: any;
  users: any;
}

export default function AssignTask({
  projectId,
  groupId,
  statusId,
  task,
  users,
}: Props) {
  const { contains } = useFilter({ sensitivity: "base" });
  const getInitials = (name: string) => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (
      parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
    ).toUpperCase();
  };

  const { put, data, setData, reset } = useForm({
    assigned_to: "" as string,
  });

  const handleAssign = (key: string | number, taskId: string | number) => {
    const userId = String(key);
    setData("assigned_to", userId);
    router.put(
      route("projects.groups.statuses.tasks.assign", {
        project: projectId,
        projectGroup: groupId,
        status: statusId,
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

  const handleRemoveAssignees = (
    assignId: number | string,
    taskId: number | string,
    data: any,
  ) => {
    router.post(
      route("projects.groups.statuses.tasks.assign.remove", {
        project: projectId,
        projectGroup: groupId,
        status: statusId,
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
          const updated = task.assignees.filter((u: any) => u.id !== assignId);
          task.assignees = updated;
          window.location.reload();
        },
      },
    );
  };

  return (
    <>
      <Select
        // placeholder={<IconPerson />}
        value={data.assigned_to}
        onChange={(key: any) => handleAssign(key, task.id)}
      >
        <SelectTrigger>
          {task.assignees && task.assignees.length > 0 ? (
            <div className="flex -space-x-1">
              {task.assignees.map((user: any) => {
                const { pressProps } = usePress({
                  onPress: (e: any) => {
                    e.continuePropagation();
                    handleRemoveAssignees(user.id, task.id, data);
                  },
                });

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
                {(item: any) => (
                  <SelectItem key={item.id} textValue={item.name}>
                    {item.name}
                  </SelectItem>
                )}
              </ListBox>
            </Autocomplete>
          </Dialog>
        </Popover>
      </Select>
    </>
  );
}

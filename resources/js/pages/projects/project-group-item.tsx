import { Container } from "@/components/ui/container";
import {
  Disclosure,
  DisclosurePanel,
  DisclosureTrigger,
} from "@/components/ui/disclosure";
import { GroupStatus } from "./groups/statuses/group-status";
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
  IconChevronRight,
  IconDotsHorizontal,
  IconDuplicate,
  IconEyeDropper,
  IconPlus,
  IconSlideAdd,
  IconTrash,
} from "@intentui/icons";
import { TextField } from "@/components/ui/text-field";
import { Input } from "react-aria-components";
import { Heading } from "@/components/ui/heading";
import { Button, buttonStyles } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { useForm } from "@inertiajs/react";
import { FormCreateGroupModal } from "./groups/form-create-group-modal";
import { NewStatusForm } from "./groups/statuses/new-status-form";
import { button } from "motion/react-m";
export function ProjectGroupItem({
  project,
  group,
  editingGroupId,
  setEditingGroupId,
}: any) {
  const [isOpen, setIsOpen] = useState(false);
  type RenameForm = { name: string };

  const form = useForm<RenameForm>({
    name: group.name,
  });
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [creatingStatusId, setCreatingStatusId] = useState<
    number | string | null
  >(null);

  useEffect(() => {
    if (editingGroupId === group.id && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingGroupId, group.id]);

  const getInputWidth = (text: string, font = "14px Inter", buffer = 12) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return buffer;
    ctx.font = font;
    return Math.min(ctx.measureText(text || "").width + buffer, 300);
  };

  const handleRenameSubmit = () => {
    form.put(
      route("projects.groups.rename", {
        project: project.id,
        group: group.id,
      }),
      {
        preserveScroll: true,
        onSuccess: () => setEditingGroupId(null),
      },
    );
  };

  return (
    <>
      <Disclosure key={group.id} className={"space-y-6"}>
        <div className="flex items-center gap-2">
          <DisclosureTrigger className={"hover:text-muted-fg cursor-pointer"} />
          <div className="flex flex-1 items-center gap-2 min-w-0">
            {editingGroupId === group.id ? (
              <Input
                ref={inputRef}
                value={form.data.name}
                onChange={(e) => form.setData("name", e.target.value)}
                onBlur={handleRenameSubmit}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleRenameSubmit();
                }}
                style={{
                  width: `${getInputWidth(form.data.name)}px`,
                  minWidth: "40px",
                  maxWidth: "100%",
                }}
                className="bg-transparent border-none outline-none focus:ring-0 text-sm text-blue-600 truncate"
              />
            ) : (
              <span className="text-sm text-foreground truncate cursor-default">
                {group.name}
              </span>
            )}

            <Menu>
              <MenuTrigger
                aria-label="Open Menu"
                className="p-0 cursor-pointer"
              >
                <IconDotsHorizontal className="w-4 h-4  hover:text-gray-600" />
              </MenuTrigger>
              <MenuContent
                popover={{
                  placement: "bottom",
                }}
              >
                <MenuItem
                  onAction={() => {
                    setEditingGroupId(group.id);
                    form.setData("name", group.name);
                  }}
                >
                  <IconEyeDropper className="cursor-pointer hover:text-gray-600" />
                  <MenuLabel>Rename</MenuLabel>
                </MenuItem>
                <MenuSeparator />
                <MenuSubmenu>
                  <MenuItem>
                    <IconPlus />
                    <MenuLabel>Create new</MenuLabel>
                  </MenuItem>
                  <MenuContent>
                    <MenuItem
                      onAction={() => {
                        setIsOpen(true);
                      }}
                    >
                      <IconSlideAdd />
                      <MenuLabel>List</MenuLabel>
                    </MenuItem>
                    <MenuItem onClick={() => setCreatingStatusId(group.id)}>
                      <IconPlus />
                      <MenuLabel>Add Status</MenuLabel>
                    </MenuItem>
                    <MenuSeparator />
                    <MenuSubmenu>
                      <MenuItem>
                        <MenuLabel>Import</MenuLabel>
                      </MenuItem>
                      <MenuContent>
                        <MenuItem>
                          <MenuLabel>Exels file</MenuLabel>
                        </MenuItem>
                        <MenuItem>
                          <MenuLabel>Pdf file</MenuLabel>
                        </MenuItem>
                      </MenuContent>
                    </MenuSubmenu>
                  </MenuContent>
                </MenuSubmenu>
                <MenuSeparator />
                <MenuItem>
                  <IconDuplicate />
                  <MenuLabel>Duplicate</MenuLabel>
                </MenuItem>
                <MenuItem isDanger>
                  <IconTrash />
                  <MenuLabel>Delete</MenuLabel>
                </MenuItem>
              </MenuContent>
            </Menu>
          </div>
        </div>

        <DisclosurePanel>
          <Container>
            {creatingStatusId === group.id && (
              <NewStatusForm
                project={project}
                group={group}
                onCancel={() => setCreatingStatusId(null)}
                onSuccess={() => setCreatingStatusId(null)}
              />
            )}
            <GroupStatus
              project={project}
              group={group.id}
              statuses={group.statuses ?? []}
            />
          </Container>
        </DisclosurePanel>
      </Disclosure>

      <FormCreateGroupModal
        open={isOpen}
        onOpenChange={() => setIsOpen(false)}
        project={project}
      />
    </>
  );
}

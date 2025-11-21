import { Button } from "@/components/ui/button";
import {
  MenuTrigger,
  MenuContent,
  MenuItem,
  MenuLabel,
  Menu,
} from "@/components/ui/menu";
import {
  Modal,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "@/components/ui/modal";
import { DepartmentData } from "@/types";
import { useForm } from "@inertiajs/react";
import { IconDotsHorizontal } from "@intentui/icons";
import { Pencil, Trash, UserCog, UserPlus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Input } from "react-aria-components";

interface DepartmentTitleProps {
  department: DepartmentData;
  editingDepartmentId: number | null;
  setEditingDepartmentId: (id: number | null) => void;
}

export function DepartmentTitle({
  department,
  editingDepartmentId,
  setEditingDepartmentId,
}: DepartmentTitleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<any>(null);
  type RenameForm = { name: string };

  const form = useForm<RenameForm>({
    name: department?.name || "",
  });

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (editingDepartmentId === department.id && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingDepartmentId, department.id]);

  const getInputWidth = (text: string, font = "14px Inter", buffer = 12) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return buffer;
    ctx.font = font;
    return Math.min(ctx.measureText(text || "").width + buffer, 300);
  };

  const handleRenameSubmit = () => {
    form.put(
      route("organizations.departments.rename", {
        department: department.id,
      }),
      {
        preserveScroll: true,
        onSuccess: () => setEditingDepartmentId(null),
      },
    );
  };
  return (
    <div className="flex w-full items-center justify-between gap-x-2">
      {editingDepartmentId === department.id ? (
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
        <span>{department.name}</span>
      )}
      <Menu>
        <MenuTrigger aria-label="Open Menu" className="p-0">
          <IconDotsHorizontal className="h-4 w-4 cursor-pointer hover:text-gray-600" />
        </MenuTrigger>
        <MenuContent>
          <MenuItem
            onAction={() => {
              setEditingDepartmentId(department.id);
              form.setData("name", department?.name || "");
            }}
          >
            <Pencil className="h-4 w-4 mr-2" />
            <MenuLabel>Rename</MenuLabel>
          </MenuItem>
          <MenuItem>
            {department.head ? (
              <UserCog className="h-4 w-4 mr-2" />
            ) : (
              <UserPlus className="h-4 w-4 mr-2" />
            )}
            <MenuLabel>
              {department.head ? "Change Head" : "Add Head"}
            </MenuLabel>
          </MenuItem>
          <MenuItem
            onAction={() => {
              setSelectedDepartment({ department: department.id });
              setIsOpen(true);
            }}
          >
            <Trash className="h-4 w-4 mr-2 text-red-500" />
            <MenuLabel>Delete</MenuLabel>
          </MenuItem>
        </MenuContent>
      </Menu>

      {selectedDepartment && (
        <Modal isOpen={isOpen} onOpenChange={() => setIsOpen(false)}>
          <ModalContent role="alertdialog">
            <ModalHeader>
              <ModalTitle>Delete Department?</ModalTitle>
              <ModalDescription>
                This will delete the department and all associated data. This
                action is permanent and cannot be undone.
              </ModalDescription>
            </ModalHeader>
            <ModalFooter>
              <ModalClose>Cancel</ModalClose>
              <Button
                intent="danger"
                onClick={() => {
                  form.delete(
                    route("organizations.departments.destroy", {
                      department: selectedDepartment.department,
                    }),
                    {
                      preserveScroll: true,
                      onSuccess: () => {
                        setIsOpen(false);
                        setSelectedDepartment(null);
                      },
                    },
                  );
                }}
              >
                Delete Department
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}

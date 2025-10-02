import {
  Modal,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "@/components/ui/modal";
import { TextField } from "@/components/ui/text-field";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { DateValue, parseDate } from "@internationalized/date";
import { ManageUserData } from "@/types";
import { Dialog } from "@/components/ui/dialog";
import { Autocomplete, useFilter, Popover } from "react-aria-components";
import { SearchField } from "@/components/ui/search-field";
import { ListBox } from "@/components/ui/list-box";
import { DatePicker } from "@/components/ui/date-picker";

interface CreateProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: any;
}

export function FormCreateGroupModal({
  open,
  onOpenChange,
  project,
}: CreateProjectModalProps) {
  const { data, setData, reset, post, errors } = useForm({
    project_id: project.id,
    name: "",
  });

  const submit = (e: any) => {
    e.preventDefault();
    post(route("projects.groups.create", { project: project.id }), {
      preserveScroll: true,
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <Modal isOpen={open} onOpenChange={onOpenChange}>
      <ModalContent isBlurred>
        {({ close }) => (
          <>
            <ModalHeader>
              <ModalTitle>Create List</ModalTitle>
              <ModalDescription>Create a new list</ModalDescription>
            </ModalHeader>

            <ModalBody>
              <TextField
                autoFocus
                aria-label="Name"
                label="List Name"
                placeholder="Enter list name"
                value={data.name}
                onChange={(v) => setData("name", v)}
                isRequired
                errorMessage={errors.name}
              />
            </ModalBody>

            <ModalFooter>
              <ModalClose>Cancel</ModalClose>
              <Button onPress={close} onClick={submit}>
                Continue
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

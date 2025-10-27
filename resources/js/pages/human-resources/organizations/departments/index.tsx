import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
} from "@/components/ui/description-list";
import {
  Disclosure,
  DisclosurePanel,
  DisclosureTrigger,
} from "@/components/ui/disclosure";
import { Heading } from "@/components/ui/heading";
import { Menu } from "@/components/ui/menu";
import { Table } from "@/components/ui/table";
import HumanResourcesNav from "@/layouts/human-resource-nav";
import { DepartmentData } from "@/types";
import { useForm } from "@inertiajs/react";
import { IconDotsHorizontal, IconEyeDropper, IconPlus } from "@intentui/icons";
import {
  EllipsisVerticalIcon,
  Pencil,
  Trash,
  UserCog,
  UserPlus,
  Users,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { DepartmentTitle } from "./department-title";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/text-field";
import { Input } from "@/components/ui/field";
import { CreatePositionByDepartment } from "../positions/create-position-by-department";
import { EditPositionByDepartment } from "../positions/edit-position-by-department";

interface Props {
  departments: DepartmentData[];
}

export default function Index({ departments }: Props) {
  const [editingDepartmentId, setEditingDepartmentId] = useState<number | null>(
    null,
  );
  const [selectedPosition, setSelectedPosition] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm();

  return (
    <div className="p-4 lg:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {departments.map((department) => (
          <Card key={department.id}>
            <Card.Header>
              <Card.Title>
                <DepartmentTitle
                  editingDepartmentId={editingDepartmentId}
                  department={department}
                  setEditingDepartmentId={setEditingDepartmentId}
                />
              </Card.Title>
              <Card.Description>Head: {department.head?.name}</Card.Description>
            </Card.Header>

            <Card.Content className="flex flex-col gap-y-4">
              <div className="flex">
                <Badge>{department.employees?.length} Total Employees</Badge>
              </div>
              <Disclosure className="space-y-2">
                <div className="flex w-full items-center justify-between">
                  <DisclosureTrigger className="!justify-start gap-x-2">
                    <span className="font-medium">
                      Positions in this department
                    </span>
                  </DisclosureTrigger>
                  <CreatePositionByDepartment department={department} />
                </div>

                <DisclosurePanel>
                  <Container>
                    <div className="rounded-lg border p-4">
                      <DescriptionList>
                        {department.positions?.map((position) => (
                          <>
                            <DescriptionTerm>{position.name}</DescriptionTerm>
                            <DescriptionDetails>
                              <div className="flex items-center justify-between gap-x-4">
                                <div className="flex flex-col">
                                  <span className="text-sm text-gray-500">
                                    {new Intl.NumberFormat("en-US", {
                                      style: "currency",
                                      currency: "USD",
                                    }).format(position.base_salary ?? 0)}
                                  </span>
                                  <span>
                                    {position.employees?.length} Employee
                                  </span>
                                </div>
                                <div className="flex items-center">
                                  <EditPositionByDepartment
                                    position={position}
                                  />
                                  <Button
                                    intent="plain"
                                    onPress={() => {
                                      setSelectedPosition(position.id);
                                      setIsOpen(true);
                                    }}
                                  >
                                    <Trash className="w-4 h-4 text-red-500" />
                                  </Button>
                                </div>
                              </div>
                            </DescriptionDetails>
                          </>
                        ))}
                      </DescriptionList>
                    </div>
                  </Container>
                </DisclosurePanel>
              </Disclosure>
            </Card.Content>

            <Card.Footer />
          </Card>
        ))}
      </div>

      {selectedPosition && (
        <Modal isOpen={isOpen} onOpenChange={() => setIsOpen(false)}>
          <Modal.Content role="alertdialog">
            <Modal.Header>
              <Modal.Title>Delete Position?</Modal.Title>
              <Modal.Description>
                This will delete the position and all associated data. This
                action is permanent and cannot be undone.
              </Modal.Description>
            </Modal.Header>
            <Modal.Footer>
              <Modal.Close>Cancel</Modal.Close>
              <Button
                intent="danger"
                onClick={() => {
                  form.delete(
                    route("organizations.department.position.destroy", {
                      position: selectedPosition,
                    }),
                    {
                      preserveScroll: true,
                      onSuccess: () => {
                        setIsOpen(false);
                        setSelectedPosition(null);
                      },
                    },
                  );
                }}
              >
                Delete Department
              </Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      )}
    </div>
  );
}

// gunakan ProjectLayout, bukan AppLayout
Index.layout = (page: any) => (
  <HumanResourcesNav project={page.props.project}>{page}</HumanResourcesNav>
);

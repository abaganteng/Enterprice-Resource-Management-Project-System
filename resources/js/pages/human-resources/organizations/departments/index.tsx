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
import HumanResourcesNav from "@/layouts/human-resource-nav";
import { DepartmentData } from "@/types";
import { useForm } from "@inertiajs/react";
import { Trash } from "lucide-react";
import { useState } from "react";
import { DepartmentTitle } from "./department-title";
import {
  Modal,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { CreatePositionByDepartment } from "../positions/create-position-by-department";
import { EditPositionByDepartment } from "../positions/edit-position-by-department";
import { Link } from "@/components/ui/link";
import { IconEye, IconTrash } from "@intentui/icons";

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
                              <div className="flex items-center justify-between gap-x-3">
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
                                    className=" fill-red-500"
                                  >
                                    <IconTrash />
                                  </Button>
                                </div>
                                <Link
                                  href={route("organizations.employees", {
                                    department_id: department.id,
                                    position_id: position.id,
                                  })}
                                >
                                  <IconEye />
                                </Link>
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
          <ModalContent role="alertdialog">
            <ModalHeader>
              <ModalTitle>Delete Position?</ModalTitle>
              <ModalDescription>
                This will delete the position and all associated data. This
                action is permanent and cannot be undone.
              </ModalDescription>
            </ModalHeader>
            <ModalFooter>
              <ModalClose>Cancel</ModalClose>
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
                Delete Position
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}

// gunakan ProjectLayout, bukan AppLayout
Index.layout = (page: any) => (
  <HumanResourcesNav project={page.props.project}>{page}</HumanResourcesNav>
);

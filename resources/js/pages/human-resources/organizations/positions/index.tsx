import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Menu } from "@/components/ui/menu";
import { Modal } from "@/components/ui/modal";
import {
  Pagination,
  PaginationNext,
  PaginationLast,
  PaginationList,
  PaginationFirst,
  PaginationPrevious,
  PaginationSection,
  PaginationItem,
  PaginationInfo,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import HumanResourcesNav from "@/layouts/human-resource-nav";
import { DepartmentData, PositionData } from "@/types";
import { router, useForm } from "@inertiajs/react";
import { EllipsisVerticalIcon, EyeIcon, Pencil, TrashIcon } from "lucide-react";
import { usePaginator } from "momentum-paginator";
import { Key, useState } from "react";
import { CreatePositionModal } from "./create-position-modal";
import { EditPositionModal } from "./edit-position-modal";

interface Props {
  positions: Paginator<PositionData>;
  departments: DepartmentData[];
  filters: {
    department_id?: number;
  };
}

export default function Index({ positions, departments, filters }: Props) {
  const { from, to, total, previous, next, pages } = usePaginator(positions);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<any>(null);
  const [action, setAction] = useState<"update" | "delete" | null>(null);

  const form = useForm();

  const handleFilterChange =
    (filter: keyof Props["filters"]) => (value: Key | null) => {
      const v = value == null || value === "" ? undefined : Number(value);
      router.get(
        route("organizations.positions", {
          [filter]: v,
        }),
      );
    };

  return (
    <>
      <Card className="[--card-spacing:var(--gutter)] p-4">
        <Card.Header className="pb-3">
          <Card.Title>Positions</Card.Title>
          <div className="flex items-center justify-between">
            <Card.Description>
              Manage positions, levels, and salaries.
            </Card.Description>
            <CreatePositionModal departments={departments} />
          </div>
        </Card.Header>
        <Card.Content>
          <Table
            bleed
            className="[--gutter:var(--card-spacing)] sm:[--gutter:var(--card-spacing)]"
            aria-label="Users"
          >
            <TableHeader>
              <TableColumn className="w-0">#</TableColumn>
              <TableColumn isRowHeader>Name</TableColumn>
              <TableColumn>
                <div className="flex flex-col items-center gap-2">
                  <span className="flex justify-center">Department</span>
                  <Select
                    aria-label="Department"
                    placeholder="Filter by department"
                    value={filters.department_id?.toString()}
                    onChange={handleFilterChange("department_id")}
                  >
                    <SelectTrigger />
                    <SelectContent
                      items={departments.map((department: DepartmentData) => ({
                        id: department.id || "",
                        name: department.name || "",
                      }))}
                    >
                      {(item) => (
                        <SelectItem id={item.id} textValue={item.name}>
                          {item.name}
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </TableColumn>
              <TableColumn>Salary</TableColumn>
              <TableColumn>Total Employee</TableColumn>
              <TableColumn />
            </TableHeader>
            <TableBody>
              {positions.data.length > 0 ? (
                positions.data.map((position: PositionData) => (
                  <TableRow id={position.id} key={position.id}>
                    <TableCell>{position.id}</TableCell>
                    <TableCell>{position.name}</TableCell>
                    <TableCell>{position.department.name}</TableCell>
                    <TableCell>
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(position.base_salary ?? 0)}
                    </TableCell>
                    <TableCell>{position.employees?.length || 0}</TableCell>
                    <TableCell className="text-end last:pr-2.5">
                      <Menu>
                        <Menu.Trigger>
                          <EllipsisVerticalIcon />
                        </Menu.Trigger>
                        <Menu.Content placement="left top">
                          <Menu.Item>
                            <EyeIcon className="w-4 h-4" /> View
                          </Menu.Item>
                          <Menu.Item
                            key={`update-${position.id}`}
                            onAction={() => {
                              setSelectedPosition(position);
                              setAction("update");
                              setIsOpen(true);
                            }}
                          >
                            <Pencil className="w-4 h-4" /> Edit
                          </Menu.Item>
                          <Menu.Separator />
                          <Menu.Item
                            key={`delete-${position.id}`}
                            onAction={() => {
                              setSelectedPosition(position.id);
                              setAction("delete");
                              setIsOpen(true);
                            }}
                          >
                            <TrashIcon className="w-4 h-4 text-red-500" />{" "}
                            Delete
                          </Menu.Item>
                        </Menu.Content>
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">
                    No data available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card.Content>
        <Card.Footer>
          <Pagination className="flex flex-col items-center">
            <PaginationList className="hidden md:flex">
              <PaginationFirst href={previous?.url ?? ""} />
              <PaginationPrevious href={previous?.url ?? ""} />
              <PaginationSection>
                {pages.map((page) =>
                  page.isPage ? (
                    <PaginationItem
                      key={page.label}
                      isCurrent={page.isCurrent}
                      href={page.url ?? ""}
                    >
                      {page.label}
                    </PaginationItem>
                  ) : (
                    <PaginationItem />
                  ),
                )}
              </PaginationSection>

              <PaginationNext href={next?.url ?? ""} />
              <PaginationLast href={next?.url ?? ""} />
            </PaginationList>

            <PaginationList className="md:hidden">
              <PaginationFirst href={previous?.url ?? ""} />
              <PaginationPrevious href={previous?.url ?? ""} />
              <PaginationSection className="rounded-(--section-radius) border px-3 *:min-w-4">
                {pages.map((page) =>
                  page.isPage ? (
                    <PaginationItem
                      key={page.label}
                      isCurrent={page.isCurrent}
                      href={page.url ?? ""}
                    >
                      {page.label}
                    </PaginationItem>
                  ) : (
                    <PaginationItem />
                  ),
                )}
              </PaginationSection>
              <PaginationNext href={next?.url ?? ""} />
              <PaginationLast href={next?.url ?? ""} />
            </PaginationList>
            <PaginationInfo className="flex items-center justify-center">
              Showing {from} to {to} of {total} items
            </PaginationInfo>
          </Pagination>
        </Card.Footer>
      </Card>

      {selectedPosition && action === "update" && (
        <EditPositionModal
          open={isOpen}
          onOpenChange={setIsOpen}
          position={selectedPosition}
          departments={departments}
        />
      )}

      {selectedPosition && action === "delete" && (
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
                    route("organizations.position.destroy", {
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
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      )}
    </>
  );
}

// gunakan ProjectLayout, bukan AppLayout
Index.layout = (page: any) => (
  <HumanResourcesNav project={page.props.project}>{page}</HumanResourcesNav>
);

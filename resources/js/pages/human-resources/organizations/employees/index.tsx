import { Card } from "@/components/ui/card";
import { Menu } from "@/components/ui/menu";
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
import { DepartmentData, EmployeeData, PositionData } from "@/types";
import { router, useForm } from "@inertiajs/react";
import { EllipsisVerticalIcon, EyeIcon, Pencil, TrashIcon } from "lucide-react";
import { usePaginator } from "momentum-paginator";
import { Key, useState } from "react";
import { CreateEmployeeModal } from "./create-employee-modal";
import EmployeeNav from "@/layouts/employee-nav";
import { SearchField, SearchInput } from "@/components/ui/search-field";
import { Link } from "@/components/ui/link";

interface Props {
  employees: Paginator<EmployeeData>;
  departments: DepartmentData[];
  positions: PositionData[];
  filters: {
    department_id?: number;
    position_id?: number;
  };
}

export default function Index({
  employees,
  departments,
  positions,
  filters,
}: Props) {
  const { from, to, total, previous, next, pages } = usePaginator(employees);
  console.log(employees);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [action, setAction] = useState<"detail" | "delete" | null>(null);

  const form = useForm();

  const handleFilterChange =
    (filter: keyof Props["filters"]) => (value: Key | null) => {
      const v = value == null || value === "" ? undefined : Number(value);
      router.get(
        route("organizations.employees", {
          [filter]: v,
        }),
      );
    };

  return (
    <>
      <Card className="[--card-spacing:var(--gutter)] p-4">
        <Card.Header className="pb-3">
          <Card.Title>Employees</Card.Title>
          <div className="flex items-center justify-between">
            <Card.Description>
              Manage employees, their positions, and salaries.
            </Card.Description>
            <CreateEmployeeModal
              departments={departments}
              positions={positions}
            />
          </div>
          <SearchField
            aria-label="Search"
            className={"flex justify-center items-center py-4"}
          >
            <SearchInput placeholder="Search Employee..." />
          </SearchField>
        </Card.Header>
        <Card.Content>
          <Table
            bleed
            className="[--gutter:var(--card-spacing)] sm:[--gutter:var(--card-spacing)]"
            aria-label="Users"
          >
            <TableHeader>
              <TableColumn className="w-0">#</TableColumn>
              <TableColumn
                className={"flex items-center justify-center"}
                isRowHeader
              >
                Name
              </TableColumn>
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
              <TableColumn>
                <div className="flex flex-col items-center gap-2">
                  <span className="flex justify-center">Position</span>
                  <Select
                    aria-label="Position"
                    placeholder="Filter by position"
                    value={filters.position_id?.toString()}
                    onChange={handleFilterChange("position_id")}
                  >
                    <SelectTrigger />
                    <SelectContent
                      items={positions.map((position: PositionData) => ({
                        id: position.id || "",
                        name: position.name || "",
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
              <TableColumn />
            </TableHeader>
            <TableBody>
              {employees.data.length > 0 ? (
                employees.data.map((employee: EmployeeData) => (
                  <TableRow key={employee.id}>
                    <TableCell>{employee.id}</TableCell>
                    <TableCell className={"flex flex-col items-center"}>
                      <Link
                        className={"cursor-pointer hover:text-primary"}
                        key={`detail-${employee.id}`}
                        onClick={() => {
                          router.visit(
                            route("organizations.employees.show", {
                              employee: employee.id,
                            }),
                            {
                              preserveState: true,
                              preserveScroll: true,
                            },
                          );
                        }}
                      >
                        <div className="flex flex-col items-center">
                          <span className="font-bold text-base">
                            {employee.name}
                          </span>
                          <span className="text-sm text-gray-500">
                            {employee.email}
                          </span>
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell>{employee.department?.name}</TableCell>
                    <TableCell>{employee.position?.name}</TableCell>
                    <TableCell>
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(employee.position?.base_salary ?? 0)}
                    </TableCell>
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
                          // key={`update-${employee.id}`}
                          // onAction={() => {
                          //   setSelectedPosition(employee.position);
                          //   setAction("update");
                          //   setIsOpen(true);
                          // }}
                          >
                            <Pencil className="w-4 h-4" /> Edit
                          </Menu.Item>
                          <Menu.Separator />
                          <Menu.Item
                          // key={`delete-${employee.id}`}
                          // onAction={() => {
                          //   setSelectedPosition(employee.position);
                          //   setAction("delete");
                          //   setIsOpen(true);
                          // }}
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
          <Pagination className="flex flex-col items-center py-3">
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

      {/* {selectedPosition && action === "update" && (
        <EditPositionModal
          open={isOpen}
          onOpenChange={setIsOpen}
          position={selectedPosition}
          departments={departments}
        />
      )}

       
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
      )} */}
    </>
  );
}

// gunakan ProjectLayout, bukan AppLayout
Index.layout = (page: any) => (
  <EmployeeNav project={page.props.project}>{page}</EmployeeNav>
);

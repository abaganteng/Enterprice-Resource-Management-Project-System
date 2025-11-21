import { Card } from "@/components/ui/card";
import {
  Menu,
  MenuContent,
  MenuItem,
  MenuLabel,
  MenuSeparator,
  MenuTrigger,
} from "@/components/ui/menu";
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
import {
  DepartmentData,
  EmployeeContractData,
  EmployeeData,
  PositionData,
} from "@/types";
import { router, useForm } from "@inertiajs/react";
import { EllipsisVerticalIcon, EyeIcon, Pencil, TrashIcon } from "lucide-react";
import { usePaginator } from "momentum-paginator";
import { Key, useState } from "react";
import EmployeeNav from "@/layouts/employee-nav";
import { SearchField, SearchInput } from "@/components/ui/search-field";
import { Link } from "@/components/ui/link";
import { Badge } from "@/components/ui/badge";
import {
  IconDotsVertical,
  IconEye,
  IconEyeDropper,
  IconTrash,
} from "@intentui/icons";
import { CreateEmployeeModal } from "../employees/create-employee-modal";
import ContractNav from "@/layouts/contract-nav";

interface Props {
  contracts: Paginator<EmployeeContractData>;
  // departments: DepartmentData[];
  // positions: PositionData[];
  // filters: {
  //   department_id?: number;
  //   position_id?: number;
  // };
}

export default function Index({ contracts }: Props) {
  const { from, to, total, previous, next, pages } = usePaginator(contracts);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState<any>(null);
  const [action, setAction] = useState<"detail" | "delete" | null>(null);

  const form = useForm();

  // const handleFilterChange =
  //   (filter: keyof Props["filters"]) => (value: Key | null) => {
  //     const v = value == null || value === "" ? undefined : Number(value);
  //     router.get(
  //       route("organizations.employees", {
  //         [filter]: v,
  //       }),
  //     );
  //   };

  return (
    <>
      <Card className="[--card-spacing:var(--gutter)] p-4">
        <Card.Header className="pb-3">
          <Card.Title>Contracts</Card.Title>
          <div className="flex items-center justify-between">
            <Card.Description>
              Manage contracts, their positions, and salaries.
            </Card.Description>
            {/* <CreateContractModal
              departments={departments}
              positions={positions}
            /> */}
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
              <TableColumn className="w-0">Employee Name</TableColumn>

              <TableColumn
                className={"flex items-center justify-center"}
                isRowHeader
              >
                Position
              </TableColumn>
              <TableColumn>Contract Type</TableColumn>
              <TableColumn>Contract Term</TableColumn>
              <TableColumn />
            </TableHeader>
            <TableBody>
              {contracts.data.length > 0 ? (
                contracts.data.map((contract: EmployeeContractData) => (
                  <TableRow key={contract.id}>
                    <TableCell>{contract.id}</TableCell>
                    <TableCell className={"flex flex-col items-center"}>
                      <Link
                        className={"cursor-pointer hover:text-primary"}
                        key={`detail-${contract.employee?.id}`}
                        onClick={() => {
                          router.visit(
                            route("organizations.employees.profile", {
                              employee: contract.employee?.id,
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
                            {contract.employee?.name}
                          </span>
                          <span className="text-xs text-gray-500">
                            {contract.employee?.email}
                          </span>
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell>{contract.employee?.position?.name}</TableCell>
                    <TableCell>{contract.contract_type}</TableCell>
                    <TableCell>
                      {(() => {
                        if (!contract.start_date || !contract.end_date) {
                          return "-";
                        }

                        const start = new Date(contract.start_date);
                        const end = new Date(contract.end_date);

                        // hitung total bulan dan hari
                        const years = end.getFullYear() - start.getFullYear();
                        const months =
                          end.getMonth() - start.getMonth() + years * 12;
                        const days = Math.floor(
                          (end.getTime() - start.getTime()) /
                            (1000 * 60 * 60 * 24),
                        );

                        // konversi ke format yang mudah dibaca
                        if (months < 1) {
                          return `${days} hari`;
                        } else if (months < 12) {
                          return `${months} bulan (${days} hari)`;
                        } else {
                          const yearCount = Math.floor(months / 12);
                          const remainingMonths = months % 12;
                          return `${yearCount} thn${remainingMonths ? ` ${remainingMonths} bln` : ""}`;
                        }
                      })()}
                    </TableCell>

                    <TableCell className="text-end last:pr-2.5">
                      <Menu>
                        <MenuTrigger>
                          <IconDotsVertical />
                        </MenuTrigger>
                        <MenuContent placement="left top">
                          <MenuItem
                            href={route("organizations.employees.profile", {
                              employee: contract.employee?.id,
                            })}
                          >
                            <IconEye />
                            <MenuLabel>View</MenuLabel>
                          </MenuItem>
                          <MenuItem
                          // key={`update-${employee.id}`}
                          // onAction={() => {
                          //   setSelectedPosition(employee.position);
                          //   setAction("update");
                          //   setIsOpen(true);
                          // }}
                          >
                            <IconEyeDropper />
                            <MenuLabel>Edit</MenuLabel>
                          </MenuItem>
                          <MenuSeparator />
                          <MenuItem
                            // key={`delete-${employee.id}`}
                            // onAction={() => {
                            //   setSelectedPosition(employee.position);
                            //   setAction("delete");
                            //   setIsOpen(true);
                            // }}
                            intent="danger"
                          >
                            <IconTrash />
                            <MenuLabel>Delete</MenuLabel>
                          </MenuItem>
                        </MenuContent>
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
  <ContractNav project={page.props.project}>{page}</ContractNav>
);

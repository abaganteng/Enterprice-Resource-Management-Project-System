import { Card } from "@/components/ui/card";
import { EmployeeContractData, EmployeeData } from "@/types";
import { useForm } from "@inertiajs/react";
import EmployeeShowNav from "@/layouts/employee-show-nav";
import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
} from "@/components/ui/description-list";
import { GridList, GridListItem } from "@/components/ui/grid-list";
import { Resizable } from "re-resizable";
import {
  IconChevronRight,
  IconChevronsY,
  IconCirclePerson,
} from "@intentui/icons";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Label } from "react-aria-components";
import {
  Navbar,
  NavbarInset,
  NavbarItem,
  NavbarSeparator,
  NavbarSpacer,
  NavbarStart,
} from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";
import NavbarEmployee from "./navbar-employee";

interface Props {
  employee: EmployeeData;
  //   departments: DepartmentData[];
  //   positions: PositionData[];
  //   filters: {
  //     department_id?: number;
  //     position_id?: number;
  //   };
}

const employeeNavItems = [
  { id: "overview", label: "Overview" },
  { id: "contracts", label: "Contracts" },
  { id: "attendance", label: "Attendance" },
  { id: "salary", label: "Salary" },
  { id: "leave", label: "Leave" },
  { id: "performance", label: "Performance" },
];

export default function Show({ employee }: Props) {
  const form = useForm();

  return (
    <>
      <NavbarEmployee employee={employee} />

      <Card className="[--card-spacing:var(--gutter)] p-4 w-full h-[100dvh]">
        {/* <Card.Header className="pb-3">
          <Card.Title className="text-lg">Biodata {employee.name}</Card.Title>
          <Card.Description>{employee.email}</Card.Description>
        </Card.Header> */}

        <Card.Content>
          <div className="flex flex-col md:flex-row gap-6 w-full">
            {/* Bagian kiri: Avatar dan info singkat */}
            <div className="flex flex-col items-center md:w-1/4">
              <Avatar
                src={"https://intentui.com/images/avatar/cobain.jpg"}
                alt={employee?.name || "-"}
                size="xl"
                isSquare
              />
              <Badge
                color={
                  employee?.status === "active"
                    ? "green"
                    : employee?.status === "inactive"
                      ? "gray"
                      : employee?.status === "terminated"
                        ? "red"
                        : "orange"
                }
                className="mt-3"
              >
                {employee?.status?.toUpperCase()}
              </Badge>

              {/* Department & Position */}
              <GridList
                aria-label="Department and Position"
                selectionMode="none"
                className="w-full mt-6"
                items={[
                  { id: "department", name: employee?.department?.name || "-" },
                  { id: "position", name: employee?.position?.name || "-" },
                ]}
              >
                {(item) => (
                  <GridListItem id={item.id} className="text-center text-sm">
                    {item.name}
                  </GridListItem>
                )}
              </GridList>
            </div>

            {/* Bagian kanan: Detail employee */}
            <div className="flex-1 w-full md:w-3/4">
              <Label className="mb-4 text-center md:text-left">
                {employee?.name}
              </Label>

              <DescriptionList
                className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2"
                aria-label="Employee details"
              >
                <DescriptionTerm>Employee Code</DescriptionTerm>
                <DescriptionDetails>
                  {employee?.employee_code || "-"}
                </DescriptionDetails>

                <DescriptionTerm>Email</DescriptionTerm>
                <DescriptionDetails>
                  {employee?.email || employee?.user?.email || "-"}
                </DescriptionDetails>

                <DescriptionTerm>Phone</DescriptionTerm>
                <DescriptionDetails>
                  {employee?.phone || "-"}
                </DescriptionDetails>

                <DescriptionTerm>Address</DescriptionTerm>
                <DescriptionDetails>
                  {employee?.address || "-"}
                </DescriptionDetails>

                <DescriptionTerm>Gender</DescriptionTerm>
                <DescriptionDetails>
                  {employee?.gender || "-"}
                </DescriptionDetails>

                <DescriptionTerm>Date of Birth</DescriptionTerm>
                <DescriptionDetails>
                  {employee?.date_of_birth
                    ? new Date(employee.date_of_birth).toLocaleDateString()
                    : "-"}
                </DescriptionDetails>

                <DescriptionTerm>Join Date</DescriptionTerm>
                <DescriptionDetails>
                  {employee?.join_date
                    ? new Date(employee.join_date).toLocaleDateString()
                    : "-"}
                </DescriptionDetails>

                <DescriptionTerm>Status</DescriptionTerm>
                <DescriptionDetails>
                  {employee?.status?.toUpperCase() || "-"}
                </DescriptionDetails>
              </DescriptionList>
            </div>
          </div>
        </Card.Content>

        <Card.Footer></Card.Footer>
      </Card>
    </>
  );
}

const items = [
  {
    id: "1",
    name: "2022-03-15 - Present ",
    description: "HR Manager - HR Department",
  },
  {
    id: "2",
    name: "2023-01-01 - 2024-12-31",
    description: "IT Manager - IT Department",
  },
  {
    id: "3",
    name: "2020-01-01 - 2022-12-31",
    description: "IT Support - IT Department",
  },
  {
    id: "4",
    name: "2019-01-01 - 2021-12-31",
    description: "IT Support - IT Department",
  },
  {
    id: "5",
    name: "2018-01-01 - 2018-12-31",
    description: "IT Support - IT Department",
  },
  {
    id: "6",
    name: "2017-01-01 - 2017-12-31",
    description: "IT Support - IT Department",
  },
];

Show.layout = (page: any) => (
  <EmployeeShowNav project={page.props.project}>{page}</EmployeeShowNav>
);

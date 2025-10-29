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
import { IconChevronRight } from "@intentui/icons";
import { Badge } from "@/components/ui/badge";

interface Props {
  employee: EmployeeData;
  //   departments: DepartmentData[];
  //   positions: PositionData[];
  //   filters: {
  //     department_id?: number;
  //     position_id?: number;
  //   };
}

export default function Show({ employee }: Props) {
  const form = useForm();

  return (
    <>
      <div className="flex justify-between px-2">
        <Card className="[--card-spacing:var(--gutter)] p-4 w-full h-[100dvh]">
          <Card.Header className="pb-3">
            <Card.Title className="text-lg">{employee.name}</Card.Title>
            <Card.Description>{employee.email}</Card.Description>
          </Card.Header>
          <Card.Content>
            <DescriptionList>
              <DescriptionTerm>Employee Code</DescriptionTerm>
              <DescriptionDetails>{employee?.employee_code}</DescriptionDetails>
              <DescriptionTerm>Status</DescriptionTerm>
              <DescriptionDetails className="capitalize">
                {employee?.status}
              </DescriptionDetails>
              <DescriptionTerm>Department</DescriptionTerm>
              <DescriptionDetails>
                {employee.department?.name}
              </DescriptionDetails>
              <DescriptionTerm>Position</DescriptionTerm>
              <DescriptionDetails>{employee.position?.name}</DescriptionDetails>
              <DescriptionTerm>Join Date</DescriptionTerm>
              <DescriptionDetails>{employee?.join_date}</DescriptionDetails>
              <DescriptionTerm>Contract Type</DescriptionTerm>
              <DescriptionDetails className="capitalize">
                {(
                  Object.values(
                    employee?.contracts ?? {},
                  ) as EmployeeContractData[]
                ).find((contract) => contract.has_active_contract)
                  ?.contract_type ?? "-"}
              </DescriptionDetails>
              <DescriptionTerm>Contract</DescriptionTerm>
              <DescriptionDetails>
                {(
                  Object.values(
                    employee?.contracts ?? {},
                  ) as EmployeeContractData[]
                ).map((contract: EmployeeContractData) => (
                  <>
                    <div className="flex items-center justify-baseline">
                      {contract.start_date} - {contract.end_date}
                      <Badge className="mx-2 text-sm capitalize ">
                        {contract.status}
                      </Badge>
                    </div>
                  </>
                ))}
              </DescriptionDetails>
              <DescriptionTerm>Phone</DescriptionTerm>
              <DescriptionDetails>{employee?.phone}</DescriptionDetails>
              <DescriptionTerm>Address</DescriptionTerm>
              <DescriptionDetails>{employee?.address}</DescriptionDetails>
              <DescriptionTerm>Gender</DescriptionTerm>
              <DescriptionDetails className="capitalize">
                {employee?.gender}
              </DescriptionDetails>
              <DescriptionTerm>Birth Date</DescriptionTerm>
              <DescriptionDetails>{employee?.date_of_birth}</DescriptionDetails>
            </DescriptionList>
          </Card.Content>
          <Card.Footer></Card.Footer>
        </Card>
        <Resizable
          defaultSize={{
            width: 500,
            height: 500,
          }}
          minWidth={300}
          minHeight={300}
          maxWidth={700}
          maxHeight={500}
          className="border rounded-xl bg-background shadow-sm p-0"
          enable={{
            top: false,
            right: false,
            bottom: false,
            left: true,
            topRight: false,
            bottomRight: false,
            bottomLeft: false,
            topLeft: false,
          }}
        >
          <Card className="[--card-spacing:var(--gutter)] p-4 w-full">
            <Card.Header className="pb-3">
              <Card.Title>{employee.name} Timeline</Card.Title>
            </Card.Header>
            <Card.Content>
              <GridList
                selectionMode="single"
                items={items}
                aria-label="Select your favorite bands"
                className="min-w-64"
              >
                {(item) => (
                  <>
                    <GridListItem id={item.id}>
                      <IconChevronRight />
                      <div className="flex flex-col">
                        <span className="font-bold">{item.name}</span>
                        <span>{item.description}</span>
                      </div>
                    </GridListItem>
                  </>
                )}
              </GridList>
            </Card.Content>
            <Card.Footer></Card.Footer>
          </Card>
        </Resizable>
      </div>
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

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EmployeeContractData, EmployeeData } from "@/types";
import { useForm } from "@inertiajs/react";
import EmployeeShowNav from "@/layouts/employee-show-nav";
import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
} from "@/components/ui/description-list";
import { GridList, GridListItem } from "@/components/ui/grid-list";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Label } from "react-aria-components";
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

interface ContractProps {
  employee: EmployeeData;
  contracts: EmployeeContractData[];
}

export default function Contract({ employee, contracts }: ContractProps) {
  const form = useForm();
  console.log(employee);

  return (
    <>
      <NavbarEmployee employee={employee} />

      <Card className="[--card-spacing:var(--gutter)] p-4 w-full h-[100dvh]">
        <CardHeader>
          <CardTitle>Contract</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          {contracts.length > 0 ? (
            contracts?.map((contract: EmployeeContractData) => (
              <DescriptionList key={contract.id}>
                <DescriptionTerm>Contract Type</DescriptionTerm>
                <DescriptionDetails>
                  {contract.contract_type}
                </DescriptionDetails>
                <DescriptionTerm>Start Date</DescriptionTerm>
                <DescriptionDetails>{contract.start_date}</DescriptionDetails>
                <DescriptionTerm>End Date</DescriptionTerm>
                <DescriptionDetails>{contract.end_date}</DescriptionDetails>
                <DescriptionTerm>Benefit</DescriptionTerm>
                <DescriptionDetails>{contract.benefits}</DescriptionDetails>
                <DescriptionTerm>Status</DescriptionTerm>
                <DescriptionDetails>{contract.status}</DescriptionDetails>
              </DescriptionList>
            ))
          ) : (
            <DescriptionList>
              <DescriptionTerm>No Contract Found</DescriptionTerm>
            </DescriptionList>
          )}
        </CardContent>

        <CardFooter></CardFooter>
      </Card>
    </>
  );
}

Contract.layout = (page: any) => (
  <EmployeeShowNav project={page.props.project}>{page}</EmployeeShowNav>
);

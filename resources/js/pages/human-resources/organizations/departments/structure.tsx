import {
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Card,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import HumanResourcesNav from "@/layouts/human-resource-nav";
import { EmployeeData, PositionData } from "@/types";

interface StructureProps {
  position: PositionData;
  employees: EmployeeData[];
}

export function Structure({ position, employees }: StructureProps) {
  return (
    <>
      <div className="p-4 lg:6">
        <Card>
          <CardHeader>
            <CardTitle>Employee</CardTitle>
            <CardDescription>
              List employee in position {position.name}, department{" "}
              {department.name}.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border p-4">
              <Table aria-label="Products">
                <TableHeader>
                  <TableColumn className="w-0">#</TableColumn>
                  <TableColumn isRowHeader>Employee Code</TableColumn>
                  <TableColumn>Category</TableColumn>
                  <TableColumn>Price</TableColumn>
                  <TableColumn>Stock</TableColumn>
                  <TableColumn />
                </TableHeader>
                <TableBody items={employees}>
                  {(item: any) => (
                    <TableRow id={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>
                        {new NumberFormatter("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(item.price)}
                      </TableCell>
                      <TableCell>{item.stock}</TableCell>
                      <TableCell>
                        <div className="flex justify-end">
                          <Menu>
                            <MenuTrigger className="size-6">
                              <EllipsisVerticalIcon />
                            </MenuTrigger>
                            <MenuContent
                              aria-label="Actions"
                              placement="left top"
                            >
                              <MenuItem>View</MenuItem>
                              <MenuItem>Edit</MenuItem>
                              <MenuSeparator />
                              <MenuItem intent="danger">Delete</MenuItem>
                            </MenuContent>
                          </Menu>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

Structure.layout = (page: any) => (
  <HumanResourcesNav project={page.props.project}>{page}</HumanResourcesNav>
);

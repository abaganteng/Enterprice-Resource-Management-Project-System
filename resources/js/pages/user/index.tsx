import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";
import { Card } from "@/components/ui/card";
import SettingsLayout from "@/pages/settings/settings-layout";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Menu,
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuTrigger,
} from "@/components/ui/menu";
import {
  IconDotsVertical,
  IconEye,
  IconHighlight,
  IconTrash,
} from "@intentui/icons";
import { ManageUserListData } from "@/types";
import { usePaginator } from "momentum-paginator";
import {
  Pagination,
  PaginationItem,
  PaginationList,
} from "@/components/ui/pagination";
import { Link } from "@/components/ui/link";
import { buttonStyles } from "@/components/ui/button";

const title = "Manage User";

interface Props {
  users: Paginator<ManageUserListData>;
}

export default function Index({ users }: Props) {
  const { previous, next, pages } = usePaginator(users);
  return (
    <>
      <Head title={title} />
      <h1 className="sr-only">{title}</h1>
      <Card>
        <Card.Header>
          <Card.Title>Users</Card.Title>
          <div className="flex items-center justify-between">
            <Card.Description>
              Manage users with roles and permissions.
            </Card.Description>
            <Link className={buttonStyles()} href="/manage-user/create">
              Create User
            </Link>
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
              <TableColumn isRowHeader>Email</TableColumn>
              <TableColumn>Name</TableColumn>
              <TableColumn>Role</TableColumn>
              <TableColumn />
            </TableHeader>
            <TableBody>
              {users.data.length > 0 ? (
                users.data.map((user: ManageUserListData, index: number) => (
                  <TableRow key={user.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>
                      {user.roles?.length > 0
                        ? user.roles?.map((role: any) => role.name).join(", ")
                        : "-"}
                    </TableCell>
                    <TableCell className="text-end last:pr-2.5">
                      <Menu>
                        <MenuTrigger>
                          <IconDotsVertical />
                        </MenuTrigger>
                        <MenuContent placement="left top">
                          <MenuItem href={route("manage-user.show", [user.id])}>
                            <IconEye /> View
                          </MenuItem>
                          <MenuItem>
                            <IconHighlight /> Edit
                          </MenuItem>
                          <MenuSeparator />
                          <MenuItem isDanger>
                            <IconTrash /> Delete
                          </MenuItem>
                        </MenuContent>
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell className="text-center">
                    No data available.
                  </TableCell>
                  <TableCell className="text-center">
                    No data available.
                  </TableCell>
                  <TableCell className="text-center">
                    No data available.
                  </TableCell>
                  <TableCell className="text-center">
                    No data available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card.Content>
        <Card.Footer>
          <Pagination>
            <PaginationList>
              <PaginationItem
                className={!previous.isActive ? "hidden" : ""}
                href={previous.url ?? ""}
              />
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
              <PaginationItem
                className={!next.isActive ? "hidden" : ""}
                href={next.url ?? ""}
              />
            </PaginationList>
          </Pagination>
        </Card.Footer>
      </Card>
    </>
  );
}

Index.layout = (page: any) => <AppLayout children={page} />;

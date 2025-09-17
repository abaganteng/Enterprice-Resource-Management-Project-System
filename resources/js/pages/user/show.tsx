import AppLayout from "@/layouts/app-layout";
import { Head, router } from "@inertiajs/react";
import SettingsLayout from "@/pages/settings/settings-layout";
import { ManageUserData, UserData, UserDetailData } from "@/types";
import { Card } from "@/components/ui/card";
import { DescriptionList } from "@/components/ui/description-list";
import { Link } from "@/components/ui/link";
import { buttonStyles } from "@/components/ui/button";
import { Note } from "@/components/ui/note";
import { Badge } from "@/components/ui/badge";

const title = "Manage User";

interface Props {
  user: UserDetailData;
}

export default function Show({ user }: Props) {
  return (
    <>
      <Head title={title} />
      <h1 className="sr-only">{title}</h1>
      <Card>
        <Card.Header>
          <Card.Title>Details from {user.name}</Card.Title>
          <Card.Description>Detail information</Card.Description>
        </Card.Header>
        <Card.Content>
          <DescriptionList>
            <DescriptionList.Term>User Name</DescriptionList.Term>
            <DescriptionList.Details>{user.name}</DescriptionList.Details>
            <DescriptionList.Term>Email</DescriptionList.Term>
            <DescriptionList.Details>{user.email}</DescriptionList.Details>
            <DescriptionList.Term>Permissions</DescriptionList.Term>
            <DescriptionList.Details className="flex flex-wrap gap-2">
              {user.roles[0]?.permissions?.map((permission: any) => (
                <Badge key={permission.id} className="capitalize">
                  {permission.name}
                </Badge>
              ))}
            </DescriptionList.Details>
            {user.roles[0] ? (
              <>
                <DescriptionList.Term>Role</DescriptionList.Term>
                <DescriptionList.Details>
                  {user.roles[0]?.name}
                </DescriptionList.Details>
              </>
            ) : (
              <Note className="my-3" intent="warning">
                This user does not have a role
              </Note>
            )}
          </DescriptionList>
        </Card.Content>
        <Card.Footer>
          <Link className={buttonStyles()} href="#">
            Edit
          </Link>
          {!user.roles[0] ? (
            <Link
              className={buttonStyles()}
              href={route("manage-role.assign-role", {
                user: user.id,
              })}
            >
              Assign Role
            </Link>
          ) : null}
        </Card.Footer>
      </Card>
    </>
  );
}

Show.layout = (page: any) => (
  <AppLayout>
    <SettingsLayout children={page} />
  </AppLayout>
);

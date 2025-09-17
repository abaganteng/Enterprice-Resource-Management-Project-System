import AppLayout from "@/layouts/app-layout";
import { Head, router } from "@inertiajs/react";
import SettingsLayout from "@/pages/settings/settings-layout";
import { ManageUserData, UserData } from "@/types";
import { Card } from "@/components/ui/card";
import { DescriptionList } from "@/components/ui/description-list";
import { Link } from "@/components/ui/link";
import { buttonStyles } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Note } from "@/components/ui/note";

const title = "Manage User";

interface Props {
  user: UserData;
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
            <DescriptionList.Term>Role</DescriptionList.Term>
            <DescriptionList.Details>
              {user.roles[0]?.name ?? (
                <Note intent="warning">This user does not have a role</Note>
              )}
            </DescriptionList.Details>
          </DescriptionList>
        </Card.Content>
        <Card.Footer>
          <Link className={buttonStyles()} href="#">
            Edit
          </Link>
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

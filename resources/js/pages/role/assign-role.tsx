import AppLayout from "@/layouts/app-layout";
import { Head, useForm } from "@inertiajs/react";
import { Card } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import SettingsLayout from "@/pages/settings/settings-layout";
import { Select, SelectItem, SelectTrigger } from "@/components/ui/select";
import { ManageUserData } from "@/types/index";
import { Dialog } from "@/components/ui/dialog";
import { Autocomplete, Popover, useFilter } from "react-aria-components";
import { SearchField } from "@/components/ui/search-field";
import { ListBox } from "@/components/ui/list-box";
import { TextField } from "@/components/ui/text-field";

const title = "Manage User";

interface Props {
  users: ManageUserData[];
  roles: ManageUserData[];
  user?: ManageUserData;
}

export default function AssignRole({ users, roles, user }: Props) {
  const { contains } = useFilter({ sensitivity: "base" });
  const { data, setData, post, reset, errors, processing, recentlySuccessful } =
    useForm({
      user_id: user?.id ?? "",
      role_id: "",
    });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route("manage-role.storeAssignRole"), {
      preserveScroll: true,
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <>
      <Head title={title} />
      <h1 className="sr-only">{title}</h1>
      <Card>
        <Card.Header>
          <Card.Title>Assign Role</Card.Title>
          <Card.Description>Assign a role to user</Card.Description>
        </Card.Header>
        <Card.Content>
          <Form
            validationErrors={errors}
            onSubmit={submit}
            className="max-w-lg space-y-6"
          >
            {user ? (
              <TextField isReadOnly label="User Name" value={user.name} />
            ) : (
              <Select
                label="Find a user"
                placeholder="Select a user"
                selectedKey={data.user_id}
                onSelectionChange={(v) => setData("user_id", v as string)}
              >
                <SelectTrigger />
                <Popover className="entering:fade-in exiting:fade-out flex max-h-80 w-(--trigger-width) entering:animate-in exiting:animate-out flex-col overflow-hidden rounded-lg border bg-overlay">
                  <Dialog aria-label="Users">
                    <Autocomplete filter={contains}>
                      <div className="border-b bg-muted p-2">
                        <SearchField className="rounded-lg bg-bg" autoFocus />
                      </div>
                      <ListBox
                        className="max-h-[inherit] min-w-[inherit] border-0 shadow-none"
                        items={users}
                      >
                        {(item) => (
                          <SelectItem key={item.id}>{item.name}</SelectItem>
                        )}
                      </ListBox>
                    </Autocomplete>
                  </Dialog>
                </Popover>
              </Select>
            )}
            <Select
              label="Find a role"
              placeholder="Select a role"
              selectedKey={data.role_id}
              onSelectionChange={(v) => setData("role_id", v as string)}
            >
              <SelectTrigger />
              <Popover className="entering:fade-in exiting:fade-out flex max-h-80 w-(--trigger-width) entering:animate-in exiting:animate-out flex-col overflow-hidden rounded-lg border bg-overlay">
                <Dialog aria-label="Roles">
                  <Autocomplete filter={contains}>
                    <div className="border-b bg-muted p-2">
                      <SearchField className="rounded-lg bg-bg" autoFocus />
                    </div>
                    <ListBox
                      className="max-h-[inherit] min-w-[inherit] border-0 shadow-none"
                      items={roles}
                    >
                      {(item) => (
                        <SelectItem key={item.id}>{item.name}</SelectItem>
                      )}
                    </ListBox>
                  </Autocomplete>
                </Dialog>
              </Popover>
            </Select>

            <div className="flex items-center justify-end gap-4">
              <Button type="submit" isDisabled={processing}>
                Create
              </Button>
              {recentlySuccessful && (
                <p className="text-muted-fg text-sm">Saved.</p>
              )}
            </div>
          </Form>
        </Card.Content>
      </Card>
    </>
  );
}

AssignRole.layout = (page: any) => (
  <AppLayout>
    <SettingsLayout children={page} />
  </AppLayout>
);

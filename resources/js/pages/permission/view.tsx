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

const title = "Manage User";

interface Props {
  permissions: ManageUserData[];
  roles: ManageUserData[];
}

export function View({ permissions, roles }: Props) {
  const { contains } = useFilter({ sensitivity: "base" });
  const { data, setData, post, reset, errors, processing, recentlySuccessful } =
    useForm({
      permission_id: "",
      role_id: "",
    });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route("manage-permission.storeAssignPermission"), {
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
          <Card.Title>Assign Permission</Card.Title>
          <Card.Description>Assign a permission to role</Card.Description>
        </Card.Header>
        <Card.Content>
          <Form
            validationErrors={errors}
            onSubmit={submit}
            className="max-w-lg space-y-6"
          >
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

            <Select
              label="Find a permission"
              placeholder="Select a permission"
              selectedKey={data.permission_id}
              onSelectionChange={(v) => setData("permission_id", v as string)}
            >
              <SelectTrigger />
              <Popover className="entering:fade-in exiting:fade-out flex max-h-80 w-(--trigger-width) entering:animate-in exiting:animate-out flex-col overflow-hidden rounded-lg border bg-overlay">
                <Dialog aria-label="Permissions">
                  <Autocomplete filter={contains}>
                    <div className="border-b bg-muted p-2">
                      <SearchField className="rounded-lg bg-bg" autoFocus />
                    </div>
                    <ListBox
                      className="max-h-[inherit] min-w-[inherit] border-0 shadow-none"
                      items={permissions}
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

View.layout = (page: any) => (
  <AppLayout>
    <SettingsLayout children={page} />
  </AppLayout>
);

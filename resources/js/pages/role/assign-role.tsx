import AppLayout from "@/layouts/app-layout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { Card } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { TextField } from "@/components/ui/text-field";
import { Button } from "@/components/ui/button";
import SettingsLayout from "@/pages/settings/settings-layout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

const title = "Manage User";

export default function AssignRole() {
  const { data, setData, post, reset, errors, processing, recentlySuccessful } =
    useForm({
      name: "",
    });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route("manage-role.store"), {
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
          <Card.Title>Create Role</Card.Title>
          <Card.Description>Create a new role</Card.Description>
        </Card.Header>
        <Card.Content>
          <Form
            validationErrors={errors}
            onSubmit={submit}
            className="max-w-lg space-y-6"
          >
            {/* <Select
              label="Design software"
              placeholder="Select a software"
              isRequired
            >
              <SelectTrigger />
              <SelectContent items={software}>
                {(item) => (
                  <SelectItem id={item.id} textValue={item.name}>
                    {item.name}
                  </SelectItem>
                )}
              </SelectContent>
            </Select> */}

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

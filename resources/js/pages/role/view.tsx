import AppLayout from "@/layouts/app-layout";
import { Head, useForm } from "@inertiajs/react";
import { Card } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { TextField } from "@/components/ui/text-field";
import { Button } from "@/components/ui/button";
import SettingsLayout from "@/pages/settings/settings-layout";

const title = "Manage User";

export function View() {
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
            <TextField
              id="name"
              label="Role Name"
              type="text"
              value={data.name}
              onChange={(v) => setData("name", v)}
              isRequired
              errorMessage={errors.name}
              autoFocus
              autoComplete="name"
            />

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

View.layout = (page: any) => <AppLayout children={page} />;

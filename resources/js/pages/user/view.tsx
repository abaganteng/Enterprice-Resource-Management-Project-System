import AppLayout from "@/layouts/app-layout";
import { Head, useForm, usePage } from "@inertiajs/react";
import type { SharedData } from "@/types/shared";
import { Card } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { TextField } from "@/components/ui/text-field";
import { Link } from "@/components/ui/link";
import { Button } from "@/components/ui/button";
import SettingsLayout from "@/pages/settings/settings-layout";
import { useRef } from "react";

const title = "Manage User";

export default function View() {
  const passwordInput = useRef<HTMLInputElement>(null);
  const { data, setData, post, reset, errors, processing, recentlySuccessful } =
    useForm({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route("manage-user.store"), {
      preserveScroll: true,
      onSuccess: () => {
        reset();
      },
      onError: () => {
        if (errors.password) {
          reset("password", "password_confirmation");
          passwordInput.current?.focus();
        }
      },
    });
  };

  return (
    <>
      <Head title={title} />
      <h1 className="sr-only">{title}</h1>
      <Card>
        <Card.Header>
          <Card.Title>Create User</Card.Title>
          <Card.Description>Create a new user</Card.Description>
        </Card.Header>
        <Card.Content>
          <Form
            validationErrors={errors}
            onSubmit={submit}
            className="max-w-lg space-y-6"
          >
            <TextField
              id="name"
              label="Name"
              type="text"
              value={data.name}
              onChange={(v) => setData("name", v)}
              isRequired
              errorMessage={errors.name}
              autoFocus
              autoComplete="name"
            />
            <TextField
              id="email"
              type="email"
              label="Email"
              value={data.email}
              onChange={(v) => setData("email", v)}
              isRequired
              errorMessage={errors.email}
              autoComplete="email"
            />
            <TextField
              id="password"
              type="password"
              label="Password"
              value={data.password}
              onChange={(v) => setData("password", v)}
              isRequired
              isRevealable
              errorMessage={errors.password}
              autoComplete="password"
            />

            <TextField
              type="password"
              label="Confirm Password"
              name="password_confirmation"
              value={data.password_confirmation}
              onChange={(v) => setData("password_confirmation", v)}
              errorMessage={errors.password_confirmation}
              isRevealable
              isRequired
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

View.layout = (page: any) => (
  <AppLayout>
    <SettingsLayout children={page} />
  </AppLayout>
);

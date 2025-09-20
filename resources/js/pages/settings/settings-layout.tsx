import { composeTailwindRenderProps } from "@/lib/primitive";
import { Container } from "@/components/ui/container";
import {
  Header,
  ListBox,
  ListBoxItem,
  Section,
  type ListBoxItemProps,
} from "react-aria-components";
import { Separator } from "@/components/ui/separator";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container className="py-6 sm:py-16">
      <div className="flex flex-col items-start gap-6 md:flex-row md:gap-16">
        <div className="w-full shrink-0 md:w-56">
          {/* <Menu>
            <NavbarItem className="border-0 bg-bg shadow-none p-0">
              Manage User <IconChevronLgDown className="col-start-3" />
            </NavbarItem>
            <Menu.Content>
              <Menu.Item href="/manage-user/view">
                <Menu.Label>Create User</Menu.Label>
              </Menu.Item>
              <Menu.Item href="/dashboard">
                <Menu.Label>Create Role</Menu.Label>
              </Menu.Item>
              <Menu.Item href="/dashboard">
                <Menu.Label>Assign Role</Menu.Label>
              </Menu.Item>
              <Menu.Item href="/dashboard">
                <Menu.Label>Assign Permission</Menu.Label>
              </Menu.Item>
            </Menu.Content>
          </Menu> */}
          <ListBox aria-label="Menu" selectionMode="single">
            <Header className="text-xs text-gray-500">Settings</Header>
            <Separator className="my-2" />
            <NavLink
              href="/settings/profile"
              isCurrent={route().current("profile.edit")}
            >
              Profile
            </NavLink>
            <NavLink
              href="/settings/password"
              isCurrent={route().current("password.edit")}
            >
              Change password
            </NavLink>
            <Separator className="my-4" />
            <Header content="" className="text-xs text-gray-500">
              Manage User
            </Header>
            <Separator className="my-2" />
            <NavLink
              href="/manage-user/index"
              isCurrent={route().current("manage-user.index")}
            >
              Manage User
            </NavLink>
            <NavLink
              href="/manage-roles-permissions/index"
              isCurrent={route().current(
                "manage-manage-roles-permissions.index"
              )}
            >
              Manage Roles & Permissions
            </NavLink>
            <NavLink
              href="/manage-role/assign-role"
              isCurrent={route().current("manage-role.assign-role")}
            >
              Assign Role
            </NavLink>
            <Separator className="my-4" />
            <NavLink
              href="/settings/appearance"
              isCurrent={route().current("settings.appearance")}
            >
              Appearance
            </NavLink>
            <Separator className="my-4" />
            <NavLink
              href="/settings/delete-account"
              isCurrent={route().current("settings.delete-account")}
            >
              Danger zone
            </NavLink>
          </ListBox>
        </div>
        <div className="w-full min-w-0">{children}</div>
      </div>
    </Container>
  );
}

interface NavLinkProps extends ListBoxItemProps {
  isCurrent?: boolean;
}
export function NavLink({ isCurrent, className, ...props }: NavLinkProps) {
  return (
    <ListBoxItem
      textValue={props.children as string}
      className={composeTailwindRenderProps(className, [
        "block py-2 font-medium text-sm",
        isCurrent ? "font-semibold text-fg" : "text-muted-fg hover:text-fg",
      ])}
      {...props}
    />
  );
}

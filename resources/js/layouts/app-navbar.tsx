import { usePage } from "@inertiajs/react";
import { IconCalendar, IconChevronLgDown, IconLogout } from "@intentui/icons";
import { useEffect, useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { buttonStyles } from "@/components/ui/button";
import {
  Menu,
  MenuContent,
  MenuHeader,
  MenuItem,
  MenuLabel,
  MenuSection,
  MenuSeparator,
  MenuSubMenu,
  MenuTrigger,
} from "@/components/ui/menu";
import {
  Navbar,
  NavbarGap,
  NavbarItem,
  NavbarMobile,
  NavbarProvider,
  NavbarSection,
  NavbarSpacer,
  NavbarStart,
  NavbarTrigger,
} from "@/components/ui/navbar";
import { Logo } from "@/components/logo";
import type { SharedData } from "@/types/shared";
import { Link } from "@/components/ui/link";
import { SearchField, SearchInput } from "@/components/ui/search-field";

export function AppNavbar({ ...props }: React.ComponentProps<typeof Navbar>) {
  const page = usePage();
  const { auth } = usePage<SharedData>().props;
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => setIsOpen(false), [page.url]);

  return (
    <NavbarProvider isOpen={isOpen} onOpenChange={setIsOpen}>
      <Navbar {...props}>
        <NavbarStart>
          <Link href="/" aria-label="Logo">
            <Logo />
          </Link>
        </NavbarStart>

        <div className="flex flex-1 justify-center">
          <div className="flex items-center gap-3">
            <IconCalendar className="w-5 h-5 text-gray-600" />
            <SearchField aria-label="Search" className="w-64">
              <SearchInput placeholder="Search "></SearchInput>
            </SearchField>
          </div>
        </div>

        <NavbarSection className="ml-auto hidden gap-x-2 lg:flex">
          {auth.user ? (
            <UserMenu />
          ) : (
            <>
              <NavbarItem href="/login">Login</NavbarItem>
              <NavbarItem href="/register">Register</NavbarItem>
            </>
          )}
        </NavbarSection>
      </Navbar>

      <NavbarMobile>
        <NavbarTrigger />
        <NavbarSpacer />
        <NavbarSection>
          {auth.user ? (
            <UserMenu />
          ) : (
            <NavbarItem
              className={buttonStyles({
                intent: "outline",
                size: "sm",
              })}
              href="/login"
            >
              Login
            </NavbarItem>
          )}
        </NavbarSection>
      </NavbarMobile>
    </NavbarProvider>
  );
}

function UserMenu() {
  const { auth } = usePage<SharedData>().props;
  return (
    <Menu>
      <MenuTrigger
        className="group flex items-start justify-between rounded-lg p-1 text-left data-hovered:bg-secondary"
        aria-label="Open menu"
      >
        <Avatar
          src={auth.user.gravatar}
          // isSquare
          className="mr-2 size-7 *:size-7 sm:size-9 sm:*:size-9"
        />
        <div className="hidden flex-col pr-2 sm:flex">
          <strong className="font-semibold text-sm">{auth.user.name}</strong>
          <span className="text-xs">{auth.user.email}</span>
        </div>
        <IconChevronLgDown className="transition-transform group-data-pressed:rotate-180" />
      </MenuTrigger>
      <MenuContent placement="bottom end" className="sm:min-w-56">
        <MenuSection>
          <MenuHeader separator className="relative">
            <div>{auth.user.name}</div>
            <div className="truncate whitespace-nowrap pr-6 font-normal text-muted-fg text-sm">
              {auth.user.email}
            </div>
          </MenuHeader>
        </MenuSection>
        <MenuItem href="/dashboard">
          <MenuLabel>Dashboard</MenuLabel>
        </MenuItem>
        <MenuSubMenu className="justify-between">
          <MenuItem href="/manage-user/index">
            <MenuLabel>Management Access</MenuLabel>
          </MenuItem>
          <MenuContent>
            <MenuItem href="/manage-user/index">
              <MenuLabel>Manage user</MenuLabel>
            </MenuItem>
            <MenuItem href="/manage-roles-permissions/index">
              <MenuLabel>Manage Role & Permission</MenuLabel>
            </MenuItem>
          </MenuContent>
        </MenuSubMenu>
        <MenuItem href="/settings/profile" className="justify-between">
          <MenuLabel>Update profile</MenuLabel>
        </MenuItem>
        <MenuItem href="/settings/password" className="justify-between">
          <MenuLabel>Change password</MenuLabel>
        </MenuItem>
        <MenuItem href="/settings/appearance" className="justify-between">
          <MenuLabel>Appearance</MenuLabel>
        </MenuItem>
        <MenuSeparator />
        <MenuItem routerOptions={{ method: "post" }} href="/logout">
          <MenuLabel>Logout</MenuLabel>
          <IconLogout />
        </MenuItem>
      </MenuContent>
    </Menu>
  );
}

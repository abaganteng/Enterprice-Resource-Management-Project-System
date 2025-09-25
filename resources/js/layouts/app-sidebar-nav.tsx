import {
  IconCommandRegular,
  IconDashboard,
  IconLogout,
  IconSettings,
} from "@intentui/icons";
import { Avatar } from "@/components/ui/avatar";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import {
  Menu,
  MenuContent,
  MenuHeader,
  MenuItem,
  MenuLabel,
  MenuSection,
  MenuSeparator,
  MenuTrigger,
} from "@/components/ui/menu";
import { SidebarNav, SidebarTrigger } from "@/components/ui/sidebar";
import { usePage } from "@inertiajs/react";

export default function AppSidebarNav() {
  const { url } = usePage();

  const menus = [
    {
      label: "Dashboard",
      href: "/dashboard",
      children: [],
    },
    {
      label: "Management Access",
      href: "/#", // induk, tidak bisa diklik
      children: [
        {
          label: "Manage User",
          href: "/manage-user/index",
          children: [],
        },
        {
          label: "Manage Role & Permission",
          href: "/manage-roles-permissions/index",
          children: [],
        },
      ],
    },
  ];

  let breadcrumbTrail: { label: string; href?: string | undefined }[] = [];

  if (
    url.startsWith("/manage-user") ||
    url.startsWith("/manage-roles-permissions")
  ) {
    const parent = menus.find((m) => m.label === "Management Access");
    if (parent) {
      breadcrumbTrail.push(parent);

      const activeChild = parent.children.find((child) =>
        url.startsWith(child.href)
      );
      if (activeChild) {
        breadcrumbTrail.push(activeChild);
      }
    }
  } else {
    breadcrumbTrail.push(menus[0]); // default: Dashboard
  }

  return (
    <SidebarNav>
      <span className="flex items-center gap-x-4">
        <SidebarTrigger className="-ml-2" />
        <Breadcrumbs className="hidden md:flex">
          {breadcrumbTrail.map((item, idx) => {
            const isParent = idx === 0;
            const isLast = idx === breadcrumbTrail.length - 1;

            return (
              <Breadcrumbs.Item
                key={item.href ?? item.label}
                {...(!isParent && !isLast && { href: item.href })}
              >
                {item.label}
              </Breadcrumbs.Item>
            );
          })}
        </Breadcrumbs>
      </span>
      <UserMenu />
    </SidebarNav>
  );
}

function UserMenu() {
  return (
    <Menu>
      <MenuTrigger className="ml-auto md:hidden" aria-label="Open Menu">
        <Avatar
          isSquare
          alt="kurt cobain"
          src="https://intentui.com/images/avatar/cobain.jpg"
        />
      </MenuTrigger>
      <MenuContent popover={{ placement: "bottom end" }} className="min-w-64">
        <MenuSection>
          <MenuHeader separator>
            <span className="block">Kurt Cobain</span>
            <span className="font-normal text-muted-fg">@cobain</span>
          </MenuHeader>
        </MenuSection>
        <MenuItem href="#dashboard">
          <IconDashboard />
          <MenuLabel>Dashboard</MenuLabel>
        </MenuItem>
        <MenuItem href="#settings">
          <IconSettings />
          <MenuLabel>Settings</MenuLabel>
        </MenuItem>
        <MenuSeparator />
        <MenuItem>
          <IconCommandRegular />
          <MenuLabel>Command Menu</MenuLabel>
        </MenuItem>
        <MenuSeparator />
        <MenuItem href="#contact-s">
          <MenuLabel>Contact Support</MenuLabel>
        </MenuItem>
        <MenuSeparator />
        <MenuItem href="#logout">
          <IconLogout />
          <MenuLabel>Log out</MenuLabel>
        </MenuItem>
      </MenuContent>
    </Menu>
  );
}

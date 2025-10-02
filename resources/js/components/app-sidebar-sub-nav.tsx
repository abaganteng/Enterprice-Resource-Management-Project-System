import {
  IconBarsThree2,
  IconBulletList,
  IconCommandRegular,
  IconDashboard,
  IconDotsHorizontal,
  IconGrid4,
  IconLogout,
  IconMessageDots,
  IconPeople,
  IconSearch,
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
import { Button } from "./ui/button";
import {
  Navbar,
  NavbarItem,
  NavbarProvider,
  NavbarSection,
  NavbarSpacer,
  NavbarStart,
} from "./ui/navbar";

interface Props {
  project?: any;
}

export default function AppSidebarSubNav({ project }: Props) {
  return (
    <NavbarProvider>
      <Navbar>
        {/* LEFT */}
        <NavbarSection>
          <NavbarItem
            href={route("projects.overview", { project: project.id })}
            className="flex items-center gap-1 text-sm"
          >
            <IconGrid4 className="w-4 h-4" />
            <span>Overview</span>
          </NavbarItem>

          <NavbarItem
            href={route("projects.groups.index", { project: project.id })}
            className="flex items-center gap-1 text-sm"
          >
            <IconBulletList className="w-4 h-4" />
            <span>List</span>
          </NavbarItem>
        </NavbarSection>

        <NavbarSpacer />

        {/* RIGHT */}
        <NavbarSection className="gap-2">
          <Button intent="plain" size="sq-xs" aria-label="Search">
            <IconSearch className="w-4 h-4" />
          </Button>
          <Button intent="plain" size="sq-xs" aria-label="Team">
            <IconPeople className="w-4 h-4" />
          </Button>
          <Button intent="primary" size="xs">
            Add Task
          </Button>
        </NavbarSection>
      </Navbar>
    </NavbarProvider>
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

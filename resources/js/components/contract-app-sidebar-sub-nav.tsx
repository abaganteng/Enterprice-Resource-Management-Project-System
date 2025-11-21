import {
  IconBarsThree2,
  IconBulletList,
  IconCalendar,
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
  NavbarLabel,
  NavbarProvider,
  NavbarSection,
  NavbarSpacer,
  NavbarStart,
} from "./ui/navbar";
import {
  BriefcaseBusiness,
  Building,
  Building2,
  Layers,
  LayoutDashboard,
} from "lucide-react";

interface Props {
  project?: any;
}

export default function ContractAppSidebarSubNav({ project }: Props) {
  return (
    <NavbarProvider>
      <Navbar>
        {/* LEFT */}
        <NavbarSection>
          <NavbarItem
            className="flex items-center gap-1 text-sm"
            href={route("organizations.dashboard")}
            isCurrent={route().current("organizations.dashboard")}
          >
            <LayoutDashboard className="w-4 h-4" />
            <NavbarLabel>Dashboard</NavbarLabel>
          </NavbarItem>

          <NavbarItem
            className="flex items-center gap-1 text-sm"
            href={route("organizations.contracts")}
            isCurrent={route().current("organizations.contracts")}
          >
            <Building className="w-4 h-4" />
            <NavbarLabel>Contracts</NavbarLabel>
          </NavbarItem>
          <NavbarItem className="flex items-center gap-1 text-sm" href="#">
            <BriefcaseBusiness className="w-4 h-4" />
            <NavbarLabel>Employees Contract</NavbarLabel>
          </NavbarItem>
          <NavbarItem className="flex items-center gap-1 text-sm">
            <IconPeople className="w-4 h-4" />
            <NavbarLabel>Assignments</NavbarLabel>
          </NavbarItem>
          <NavbarItem className="flex items-center gap-1 text-sm">
            <Layers className="w-4 h-4" />
            <NavbarLabel>Structure</NavbarLabel>
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

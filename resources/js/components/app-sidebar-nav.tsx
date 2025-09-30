import {
  IconBarsThree2,
  IconCommandRegular,
  IconDashboard,
  IconDotsHorizontal,
  IconLogout,
  IconMessageDots,
  IconPeople,
  IconPlus,
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
  MenuSubmenu,
  MenuTrigger,
} from "@/components/ui/menu";
import { SidebarNav, SidebarTrigger } from "@/components/ui/sidebar";
import { ProjectDetailData } from "@/types";

export default function AppSidebarNav({
  project,
}: {
  project: ProjectDetailData;
}) {
  return (
    <SidebarNav className="flex items-center justify-between">
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <SidebarTrigger className="-ml-2" />

        <Breadcrumbs className="hidden md:flex items-center gap-2">
          <Breadcrumbs.Item href="/blocks/sidebar/sidebar-01">
            <span className="font-medium">{project?.name}</span>
          </Breadcrumbs.Item>
        </Breadcrumbs>

        {/* Icon kiri */}
        <Menu>
          <MenuTrigger aria-label="Open Menu">
            <IconDotsHorizontal className="w-4 h-4 cursor-pointer hover:text-gray-600" />
          </MenuTrigger>
          <MenuContent popover={{ placement: "bottom" }}>
            <MenuItem href="#">
              <IconPlus className="cursor-pointer hover:text-gray-600" />
              <MenuLabel>Rename</MenuLabel>
            </MenuItem>
            <MenuSeparator />
            <MenuSubmenu>
              <MenuItem>
                <MenuLabel>Create new</MenuLabel>
              </MenuItem>
              <MenuContent>
                <MenuItem>
                  <MenuLabel>List</MenuLabel>
                </MenuItem>
                <MenuSeparator />
                <MenuSubmenu>
                  <MenuItem>
                    <MenuLabel>Import</MenuLabel>
                  </MenuItem>
                  <MenuContent>
                    <MenuItem>
                      <MenuLabel>Exels file</MenuLabel>
                    </MenuItem>
                    <MenuItem>
                      <MenuLabel>Pdf file</MenuLabel>
                    </MenuItem>
                  </MenuContent>
                </MenuSubmenu>
              </MenuContent>
            </MenuSubmenu>
            <MenuSeparator />
            <MenuItem>
              <MenuLabel>Duplicate</MenuLabel>
            </MenuItem>
            <MenuItem>
              <MenuLabel>Delete</MenuLabel>
            </MenuItem>
          </MenuContent>
        </Menu>

        <IconBarsThree2 className="w-5 h-5 cursor-pointer hover:text-gray-600" />
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3 ml-auto">
        <IconMessageDots className="w-5 h-5 cursor-pointer hover:text-gray-600" />
        <IconPeople className="w-5 h-5 cursor-pointer hover:text-gray-600" />
        {/* Tambah icon lain di sini */}
      </div>
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

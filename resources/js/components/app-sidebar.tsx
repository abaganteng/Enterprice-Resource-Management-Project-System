import {
  IconArchiveFill,
  IconArrowDownFill,
  IconArrowUpFill,
  IconBrandIntentui,
  IconCircleCheckFill,
  IconClockFill,
  IconCreditCardFill,
  IconCube,
  IconDashboardFill,
  IconDotsHorizontal,
  IconEyeDropper,
  IconHashtagFill,
  IconListBulletsFill,
  IconPlus,
  IconSearch,
  IconShoppingBagFill,
  IconTrash,
} from "@intentui/icons";
import { Link } from "@/components/ui/link";
import {
  Menu,
  MenuContent,
  MenuItem,
  MenuLabel,
  MenuSection,
  MenuTrigger,
} from "@/components/ui/menu";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
  SidebarLink,
  SidebarRail,
  SidebarSection,
  SidebarSectionGroup,
} from "@/components/ui/sidebar";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  projects: { id: number; name: string }[];
  onCreateProject: () => void;
}

export default function AppSidebar({
  projects,
  onCreateProject,
  ...props
}: AppSidebarProps) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link
          href="/docs/components/layouts/sidebar"
          className="flex items-center gap-x-2"
        >
          <IconBrandIntentui className="size-8" />
          <SidebarLabel className="font-medium">
            Intent <span className="text-muted-fg">UI</span>
          </SidebarLabel>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarSectionGroup>
          <SidebarSection label="Overview">
            <SidebarItem tooltip="Overview" href="#">
              <IconDashboardFill />
              <SidebarLabel>Overview</SidebarLabel>
            </SidebarItem>

            <SidebarItem tooltip="Orders">
              {({ isCollapsed, isFocused }) => (
                <>
                  <SidebarLink href="#">
                    <IconShoppingBagFill />
                    <SidebarLabel>Orders</SidebarLabel>
                  </SidebarLink>
                  {(!isCollapsed || isFocused) && (
                    <Menu>
                      <MenuTrigger
                        data-slot="menu-action-trigger"
                        aria-label="Manage"
                      >
                        <IconDotsHorizontal />
                      </MenuTrigger>
                      <MenuContent
                        popover={{
                          offset: 0,
                          placement: "right top",
                        }}
                      >
                        <MenuItem href="#new-order">
                          <IconPlus />
                          Create New Order
                        </MenuItem>
                        <MenuItem href="#view-all">
                          <IconListBulletsFill />
                          View All Orders
                        </MenuItem>
                        <MenuItem href="#pending-orders">
                          <IconClockFill />
                          Pending Orders
                        </MenuItem>
                        <MenuItem href="#completed-orders">
                          <IconCircleCheckFill />
                          Completed Orders
                        </MenuItem>
                        <MenuItem href="#export-orders">
                          <IconArrowUpFill />
                          Export Orders
                        </MenuItem>
                      </MenuContent>
                    </Menu>
                  )}
                </>
              )}
            </SidebarItem>
            <SidebarItem tooltip="Products">
              {({ isCollapsed, isFocused }) => (
                <>
                  <SidebarLink href="#">
                    <IconCube />
                    <SidebarLabel>Products</SidebarLabel>
                  </SidebarLink>
                  {(!isCollapsed || isFocused) && (
                    <Menu>
                      <MenuTrigger
                        data-slot="menu-action-trigger"
                        aria-label="Manage"
                      >
                        <IconDotsHorizontal />
                      </MenuTrigger>
                      <MenuContent
                        popover={{
                          offset: 0,
                          placement: "right top",
                        }}
                      >
                        <MenuItem href="#new-product">
                          <IconPlus />
                          Add New Product
                        </MenuItem>
                        <MenuItem href="#archive">
                          <IconArchiveFill />
                          Archive Product
                        </MenuItem>
                        <MenuItem href="#manage-categories">
                          <IconHashtagFill />
                          Manage Categories
                        </MenuItem>
                        <MenuItem href="#import">
                          <IconArrowDownFill />
                          Import Products
                        </MenuItem>
                        <MenuItem href="#export">
                          <IconArrowUpFill />
                          Export Products
                        </MenuItem>
                      </MenuContent>
                    </Menu>
                  )}
                </>
              )}
            </SidebarItem>
            <SidebarItem href="#" badge="4 Pending" tooltip="Payments">
              <IconCreditCardFill />
              <SidebarLabel>Payments</SidebarLabel>
            </SidebarItem>
          </SidebarSection>
          <SidebarSection>
            <div className="col-span-full flex w-full items-center justify-between px-2 ">
              <span className="text-xs font-semibold uppercase text-gray-500">
                Projects
              </span>
              <div className="flex items-center gap-2">
                <Menu>
                  <MenuTrigger aria-label="Open Menu">
                    <IconDotsHorizontal className="w-4 h-4 cursor-pointer hover:text-gray-600" />
                  </MenuTrigger>
                  <MenuContent
                    popover={{ placement: "bottom" }}
                    className="min-w-64"
                  >
                    <MenuSection>
                      <MenuItem onClick={onCreateProject}>
                        <IconPlus className="cursor-pointer hover:text-gray-600" />
                        <MenuLabel>Create Project</MenuLabel>
                      </MenuItem>
                      <MenuItem href="#">
                        <IconPlus className="cursor-pointer hover:text-gray-600" />
                        <MenuLabel>Manage Project</MenuLabel>
                      </MenuItem>
                    </MenuSection>
                  </MenuContent>
                </Menu>
                <IconSearch className="w-4 h-4 cursor-pointer hover:text-gray-600" />
                <Link onClick={onCreateProject}>
                  <IconPlus className="w-4 h-4 cursor-pointer hover:text-gray-600" />
                </Link>
              </div>
            </div>
            <SidebarItem tooltip="Overview" href="#">
              <IconDashboardFill />
              <SidebarLabel>Everythings</SidebarLabel>
            </SidebarItem>

            {projects.map((project) => (
              <SidebarItem key={project.id} tooltip={project.name}>
                {({ isCollapsed, isFocused }) => (
                  <>
                    <SidebarLink
                      href={route("projects.overview", { project: project.id })}
                    >
                      <IconShoppingBagFill />
                      <SidebarLabel>{project.name}</SidebarLabel>
                    </SidebarLink>

                    {(!isCollapsed || isFocused) && (
                      <Menu>
                        <MenuTrigger
                          data-slot="menu-action-trigger"
                          aria-label="Manage"
                        >
                          <IconDotsHorizontal /> <IconPlus />
                        </MenuTrigger>
                        <MenuContent
                          popover={{ offset: 0, placement: "right top" }}
                        >
                          <MenuItem href="#new-order">
                            <IconEyeDropper /> Rename
                          </MenuItem>
                          <MenuItem href="#view-all">
                            <IconTrash /> Delete
                          </MenuItem>
                        </MenuContent>
                      </Menu>
                    )}
                  </>
                )}
              </SidebarItem>
            ))}
          </SidebarSection>
        </SidebarSectionGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

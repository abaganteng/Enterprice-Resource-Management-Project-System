import {
  IconArchiveFill,
  IconArrowDownFill,
  IconArrowUpFill,
  IconBrandIntentui,
  IconBuildingFill,
  IconChevronsY,
  IconCircleCheckFill,
  IconCircleQuestionmarkFill,
  IconClockFill,
  IconCreditCardFill,
  IconCube,
  IconDashboardFill,
  IconDotsHorizontal,
  IconHashtagFill,
  IconHeadphonesFill,
  IconListBulletsFill,
  IconLogout,
  IconMessageFill,
  IconNotesFill,
  IconPackageFill,
  IconPlus,
  IconSettingsFill,
  IconShieldFill,
  IconShoppingBagFill,
  IconTicketFill,
} from "@intentui/icons";
import { Avatar } from "@/components/ui/avatar";
import { Link } from "@/components/ui/link";
import {
  Menu,
  MenuContent,
  MenuHeader,
  MenuItem,
  MenuSection,
  MenuSeparator,
  MenuTrigger,
} from "@/components/ui/menu";
import {
  Sidebar,
  SidebarContent,
  SidebarDisclosure,
  SidebarDisclosureGroup,
  SidebarDisclosurePanel,
  SidebarDisclosureTrigger,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
  SidebarLink,
  SidebarRail,
  SidebarSection,
  SidebarSectionGroup,
} from "@/components/ui/sidebar";

export default function ProjectSidebar({
  project,
  ...props
}: { project: any } & React.ComponentProps<typeof Sidebar>) {
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
          <SidebarSection label="Project Phases">
            {project.phases && project.phases.length > 0 ? (
              project.phases.map((phase: any) => (
                <SidebarItem
                  key={phase.id}
                  tooltip={phase.name}
                  href={route("phases.show", phase.id)} // arahkan ke detail phase
                >
                  <IconDashboardFill />
                  <SidebarLabel>
                    {phase.name}
                    <div className="text-xs text-gray-500">
                      {phase.start_date} - {phase.end_date}
                    </div>
                  </SidebarLabel>
                </SidebarItem>
              ))
            ) : (
              <SidebarItem tooltip="No Phase" href="#">
                <IconDashboardFill />
                <SidebarLabel className="italic text-gray-400">
                  Belum ada phase
                </SidebarLabel>
              </SidebarItem>
            )}
          </SidebarSection>
        </SidebarSectionGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}

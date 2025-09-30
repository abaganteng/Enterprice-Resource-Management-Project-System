import { Card } from "@/components/ui/card";
import {
  Menu,
  MenuContent,
  MenuItem,
  MenuLabel,
  MenuSeparator,
  MenuSubmenu,
  MenuTrigger,
} from "@/components/ui/menu";
import ProjectLayoutNav from "@/layouts/project-layout-nav";
import {
  IconChevronRight,
  IconDotsHorizontal,
  IconEyeDropper,
  IconPlus,
} from "@intentui/icons";
import { ListStatus } from "./list-status";
import { Disclosure, DisclosurePanel } from "@/components/ui/disclosure";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { ProjectDetailData } from "@/types";
import { Container } from "@/components/ui/container";

interface Props {
  project: ProjectDetailData;
  tasks: any[];
}

export default function List({ project }: Props) {
  console.log(project);
  return (
    <div className="p-4 lg:p-6">
      <Card>
        <Card.Header>
          <Card.Title>
            {project.projectGroups?.map((group: any) => (
              <Disclosure key={group.id}>
                <div className="flex items-center gap-2">
                  {/* Trigger (Chevron) */}
                  <Heading>
                    <Button slot="trigger" intent="plain">
                      <IconChevronRight className="size-5 cursor-pointer hover:text-gray-600" />
                    </Button>
                  </Heading>

                  {/* List title */}
                  <Button intent="plain">{group.name}</Button>

                  {/* Menu actions */}
                  <Menu>
                    <MenuTrigger aria-label="Open Menu">
                      <IconDotsHorizontal className="w-4 h-4 cursor-pointer hover:text-gray-600" />
                    </MenuTrigger>
                    <MenuContent popover={{ placement: "bottom" }}>
                      <MenuItem href="#">
                        <IconEyeDropper className="cursor-pointer hover:text-gray-600" />
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
                </div>

                {/* Panel untuk status dalam list */}
                <DisclosurePanel>
                  <Container>
                    {/* Loop status per list */}
                    <ListStatus statuses={group.statuses ?? []} />
                  </Container>
                </DisclosurePanel>
              </Disclosure>
            ))}
          </Card.Title>
        </Card.Header>
      </Card>
    </div>
  );
}

// gunakan ProjectLayout, bukan AppLayout
List.layout = (page: any) => (
  <ProjectLayoutNav project={page.props.project}>{page}</ProjectLayoutNav>
);

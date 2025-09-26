import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";
import { ProjectData, ProjectDetailData } from "@/types";
import { Card } from "@/components/ui/card";
import { Button, buttonStyles } from "@/components/ui/button";
import { Menu, MenuContent, MenuItem } from "@/components/ui/menu";
import { IconChevronLgDown, IconFolderOpen } from "@intentui/icons";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { DescriptionList } from "@/components/ui/description-list";
import { Link } from "@/components/ui/link";
import { GridList, GridListItem } from "@/components/ui/grid-list";
import {
  Disclosure,
  DisclosureGroup,
  DisclosurePanel,
  DisclosureTrigger,
} from "@/components/ui/disclosure";

const title = "Show Project";

interface Props {
  project: ProjectDetailData;
}

export default function Show({ project }: Props) {
  console.log(project);
  return (
    <>
      <Head title={title} />
      <h1 className="sr-only">{title}</h1>

      <Card>
        {/* Header */}
        <Card.Header>
          <Card.Title>Project Name ({project.name})</Card.Title>
          <Card.Description>
            <div className="flex items-center justify-between">
              <div>Project Type: {project.project_type}</div>
              <div className="capitalize">
                <Badge>{project.status}</Badge>
              </div>
            </div>
          </Card.Description>
        </Card.Header>

        <Card.Content className="flex flex-col gap-y-6">
          {/* Manager & Client */}
          <div className="flex justify-center items-start gap-x-5">
            {/* Manager */}
            <Card className="w-1/2">
              <div className="ml-5 font-medium">Manager</div>
              <Card.Header>
                <div className="flex items-center gap-x-3">
                  <Avatar
                    isSquare
                    alt="manager"
                    src="https://intentui.com/images/avatar/cobain.jpg"
                  />
                  <div>
                    <Card.Title>{project.manager.name}</Card.Title>
                    <Card.Description>{project.manager.email}</Card.Description>
                  </div>
                </div>
              </Card.Header>
            </Card>

            {/* Client */}
            <Card className="w-1/2">
              <div className="ml-5 font-medium">Client</div>
              <Card.Header>
                <div className="flex items-center gap-x-3">
                  <Avatar
                    isSquare
                    alt="client"
                    src="https://intentui.com/images/avatar/cobain.jpg"
                  />
                  <div>
                    <Card.Title>{project.client.name}</Card.Title>
                    <Card.Description>{project.client.email}</Card.Description>
                  </div>
                </div>
              </Card.Header>
            </Card>
          </div>

          {/* Budget, Dates & Description */}
          <Card>
            <Card.Content className="space-y-4">
              {/* Grid 3 kolom */}
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="block font-medium text-gray-600">
                    Budget
                  </span>
                  <span>{project.budget || "-"}</span>
                </div>
                <div>
                  <span className="block font-medium text-gray-600">
                    Start Date
                  </span>
                  <span>{project.start_date}</span>
                </div>
                <div>
                  <span className="block font-medium text-gray-600">
                    End Date
                  </span>
                  <span>{project.end_date || "Not Set"}</span>
                </div>
              </div>

              {/* Description */}
              <div>
                <span className="block font-medium text-gray-600">
                  Description
                </span>
                <p className="text-justify">{project.description}</p>
              </div>
            </Card.Content>
          </Card>

          {/* Phase & Milestone */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">Phases & Milestones</h2>
              <div className="flex gap-x-2">
                <Button size="sm">+ Phase</Button>
                <Button size="sm" intent="secondary">
                  + Milestone
                </Button>
              </div>
            </div>

            <Card>
              <Card.Content>
                <DisclosureGroup
                  allowsMultipleExpanded
                  defaultExpandedKeys={[1]}
                >
                  {project.phases?.map((phase, index) => (
                    <Disclosure key={phase.id} id={phase.id}>
                      {/* Phase Title */}
                      <DisclosureTrigger className="flex justify-between items-center w-full">
                        <span className="font-medium">
                          <IconFolderOpen className="fill-orange-400" />{" "}
                          {phase.name} ({phase.start_date} - {phase.end_date})
                        </span>
                        <span className="text-sm text-gray-500">
                          {phase.status}
                        </span>
                      </DisclosureTrigger>

                      {/* Milestones */}
                      <DisclosurePanel className="pl-6 mt-2 space-y-2">
                        {(phase.milestones?.length ?? 0) > 0 ? (
                          (phase.milestones ?? []).map((ms) => (
                            <div
                              key={ms.id}
                              className="flex justify-between text-sm border-b pb-1"
                            >
                              <span>⏺ {ms.name}</span>
                              <span className="text-gray-500">
                                {ms.due_date || "No date"}
                              </span>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-gray-400 italic">
                            Belum ada milestone.
                          </p>
                        )}
                      </DisclosurePanel>
                    </Disclosure>
                  ))}

                  {/* Independent Milestones
                  {project.independentMilestones.length > 0 && (
                    <Disclosure id="independent">
                      <DisclosureTrigger>
                        📍 Milestone Independen
                      </DisclosureTrigger>
                      <DisclosurePanel className="pl-6 mt-2 space-y-2">
                        {project.independentMilestones.map((ms) => (
                          <div
                            key={ms.id}
                            className="flex justify-between text-sm border-b pb-1"
                          >
                            <span>⏺ {ms.name}</span>
                            <span className="text-gray-500">{ms.due_date}</span>
                          </div>
                        ))}
                      </DisclosurePanel>
                    </Disclosure>
                  )} */}
                </DisclosureGroup>
              </Card.Content>
            </Card>
          </div>

          {/* Audit Info */}
          <div className="text-xs text-gray-500 space-y-1">
            <div>Created At: {project.created_at}</div>
            <div>Updated At: {project.updated_at || "Not Updated"}</div>
          </div>
        </Card.Content>

        <Card.Footer />
      </Card>
    </>
  );
}

Show.layout = (page: any) => <AppLayout children={page} />;

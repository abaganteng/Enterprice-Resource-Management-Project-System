import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";
import { ProjectDetailData, ProjectPhaseDetailData } from "@/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { FormPhaseModal } from "../phases/form-phase-modal";
import { useState } from "react";
import ProjectLayout from "../projects/project-layout";
import {
  Disclosure,
  DisclosureGroup,
  DisclosurePanel,
  DisclosureTrigger,
} from "@/components/ui/disclosure";
import { IconChevronsLgRight, IconFile } from "@intentui/icons";
import { Link } from "@/components/ui/link";
import { Heading } from "@/components/ui/heading";
import { buttonStyles } from "@/components/ui/button";

const title = "Show Project";

interface PageSettings {
  title: string;
  description: string;
  buttonText: string;
  method: "post" | "put";
  url: string;
}

interface Props {
  project: ProjectDetailData;
  phase: ProjectPhaseDetailData;
  create?: PageSettings;
  update?: PageSettings;
}

export default function Show({ project, create, update, phase }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPhase, setSelectedPhase] = useState<any>(null);
  const [action, setAction] = useState<"update" | "create" | null>(null);
  return (
    <>
      <Head title={title} />
      <h1 className="sr-only">{title}</h1>
      <ProjectLayout project={project}>
        <Card>
          {/* Header */}
          <Card.Header>
            <Card.Title>Project Phase Name ({phase.name})</Card.Title>
            <Card.Description>
              <div className="flex items-center justify-between">
                <div>
                  Start: {phase.start_date} | End: {phase.end_date}
                </div>
                <div className="capitalize">
                  <Badge>{phase.status}</Badge>
                </div>
                <div>
                  <Link
                    className={buttonStyles()}
                    onClick={() => (setIsOpen(true), setSelectedPhase(phase))}
                  >
                    Edit
                  </Link>
                  <Link className={buttonStyles({ intent: "danger" })}>
                    Delete
                  </Link>
                </div>
              </div>
            </Card.Description>
          </Card.Header>

          <Card.Content className="flex flex-col gap-y-6">
            Phase Description: {phase.description}
            <Card>
              <Card.Header>
                <Card.Title>Milestones</Card.Title>
              </Card.Header>
              <Card.Content>
                <DisclosureGroup allowsMultipleExpanded>
                  {Array.isArray(phase.milestones) &&
                  phase.milestones.length > 0 ? (
                    phase.milestones.map((ms: any) => (
                      <Disclosure key={ms.id} id={ms.id}>
                        {/* Milestone Title */}
                        <DisclosureTrigger className="flex justify-between items-center w-full">
                          <span className="font-medium">
                            <IconFile className="text-blue-500 fill-blue-400" />{" "}
                            {ms.name}
                          </span>
                          <span className="text-sm text-gray-500">
                            {ms.due_date || "No date"}
                          </span>
                        </DisclosureTrigger>

                        {/* Milestone Detail */}
                        <DisclosurePanel className="pl-6 mt-2 space-y-2">
                          <div className="text-sm text-gray-600">
                            {ms.description || "Tidak ada deskripsi."}
                          </div>
                          <Link href="/tasks/index">
                            Lihat daftar task <IconChevronsLgRight />
                          </Link>
                        </DisclosurePanel>
                      </Disclosure>
                    ))
                  ) : (
                    <div className="pl-6 mt-2 text-sm text-gray-500 italic">
                      🚫 Belum ada milestone untuk proyek ini
                    </div>
                  )}
                </DisclosureGroup>
              </Card.Content>
            </Card>
            {/* Audit Info */}
            <div className="text-xs text-gray-500 space-y-1">
              <div>Created At: {phase.created_at}</div>
              <div>Updated At: {phase.updated_at || "Not Updated"}</div>
            </div>
          </Card.Content>

          <Card.Footer />
        </Card>
      </ProjectLayout>

      <FormPhaseModal
        open={isOpen}
        onOpenChange={() => setIsOpen(false)}
        project_phase={selectedPhase}
        pageSettings={update}
        start_date={project.start_date}
        end_date={project.end_date}
        project={project.id}
      />
    </>
  );
}

Show.layout = (page: any) => <AppLayout children={page} />;

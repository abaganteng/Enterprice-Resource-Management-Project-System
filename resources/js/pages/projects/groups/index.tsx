import { Card } from "@/components/ui/card";
import ProjectLayoutNav from "@/layouts/project-layout-nav";
import { ProjectDetailData } from "@/types";
import { useState } from "react";
import { ProjectGroupItem } from "../project-group-item";
import { Container } from "@/components/ui/container";

interface Props {
  project: ProjectDetailData;
  tasks: any[];
}

export default function Index({ project }: Props) {
  const [editingGroupId, setEditingGroupId] = useState<number | null>(null);
  return (
    <Container>
      {project.projectGroups?.map((group: any) => (
        <Card className="py-5">
          <Card.Header>
            <Card.Title>
              <ProjectGroupItem
                key={group.id}
                project={project}
                group={group}
                editingGroupId={editingGroupId}
                setEditingGroupId={setEditingGroupId}
              />
            </Card.Title>
          </Card.Header>
        </Card>
      ))}
    </Container>
  );
}

// gunakan ProjectLayout, bukan AppLayout
Index.layout = (page: any) => (
  <ProjectLayoutNav project={page.props.project}>{page}</ProjectLayoutNav>
);

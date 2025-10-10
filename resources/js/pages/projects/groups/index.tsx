import { Card } from "@/components/ui/card";
import ProjectLayoutNav from "@/layouts/project-layout-nav";
import { ManageUserData, ProjectDetailData } from "@/types";
import { useState } from "react";
import { ProjectGroupItem } from "../project-group-item";
import { Container } from "@/components/ui/container";

interface Props {
  project: ProjectDetailData;
  tasks: any[];
  users: ManageUserData[];
}

export default function Index({ project, users }: Props) {
  const [editingGroupId, setEditingGroupId] = useState<number | null>(null);
  return (
    <Container>
      {project.projectGroups?.map((group: any) => (
        <Card key={group.id} className="py-5">
          <Card.Header>
            <Card.Title>
              <ProjectGroupItem
                project={project}
                users={users}
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
Index.layout = (page: any) => (
  <ProjectLayoutNav project={page.props.project}>{page}</ProjectLayoutNav>
);

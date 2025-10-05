import { Card } from "@/components/ui/card";
import ProjectLayoutNav from "@/layouts/project-layout-nav";
import { ProjectDetailData } from "@/types";
import { useState } from "react";
import { useForm } from "@inertiajs/react";
import { ProjectGroupItem } from "../project-group-item";

interface Props {
  project: ProjectDetailData;
  tasks: any[];
}

export default function Index({ project }: Props) {
  const [editingGroupId, setEditingGroupId] = useState<number | null>(null);
  return (
    <div className="p-4 lg:p-6">
      <Card>
        <Card.Header>
          <Card.Title>
            {project.projectGroups?.map((group: any) => (
              <ProjectGroupItem
                key={group.id}
                project={project}
                group={group}
                editingGroupId={editingGroupId}
                setEditingGroupId={setEditingGroupId}
              />
            ))}
          </Card.Title>
        </Card.Header>
      </Card>
    </div>
  );
}

// gunakan ProjectLayout, bukan AppLayout
Index.layout = (page: any) => (
  <ProjectLayoutNav project={page.props.project}>{page}</ProjectLayoutNav>
);

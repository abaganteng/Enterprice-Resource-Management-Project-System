import { Card } from "@/components/ui/card";
import ProjectLayoutNav from "@/layouts/project-layout-nav";

interface Props {
  project: any;
}

export default function Overview({ project }: Props) {
  return (
    <div className="p-4 lg:p-6">
      <Card>
        <Card.Header>
          <Card.Title>Project Overview</Card.Title>
          <Card.Description>
            Ringkasan progress & informasi project
          </Card.Description>
        </Card.Header>

        <Card.Content className="flex flex-col gap-y-6">
          {/* misalnya ringkasan milestone, tim, progress bar */}
        </Card.Content>

        <Card.Footer />
      </Card>
    </div>
  );
}

// gunakan ProjectLayout, bukan AppLayout
Overview.layout = (page: any) => (
  <ProjectLayoutNav project={page.props.project}>{page}</ProjectLayoutNav>
);

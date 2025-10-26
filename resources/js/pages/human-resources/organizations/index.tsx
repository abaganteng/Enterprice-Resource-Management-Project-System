import { Card } from "@/components/ui/card";
import HumanResourcesNav from "@/layouts/human-resource-nav";

export default function Index() {
  return (
    <div className="p-4 lg:p-6">
      <Card>
        <Card.Header>
          <Card.Title>Dashboard</Card.Title>
          <Card.Description>Dashboard board disini</Card.Description>
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
Index.layout = (page: any) => (
  <HumanResourcesNav project={page.props.project}>{page}</HumanResourcesNav>
);

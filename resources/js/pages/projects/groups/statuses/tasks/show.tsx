import { buttonStyles } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DescriptionList } from "@/components/ui/description-list";
import { Link } from "@/components/ui/link";
import TaskDetailLayout from "@/layouts/task-detail-layout";

interface PageProps {
  project: any;
  task: any;
  subtask: any;
}

export default function Show({ project, task, subtask }: PageProps) {
  return (
    <>
      <Card>
        <Card.Header>
          <Card.Title>{project.name}</Card.Title>
          <Card.Description>Description task here</Card.Description>
        </Card.Header>
        <Card.Content>
          <DescriptionList>
            <DescriptionList.Term>Status</DescriptionList.Term>
            <DescriptionList.Details>
              <span
                className="text-sm capitalize truncate cursor-text px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: task.status.color ?? "transparent",
                  color: task.status.color ? "#ffffff" : undefined,
                }}
              >
                {task.status.name}
              </span>
            </DescriptionList.Details>
            <DescriptionList.Term>Assign</DescriptionList.Term>
            <DescriptionList.Details>Assign here</DescriptionList.Details>
            <DescriptionList.Term>Date</DescriptionList.Term>
            <DescriptionList.Details>Date here</DescriptionList.Details>
            <DescriptionList.Term>Priority</DescriptionList.Term>
            <DescriptionList.Details>Priority here</DescriptionList.Details>
          </DescriptionList>
        </Card.Content>
        <Card.Footer>
          <Link className={buttonStyles()} href="#">
            Edit
          </Link>
        </Card.Footer>
      </Card>
    </>
  );
}

Show.layout = (page: any) => (
  <TaskDetailLayout project={page.props.project}>{page}</TaskDetailLayout>
);

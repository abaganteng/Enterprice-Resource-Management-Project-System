import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";
import { ProjectData, ProjectDetailData } from "@/types";
import { Card } from "@/components/ui/card";
import { Button, buttonStyles } from "@/components/ui/button";
import { Menu, MenuContent, MenuItem } from "@/components/ui/menu";
import { IconChevronLgDown } from "@intentui/icons";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { DescriptionList } from "@/components/ui/description-list";
import { Link } from "@/components/ui/link";

const title = "Show Project";

interface Props {
  project: ProjectDetailData;
}

export default function Show({ project }: Props) {
  return (
    <>
      <Head title={title} />
      <h1 className="sr-only">{title}</h1>
      <Card>
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
        <Card.Content>
          <div className="flex justify-center item-center gap-x-5">
            <Card>
              <div className="ml-5">Manager</div>
              <Card.Header>
                <div className="flex items-center gap-x-3">
                  <Avatar
                    isSquare
                    alt="kurt cobain"
                    src="https://intentui.com/images/avatar/cobain.jpg"
                  />
                  <div>
                    <Card.Title>{project.manager.name}</Card.Title>
                    <Card.Description>{project.manager.email}</Card.Description>
                  </div>
                </div>
              </Card.Header>
            </Card>
            <Card>
              <div className="ml-5">Client</div>
              <Card.Header>
                <div className="flex items-center gap-x-3">
                  <Avatar
                    isSquare
                    alt="kurt cobain"
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
          <Card>
            <Card.Content className="flex items-center justify-center">
              <DescriptionList>
                <DescriptionList.Term>Budget</DescriptionList.Term>
                <DescriptionList.Details>
                  {project.budget}
                </DescriptionList.Details>
                <DescriptionList.Term>Start Date</DescriptionList.Term>
                <DescriptionList.Details>
                  {project.start_date}
                </DescriptionList.Details>
                <DescriptionList.Term>End Date</DescriptionList.Term>
                <DescriptionList.Details>
                  {project.end_date}
                </DescriptionList.Details>
              </DescriptionList>
            </Card.Content>
            <Card.Footer className="text-justify">
              {project.description}
            </Card.Footer>
          </Card>
          <div>Created At: {project.created_at}</div>
          <div>Updated At: {project.updated_at || "Not Updated"}</div>
        </Card.Content>
        <Card.Footer></Card.Footer>
      </Card>
    </>
  );
}

Show.layout = (page: any) => <AppLayout children={page} />;

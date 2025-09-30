import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Disclosure, DisclosurePanel } from "@/components/ui/disclosure";
import { Heading } from "@/components/ui/heading";
import {
  Menu,
  MenuContent,
  MenuItem,
  MenuLabel,
  MenuSeparator,
  MenuSubmenu,
  MenuTrigger,
} from "@/components/ui/menu";
import {
  IconChevronRight,
  IconDotsHorizontal,
  IconEyeDropper,
} from "@intentui/icons";
import { ListTask } from "./list-task";
import { Container } from "@/components/ui/container";

interface Status {
  id: number | string;
  name: string;
  tasks: any[];
}

interface ListStatusProps {
  statuses: Status[];
}

export function ListStatus({ statuses }: ListStatusProps) {
  return (
    <>
      {statuses.map((status) => (
        <Disclosure key={status.id}>
          <div className="flex items-center gap-2">
            {/* Trigger (Chevron) */}
            <Heading>
              <Button slot="trigger" intent="plain">
                <IconChevronRight className="size-5 cursor-pointer hover:text-gray-600" />
              </Button>
            </Heading>

            {/* Status name */}
            <Button intent="plain">{status.name}</Button>

            {/* Menu actions */}
            <Menu>
              <MenuTrigger aria-label="Open Menu" className="ml-auto">
                <IconDotsHorizontal className="w-4 h-4 cursor-pointer hover:text-gray-600" />
              </MenuTrigger>
              <MenuContent popover={{ placement: "bottom" }}>
                {/* isi menu seperti kode kamu */}
              </MenuContent>
            </Menu>
          </div>

          {/* Panel untuk task dalam status */}
          <DisclosurePanel>
            <Container>
              <ListTask tasks={status.tasks ?? []} />
            </Container>
          </DisclosurePanel>
        </Disclosure>
      ))}
    </>
  );
}

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePicker, DatePickerTrigger } from "@/components/ui/date-picker";
import { Description, FieldError, Label } from "@/components/ui/field";
import { Input, InputGroup } from "@/components/ui/input";
import {
  Modal,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "@/components/ui/modal";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import { Switch, SwitchLabel } from "@/components/ui/switch";
import { TextField } from "@/components/ui/text-field";
import { Text } from "@/components/ui/text";

import { Textarea } from "@/components/ui/textarea";
import { DepartmentData, PositionData } from "@/types";
import { useForm } from "@inertiajs/react";
import { IconPlus } from "@intentui/icons";
import { parseDate } from "@internationalized/date";

interface Props {
  departments: DepartmentData[];
  positions: PositionData[];
}

export function CreateEmployeeModal({ departments, positions }: Props) {
  const { data, setData, post, errors, reset } = useForm({
    makeUserAccount: false,
    department_id: "",
    position_id: "",
    name: "",
    gender: "",
    email: "",
    phone: "",
    address: "",
    status: "",
    date_of_birth: "",
    start_date: "",
    end_date: "",
    contract_type: "",
    benefits: "",
  });

  const filteredPositions = positions.filter(
    (p: any) =>
      p.department_id != null &&
      String(p.department_id) === String(data.department_id),
  );

  const handleSubmit = async (): Promise<boolean> => {
    return new Promise((resolve) => {
      post(route("organizations.employee.store"), {
        preserveScroll: true,
        onSuccess: () => {
          resolve(true);
          reset();
        },
        onError: (errors) => {
          console.log(errors);
        },
      });
    });
  };

  return (
    <>
      <Modal>
        <Button>
          <IconPlus /> Add Employee
        </Button>
        <ModalContent size="3xl">
          {({ close }) => (
            <>
              <ModalHeader>
                <ModalTitle className="flex ">
                  <div>Create New Employee</div>
                  <div className="flex text-2xl">
                    <Switch
                      value="makeUserAccount"
                      className={"font-normal"}
                      onChange={(v: boolean) => setData("makeUserAccount", v)}
                    ></Switch>
                    <Popover>
                      <Button intent="plain" size="xs" isCircle>
                        ?
                      </Button>
                      <PopoverContent placement="right">
                        <PopoverHeader>
                          <PopoverTitle>Make User Account</PopoverTitle>
                          <PopoverDescription>
                            If checked, the employee will have a user account
                            with the same email address.
                          </PopoverDescription>
                        </PopoverHeader>
                      </PopoverContent>
                    </Popover>
                  </div>
                </ModalTitle>
              </ModalHeader>
              <ModalBody className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <TextField
                      value={data.name}
                      onChange={(v) => setData("name", v)}
                      isRequired
                    >
                      <Label>Name</Label>
                      <Input />
                      <FieldError>{errors.name}</FieldError>
                    </TextField>
                    <div className="grid grid-cols-2 gap-4">
                      <TextField
                        value={data.email}
                        onChange={(v) => {
                          // kalau user belum menulis domain
                          const hasDomain = v.includes("@");
                          const emailWithDomain = hasDomain
                            ? v
                            : `${v}@company.com`;
                          setData("email", emailWithDomain);
                        }}
                        isRequired
                      >
                        <Label>Email</Label>
                        <InputGroup>
                          <Input type="text" />
                          <Text>@company.com</Text>
                        </InputGroup>
                        <FieldError>{errors.email}</FieldError>
                      </TextField>
                      <DatePicker
                        value={
                          data.date_of_birth
                            ? parseDate(data.date_of_birth)
                            : null
                        }
                        onChange={(v) =>
                          setData("date_of_birth", v ? v.toString() : "")
                        }
                      >
                        <Label>Date of Birth</Label>
                        <DatePickerTrigger />
                        <FieldError>{errors.date_of_birth}</FieldError>
                      </DatePicker>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <TextField
                        value={data.phone}
                        onChange={(v) => setData("phone", v)}
                        isRequired
                      >
                        <Label>Phone</Label>
                        <Input />
                        <FieldError>{errors.phone}</FieldError>
                      </TextField>

                      <Select
                        value={data.gender}
                        onChange={(v: any) => setData("gender", v)}
                      >
                        <Label>Gender</Label>
                        <SelectTrigger />
                        <SelectContent items={genders}>
                          {(item) => (
                            <SelectItem className={"capitalize"} id={item.name}>
                              {item.name}
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                    <TextField
                      value={data.address}
                      onChange={(v) => setData("address", v)}
                    >
                      <Label>Address</Label>
                      <Textarea />
                      <FieldError>{errors.address}</FieldError>
                    </TextField>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Department and Position</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {" "}
                    <div className="grid grid-cols-2 gap-4">
                      <Select
                        value={data.department_id}
                        onChange={(v: any) => setData("department_id", v)}
                      >
                        <Label>Department</Label>
                        <SelectTrigger />
                        <SelectContent
                          items={departments.map(
                            (department: DepartmentData) => ({
                              id: department.id || "",
                              name: department.name || "",
                            }),
                          )}
                        >
                          {(item) => (
                            <SelectItem id={item.id} textValue={item.name}>
                              {item.name}
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                      <Select
                        value={data.position_id}
                        onChange={(v: any) => setData("position_id", v)}
                      >
                        <Label>Position</Label>
                        <SelectTrigger />
                        <SelectContent
                          items={filteredPositions.map(
                            (position: PositionData) => ({
                              id: position.id || "",
                              name: position.name || "",
                            }),
                          )}
                        >
                          {(item) => (
                            <SelectItem id={item.id} textValue={item.name}>
                              {item.name}
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Contract Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Select
                      value={data.contract_type}
                      onChange={(v: any) => setData("contract_type", v)}
                      className={"max-w-xs"}
                    >
                      <Label>Contract Type</Label>
                      <SelectTrigger />
                      <SelectContent items={contractTypes}>
                        {(item) => (
                          <SelectItem
                            className={"capitalize"}
                            id={item.name}
                            textValue={item.name}
                          >
                            {item.name}
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    <div className="grid grid-cols-2 gap-3">
                      <DatePicker
                        value={
                          data.start_date ? parseDate(data.start_date) : null
                        }
                        onChange={(v: any) =>
                          setData("start_date", v ? v.toString() : "")
                        }
                      >
                        <Label>Start Date</Label>
                        <DatePickerTrigger />
                        <FieldError>{errors.start_date}</FieldError>
                      </DatePicker>
                      <DatePicker
                        value={data.end_date ? parseDate(data.end_date) : null}
                        onChange={(v: any) =>
                          setData("end_date", v ? v.toString() : "")
                        }
                      >
                        <Label>End Date</Label>
                        <DatePickerTrigger />
                        <FieldError>{errors.end_date}</FieldError>
                      </DatePicker>
                    </div>
                    <TextField
                      value={data.benefits}
                      onChange={(v) => setData("benefits", v)}
                    >
                      <Label>Benefits</Label>
                      <Textarea />
                      <FieldError>{errors.benefits}</FieldError>
                    </TextField>
                  </CardContent>
                </Card>
              </ModalBody>
              <ModalFooter>
                <ModalClose>Cancel</ModalClose>
                <Button onClick={handleSubmit} intent="primary">
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

const contractTypes = [
  { id: 1, name: "full_time" },
  { id: 2, name: "part_time" },
  { id: 3, name: "contract" },
  { id: 4, name: "temporary" },
  { id: 5, name: "probation" },
];

const employmentStatuses = [
  { id: 1, name: "full_time" },
  { id: 2, name: "part_time" },
  { id: 3, name: "contract" },
  { id: 4, name: "temporary" },
  { id: 5, name: "probation" },
];

export const genders = [
  { id: 1, name: "male" },
  { id: 2, name: "female" },
  { id: 3, name: "other" },
];

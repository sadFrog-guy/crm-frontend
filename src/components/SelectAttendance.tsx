import { Select, SelectItem } from "@nextui-org/select";
import React from "react";

import { useGetStudentsQuery } from "@/services/studentsAPI";

interface SelectAttendanceProps {
  groupId: number;
  values: Set<never>;
  setValues: React.Dispatch<React.SetStateAction<Set<never>>>;
}

export default function SelectAttendance({
  groupId,
  values,
  setValues,
}: SelectAttendanceProps) {
  const {
    data: students,
    isLoading,
    isError,
  } = useGetStudentsQuery({ id: groupId, type: "group" });

  const handleSelectionChange = (e) => {
    setValues(new Set(e.target.value.split(",")));
  };

  return (
    <Select
      isRequired
      disallowEmptySelection={true}
      isDisabled={students && students.length === 0}
      isLoading={isLoading}
      items={students || []}
      label="Кто посетил"
      labelPlacement="outside"
      placeholder="Выберите значение"
      selectedKeys={values}
      selectionMode="multiple"
      onChange={handleSelectionChange}
    >
      {(item) => {
        return (
          <SelectItem key={item.id}>
            {item.name + " " + item.surname}
          </SelectItem>
        );
      }}
    </Select>
  );
}

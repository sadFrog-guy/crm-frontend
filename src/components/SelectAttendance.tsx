import { useGetStudentsQuery } from '@/services/studentsAPI';
import { Select, SelectItem } from '@nextui-org/select';
import React from 'react'

interface SelectAttendanceProps {
  groupId: number;
  values: Set<never>;
  setValues: React.Dispatch<React.SetStateAction<Set<never>>>;
}

export default function SelectAttendance({groupId, values, setValues}: SelectAttendanceProps) {
  const { data: students, isLoading, isError } = useGetStudentsQuery({id: groupId, type: 'group'})

  const handleSelectionChange = (e) => {
    setValues(new Set(e.target.value.split(",")));
  };

  return (
    <Select
      disallowEmptySelection={true}
      isRequired
      selectionMode='multiple'
      label="Кто посетил"
      labelPlacement="outside" 
      placeholder="Выберите значение"
      selectedKeys={values}
      isLoading={isLoading}
      items={students || []}  
      onChange={handleSelectionChange}
      isDisabled={students && students.length === 0}
    >
      {(item) => {
        return (
          <SelectItem key={item.id}>
            {item.name + " " + item.surname}
          </SelectItem>
        )
      }}
    </Select>
  )
}

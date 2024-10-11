import { Button } from "@nextui-org/button";
import { Select, SelectItem } from "@nextui-org/select";
import React from "react";

import { useGetStudentsQuery } from "@/services/studentsAPI";
import BlockTemplate from "@/layouts/BlockTemplate";

interface AttendancesBlockProps {
  setCurrentStage: React.Dispatch<React.SetStateAction<number>>;
  groupId: number;
  setGroupId: React.Dispatch<React.SetStateAction<null>>;
  values: Set<never>;
  setValues: React.Dispatch<React.SetStateAction<Set<never>>>;
  handleSelect: (e: any) => void;
}

export default function AttendancesBlock({
  groupId,
  setGroupId,
  setCurrentStage,
  values,
  setValues,
  handleSelect,
}: AttendancesBlockProps) {
  const {
    data: students,
    isError: isStudentsError,
    isLoading: isStudentsLoading,
  } = useGetStudentsQuery({ id: groupId, type: "group" });

  const attendanceCheck = () => {
    const today = new Date().toISOString().split("T")[0];
    const studentsWithoutTodayAttendance = students?.filter((student) =>
      student.attendances.includes(today),
    );

    return new Set(
      studentsWithoutTodayAttendance.map((student) => String(student.id)),
    );
  };

  const handleNext = (e) => {
    // setCurrentStage(3)
  };

  const handlePrev = (e) => {
    setCurrentStage(1);
  };

  return (
    <BlockTemplate>
      <p className="text-lg font-medium">
        Выберите учеников, которые посетили сегодняшний урок
      </p>

      {students !== undefined && students.length > 0 ? (
        <>
          <Select
            disabledKeys={students ? attendanceCheck() : []}
            disallowEmptySelection={true}
            isLoading={isStudentsLoading}
            items={students || []}
            label="Ученик"
            placeholder="Выберите значение"
            selectedKeys={values}
            selectionMode="multiple"
            onChange={(e) => {
              handleSelect(e);
            }}
          >
            {(item) => {
              const today = new Date().toISOString().split("T")[0];

              if (!item.attendances.includes(today)) {
                return (
                  <SelectItem key={item.id}>
                    {item.name + " " + item.surname}
                  </SelectItem>
                );
              } else {
                return (
                  <SelectItem key={item.id}>
                    {item.name + " " + item.surname} - Присутствовал
                  </SelectItem>
                );
              }
            }}
          </Select>

          <Button color="primary" variant="shadow" onClick={handleNext}>
            Продолжить
          </Button>
        </>
      ) : (
        <>
          <p>В данной группе нет учеников</p>

          <Button color="primary" variant="shadow" onClick={handlePrev}>
            Назад
          </Button>
        </>
      )}
    </BlockTemplate>
  );
}

// @ts-nocheck

import React from "react";
import { Spinner } from "@nextui-org/spinner";

import { useGetAttendancesQuery } from "@/services/attendanceAPI";
import { useGetStudentsQuery } from "@/services/studentsAPI";

interface LessonInfoProps {
  lessonId: number | null;
}

export default function LessonInfo({ lessonId }: LessonInfoProps) {
  const {
    data: attendances,
    isLoading,
    isError,
    isSuccess,
  } = useGetAttendancesQuery({ id: lessonId, type: "lesson" });
  const {
    data: students,
    isLoading: AreStudentsLoading,
    isSuccess: AreStudentsSuccess,
  } = useGetStudentsQuery({ id: null, type: "none" });

  return (
    <div>
      {isLoading && AreStudentsLoading ? (
        <Spinner />
      ) : (
        attendances?.map((item, index) => {
          if (students) {
            let student = students.filter(
              (student) => student.id == item.student,
            )[0];

            return (
              <p key={index}>
                {index + 1}. {student.name + " " + student.surname}
              </p>
            );
          }
        })
      )}
    </div>
  );
}

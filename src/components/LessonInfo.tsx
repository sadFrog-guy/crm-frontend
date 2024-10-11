import { useGetLessonByIdQuery } from '@/services/lessonAPI'
import React from 'react'
import { useGetAttendancesQuery } from '@/services/attendanceAPI';
import { Spinner } from '@nextui-org/spinner';
import { useGetStudentsQuery } from '@/services/studentsAPI';

interface LessonInfoProps {
  lessonId: number | null
}

export default function LessonInfo({lessonId}: LessonInfoProps) {
  const { data: attendances, isLoading, isError, isSuccess } = useGetAttendancesQuery({id: lessonId, type: 'lesson'})
  const { data: students, isLoading: AreStudentsLoading, isSuccess: AreStudentsSuccess} = useGetStudentsQuery({id: null, type: 'none'})

  return (
    <div>
      {isLoading && AreStudentsLoading
        ? <Spinner/>
        : attendances?.map((item, index) => {
            if (students) {
              let student = students.filter(student => student.id == item.student)[0]
              return <p>{index + 1}. {student.name + " " + student.surname}</p>
            }
          })}
    </div>
  )
}

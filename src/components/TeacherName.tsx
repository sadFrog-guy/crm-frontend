import { useGetTeachersQuery } from '@/services/teachersAPI';
import { Spinner } from '@nextui-org/spinner';
import React from 'react'

interface TeacherNameProps {
  groupId: number;
}

export default function TeacherName({groupId}: TeacherNameProps) {
  const {data: teacher, isLoading, isError} = useGetTeachersQuery({id: groupId, type: 'group'})

  return (
    <>
      {isLoading
        ? <Spinner size="sm" color="default"/>
        : <p>{teacher[0]?.name + " " + teacher[0]?.surname}</p>
      }
    </>
)
}

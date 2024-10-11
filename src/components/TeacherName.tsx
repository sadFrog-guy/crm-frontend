import { Spinner } from "@nextui-org/spinner";
import React from "react";

import { useGetTeachersQuery } from "@/services/teachersAPI";

interface TeacherNameProps {
  groupId: number;
}

export default function TeacherName({ groupId }: TeacherNameProps) {
  const {
    data: teacher,
    isLoading,
    isError,
  } = useGetTeachersQuery({ id: groupId, type: "group" });

  return (
    <>
      {isLoading ? (
        <Spinner color="default" size="sm" />
      ) : (
        <p>{teacher[0]?.name + " " + teacher[0]?.surname}</p>
      )}
    </>
  );
}

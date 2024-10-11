import { Spinner } from "@nextui-org/spinner";
import React from "react";

import { formatTime } from "./../functions/formatTime";

import { useGetLessonSchedulesQuery } from "@/services/lessonsScheduleAPI";
import { useGetGroupsByIdQuery } from "@/services/groupsAPI";

interface GroupScheduleTimeProps {
  groupId: number;
  position: "start" | "end";
}

export default function GroupScheduleTime({
  groupId,
  position,
}: GroupScheduleTimeProps) {
  const { data: group, isLoading, isSuccess } = useGetGroupsByIdQuery(groupId);
  const {
    data: schedules,
    isLoading: schedulesAreLoading,
    isError: schedulesIsError,
    isSuccess: isScheduleSuccess,
  } = useGetLessonSchedulesQuery(group?.id, { skip: !group });

  return (
    <>
      {isSuccess && isScheduleSuccess ? (
        <p>
          {position === "start"
            ? formatTime(schedules[0]?.start_time)
            : formatTime(schedules[0]?.end_time)}
        </p>
      ) : (
        <Spinner color="default" size="sm" />
      )}
    </>
  );
}

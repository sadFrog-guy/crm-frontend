// @ts-nocheck
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { TableRow, TableCell } from "@nextui-org/table";
import { Card, CardBody } from "@nextui-org/card";

import Heading from "./Heading";
import StatusChip from "./StatusChip";
import Margin from "./Margin";
import GenderChip from "./GenderChip";
import { TableMini } from "./TableMini";
import StudentStats from "./StudentStats";
import PositionChip from "./PositionChip";

import { Student } from "@/types/students";
import { useGetGroupsByIdQuery } from "@/services/groupsAPI";
import usePersistentError from "@/hooks/usePersistentError";
import { useGetBranchesQuery } from "@/services/branchesAPI";
import { formatDaysOfWeek } from "@/functions/formatDaysOfWeek";
import { formatTime } from "@/functions/formatTime";
import { useGetLessonSchedulesQuery } from "@/services/lessonsScheduleAPI";
import { LessonSchedule } from "@/types/lessonsSchedule";
import { scheduleColumns } from "@/tableColumns/scheduleColumns";

interface StudentDetailContentProps {
  student: Student;
}

export default function StudentDetailContent({
  student,
}: StudentDetailContentProps) {
  const {
    data: group,
    isError: isGroupError,
    isLoading: isGroupLoading,
  } = useGetGroupsByIdQuery(Number(student.group));
  const {
    entities: branches,
    isError: isBranchError,
    isLoading: isBranchLoading,
  } = usePersistentError(useGetBranchesQuery);
  const {
    data: schedules,
    isLoading: schedulesAreLoading,
    isError: schedulesIsError,
  } = useGetLessonSchedulesQuery(group?.id, { skip: !group });

  const branchId = useSelector((state) => state.branch.branchId);
  const [branchName, setBranchName] = useState("");
  const [groupName, setGroupName] = useState("");

  useEffect(() => {
    setBranchName(branches?.filter((item) => item.id === branchId)[0].name);
  }, [branches, isBranchLoading]);

  useEffect(() => {
    setGroupName(group?.name);
  }, [group, isGroupLoading]);

  return (
    <div>
      <div className="flex items-center gap-4">
        <Heading size="2xl">
          {student.name} {student.surname}
        </Heading>
        <PositionChip position="Ученик" />
        <StatusChip status={student.status} />
        <GenderChip gender={student.sex} />
      </div>

      <Margin direction="b" value={20} />

      <StudentStats
        branchName={branchName}
        groupName={groupName}
        isBranchLoading={isBranchLoading}
        isGroupLoading={isGroupLoading}
        student={student}
      />

      <Margin direction="b" value={40} />

      <div className="flex justify-between">
        <div className="w-[52%]">
          <Heading>Расписание занятий</Heading>
          <Margin direction="b" value={15} />
          <TableMini
            columns={scheduleColumns}
            data={schedules || []}
            formatRow={(item: LessonSchedule) => (
              <TableRow key={item.id}>
                <TableCell>{formatDaysOfWeek(item.days_of_week)}</TableCell>
                <TableCell>{formatTime(item.start_time)}</TableCell>
                <TableCell>{formatTime(item.end_time)}</TableCell>
              </TableRow>
            )}
            isError={schedulesIsError}
            isLoading={schedulesAreLoading}
          />
        </div>

        <div className="w-[45%] max-h-[180px]">
          <Heading>Описание</Heading>
          <Margin direction="b" value={15} />
          <Card className="p-2">
            <CardBody>{student.description}</CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
